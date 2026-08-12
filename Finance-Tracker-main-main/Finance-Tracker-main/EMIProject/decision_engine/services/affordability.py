from decimal import Decimal
from datetime import date, timedelta
from django.db.models import Sum
from core.models import Loan, Saving, UserProfile
from expenses.models import Expense, Wallet, Income
from decision_engine.models import AffordabilityQueryLog, FinancialGoal

class AffordabilityEngineService:
    def __init__(self, user):
        self.user = user

    def analyze(self, purchase_name, amount, payment_type='LUMP_SUM', down_payment=0, tenure_months=12, interest_rate=12.0):
        amount = float(amount)
        down_payment = float(down_payment)
        tenure_months = int(tenure_months) if tenure_months else 12
        interest_rate = float(interest_rate) if interest_rate else 12.0

        today = date.today()
        first_day = today.replace(day=1)

        # 1. Fetch current financial metrics
        user_income = Decimal('0.00')
        if hasattr(self.user, 'userprofile') and self.user.userprofile.monthly_income > 0:
            user_income = self.user.userprofile.monthly_income
        else:
            logged_inc = Income.objects.filter(user=self.user, date__gte=first_day).aggregate(Sum('amount'))['amount__sum']
            user_income = logged_inc or Decimal('50000.00')

        income_val = float(user_income)
        monthly_expenses = float(Expense.objects.filter(user=self.user, date__gte=first_day).aggregate(Sum('amount'))['amount__sum'] or 0)
        loans = Loan.objects.all()
        existing_monthly_emi = float(sum(l.calculate_emi() for l in loans))

        total_savings = float(Saving.objects.aggregate(Sum('amount'))['amount__sum'] or 0)
        total_wallets = float(Wallet.objects.filter(user=self.user).aggregate(Sum('balance'))['balance__sum'] or 0)
        liquid_assets = total_savings + total_wallets

        monthly_commitments = monthly_expenses + existing_monthly_emi
        current_monthly_surplus = income_val - monthly_commitments

        # 2. Compute Purchase Impact
        if payment_type == 'LUMP_SUM':
            upfront_cost = amount
            added_monthly_emi = 0.0
            new_liquid_assets = liquid_assets - amount
            new_monthly_commitments = monthly_commitments
            new_monthly_surplus = current_monthly_surplus
            new_dti = (existing_monthly_emi / income_val * 100) if income_val > 0 else 0
        else: # EMI
            upfront_cost = down_payment
            principal = amount - down_payment
            r = (interest_rate / 12) / 100
            n = tenure_months
            if r == 0:
                added_monthly_emi = principal / n
            else:
                added_monthly_emi = (principal * r * ((1 + r) ** n)) / (((1 + r) ** n) - 1)

            new_liquid_assets = liquid_assets - upfront_cost
            new_monthly_commitments = monthly_commitments + added_monthly_emi
            new_monthly_surplus = income_val - new_monthly_commitments
            new_dti = (new_monthly_commitments / income_val * 100) if income_val > 0 else 0

        # Post-purchase emergency cushion in months
        post_cushion_months = (new_liquid_assets / new_monthly_commitments) if new_monthly_commitments > 0 else 0

        # 3. Decision Logic & Scoring
        decision = 'YES'
        affordability_score = 100.0
        explanation_lines = []

        if payment_type == 'LUMP_SUM':
            if amount > liquid_assets:
                decision = 'NO'
                affordability_score = 10.0
                explanation_lines.append(f"Purchase amount (₹{amount:,.2f}) exceeds your total liquid assets (₹{liquid_assets:,.2f}).")
            elif post_cushion_months < 1.5:
                decision = 'NO'
                affordability_score = 25.0
                explanation_lines.append(f"Paying ₹{amount:,.2f} upfront reduces your emergency fund to only {post_cushion_months:.1f} months of expenses (minimum safe limit is 3.0 months).")
            elif post_cushion_months < 3.0 or amount > (liquid_assets * 0.4):
                decision = 'WAIT'
                affordability_score = 60.0
                explanation_lines.append(f"Paying ₹{amount:,.2f} leaves you with {post_cushion_months:.1f} months of liquid buffer. We recommend saving for a bit longer.")
            else:
                decision = 'YES'
                affordability_score = 92.0
                explanation_lines.append(f"You have ample liquid reserves (₹{liquid_assets:,.2f}). Post-purchase cushion remains healthy at {post_cushion_months:.1f} months.")
        else: # EMI
            if upfront_cost > liquid_assets:
                decision = 'NO'
                affordability_score = 10.0
                explanation_lines.append(f"Down payment of ₹{upfront_cost:,.2f} exceeds your current liquid funds (₹{liquid_assets:,.2f}).")
            elif new_monthly_surplus < 0:
                decision = 'NO'
                affordability_score = 20.0
                explanation_lines.append(f"Adding an EMI of ₹{added_monthly_emi:,.2f}/month creates a monthly deficit of ₹{abs(new_monthly_surplus):,.2f}.")
            elif new_dti > 45:
                decision = 'NO'
                affordability_score = 35.0
                explanation_lines.append(f"This loan pushes your Debt-to-Income ratio to {new_dti:.1f}%, which is dangerously high (>45%).")
            elif new_dti > 35 or new_monthly_surplus < (income_val * 0.1):
                decision = 'WAIT'
                affordability_score = 62.0
                explanation_lines.append(f"Adding ₹{added_monthly_emi:,.2f}/month EMI increases your total DTI to {new_dti:.1f}%. Consider a higher down payment or longer tenure.")
            else:
                decision = 'YES'
                affordability_score = 88.0
                explanation_lines.append(f"The monthly EMI of ₹{added_monthly_emi:,.2f} fits comfortably within your monthly surplus. Post-purchase DTI remains safe at {new_dti:.1f}%.")

        # 4. Recommendation & Wait Time Calculation
        recommended_wait_months = 0
        if decision in ['WAIT', 'NO'] and current_monthly_surplus > 0:
            deficit_or_target = amount if payment_type == 'LUMP_SUM' else upfront_cost
            recommended_wait_months = max(1, int((deficit_or_target / current_monthly_surplus) + 0.99))
            explanation_lines.append(f"💡 Alternative: If you save your monthly surplus of ₹{current_monthly_surplus:,.2f}, you can comfortably afford this in ~{recommended_wait_months} month(s).")

        # 5. Goal Impact Analysis
        goals = FinancialGoal.objects.filter(user=self.user)
        goals_impact = []
        for g in goals:
            target_amount = float(g.target_amount)
            current_saved = float(g.current_saved)
            needed = target_amount - current_saved
            if needed > 0 and new_monthly_surplus > 0:
                prev_months = needed / current_monthly_surplus if current_monthly_surplus > 0 else 999
                new_months = needed / new_monthly_surplus
                delay = round(new_months - prev_months, 1)
                if delay > 0.5:
                    goals_impact.append({
                        'goal_name': g.name,
                        'delay_months': delay,
                        'message': f"Reaching '{g.name}' will be delayed by approx {delay:.1f} months due to reduced monthly cash flow."
                    })

        explanation_str = "\n".join(explanation_lines)

        # Log query
        if self.user and self.user.is_authenticated:
            AffordabilityQueryLog.objects.create(
                user=self.user,
                purchase_name=purchase_name,
                amount=amount,
                payment_type=payment_type,
                decision=decision,
                affordability_score=affordability_score,
                explanation=explanation_str
            )

        return {
            'purchase_name': purchase_name,
            'amount': round(amount, 2),
            'payment_type': payment_type,
            'decision': decision,
            'affordability_score': round(affordability_score, 1),
            'ai_explanation': explanation_str,
            'recommended_wait_months': recommended_wait_months,
            'impact_analysis': {
                'pre_liquid_assets': round(liquid_assets, 2),
                'post_liquid_assets': round(new_liquid_assets, 2),
                'pre_monthly_surplus': round(current_monthly_surplus, 2),
                'post_monthly_surplus': round(new_monthly_surplus, 2),
                'added_monthly_emi': round(added_monthly_emi, 2),
                'post_dti_percent': round(new_dti, 1),
                'post_cushion_months': round(post_cushion_months, 1)
            },
            'goals_impact': goals_impact
        }
