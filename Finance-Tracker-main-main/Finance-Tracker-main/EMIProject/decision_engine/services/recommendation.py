from decimal import Decimal
from datetime import date
from django.db.models import Sum
from core.models import Loan, Saving, Investment, UserProfile
from expenses.models import Expense, Wallet, Income
from decision_engine.models import AIRecommendation

class AIRecommendationService:
    def __init__(self, user):
        self.user = user

    def generate_recommendations(self):
        today = date.today()
        first_day = today.replace(day=1)

        user_income = Decimal('0.00')
        if hasattr(self.user, 'userprofile') and self.user.userprofile.monthly_income > 0:
            user_income = self.user.userprofile.monthly_income
        else:
            logged_inc = Income.objects.filter(user=self.user, date__gte=first_day).aggregate(Sum('amount'))['amount__sum']
            user_income = logged_inc or Decimal('50000.00')

        income_val = float(user_income)
        monthly_expenses = float(Expense.objects.filter(user=self.user, date__gte=first_day).aggregate(Sum('amount'))['amount__sum'] or 0)
        loans = Loan.objects.all()
        monthly_emi_val = float(sum(l.calculate_emi() for l in loans))

        total_savings = float(Saving.objects.aggregate(Sum('amount'))['amount__sum'] or 0)
        total_wallets = float(Wallet.objects.filter(user=self.user).aggregate(Sum('balance'))['balance__sum'] or 0)
        liquid_assets = total_savings + total_wallets

        total_investments = float(Investment.get_total_current_value())

        monthly_commitments = monthly_expenses + monthly_emi_val
        cushion_months = (liquid_assets / monthly_commitments) if monthly_commitments > 0 else 0
        dti_ratio = (monthly_emi_val / income_val * 100) if income_val > 0 else 0
        expense_ratio = (monthly_expenses / income_val * 100) if income_val > 0 else 0

        recommendations = []

        # Rule 1: Emergency Fund Check
        if cushion_months < 3.0:
            recommendations.append({
                'category': 'EMERGENCY_FUND',
                'priority': 'HIGH',
                'title': 'Build a 3 to 6-Month Emergency Reserve',
                'description': f"Your liquid funds cover only {cushion_months:.1f} months of expenses. Aim to accumulate at least ₹{(monthly_commitments * 3):,.2f} in a liquid savings wallet before making non-essential purchases.",
                'action_url': '/expenses/wallet/'
            })

        # Rule 2: High Debt Burden Check
        if dti_ratio > 35.0:
            recommendations.append({
                'category': 'DEBT',
                'priority': 'HIGH',
                'title': 'Reduce Debt-to-Income (DTI) Ratio',
                'description': f"Your monthly loan EMIs consume {dti_ratio:.1f}% of your income. Consider pre-paying high-interest personal or car loans to free up monthly cash flow.",
                'action_url': '/loans/'
            })

        # Rule 3: High Outflow / Spending Check
        if expense_ratio > 70.0:
            recommendations.append({
                'category': 'SPENDING',
                'priority': 'MEDIUM',
                'title': 'Optimize Discretionary Outflows',
                'description': f"Monthly expenses eat up {expense_ratio:.1f}% of your income. Set category monthly budget limits on Food, Entertainment, or Shopping.",
                'action_url': '/expenses/wallet/'
            })

        # Rule 4: Investment Growth Check
        if total_investments == 0 or (total_investments < (income_val * 2)):
            recommendations.append({
                'category': 'INVESTMENT',
                'priority': 'MEDIUM',
                'title': 'Start Systematic Wealth Accumulation (SIPs)',
                'description': f"Your current investment portfolio is ₹{total_investments:,.2f}. Allocating 15-20% of monthly income to mutual funds or equity SIPs accelerates long-term wealth.",
                'action_url': '/investments/'
            })

        # Rule 5: Idle Cash Optimization
        if liquid_assets > (monthly_commitments * 6):
            recommendations.append({
                'category': 'SAVINGS',
                'priority': 'LOW',
                'title': 'Deploy Idle Liquid Surplus',
                'description': f"You have ₹{liquid_assets:,.2f} in liquid funds (covering over {cushion_months:.1f} months of expenses). Consider shifting excess cash into Fixed Deposits or Gold.",
                'action_url': '/savings/'
            })

        # Default positive recommendation if all indicators are healthy
        if not recommendations:
            recommendations.append({
                'category': 'SAVINGS',
                'priority': 'LOW',
                'title': 'Financial Health is Strong!',
                'description': "Your cash flows, emergency reserves, and debt ratios are in great shape. Keep maintaining your budget discipline!",
                'action_url': '/analytics/'
            })

        # Persist generated recommendations in DB if user is logged in
        if self.user and self.user.is_authenticated:
            for rec in recommendations:
                AIRecommendation.objects.get_or_create(
                    user=self.user,
                    title=rec['title'],
                    defaults={
                        'category': rec['category'],
                        'priority': rec['priority'],
                        'description': rec['description'],
                        'action_url': rec['action_url']
                    }
                )

        return recommendations
