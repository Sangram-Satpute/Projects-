from decimal import Decimal
from datetime import date, timedelta
from django.db.models import Sum
from core.models import Loan, Saving, UserProfile
from expenses.models import Expense, Wallet, Income

class GoalSimulatorService:
    def __init__(self, user):
        self.user = user

    def simulate(self, goal_name, target_amount, current_saved=0, target_date=None, monthly_contribution=None):
        target_amount = float(target_amount)
        current_saved = float(current_saved) if current_saved else 0.0
        remaining_needed = max(0.0, target_amount - current_saved)

        today = date.today()
        first_day = today.replace(day=1)

        # Compute user's monthly surplus
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

        monthly_surplus = max(0.0, income_val - (monthly_expenses + monthly_emi_val))

        # Parse target date if string
        parsed_target_date = None
        if target_date:
            if isinstance(target_date, str):
                try:
                    parsed_target_date = date.fromisoformat(target_date)
                except ValueError:
                    parsed_target_date = None
            elif isinstance(target_date, date):
                parsed_target_date = target_date

        # Scenario 1: Calculate based on target date
        months_to_target = 12
        if parsed_target_date:
            days_diff = (parsed_target_date - today).days
            months_to_target = max(1, round(days_diff / 30.44))

        required_monthly_savings = remaining_needed / months_to_target if months_to_target > 0 else remaining_needed

        # Determine Feasibility Rating
        if monthly_surplus <= 0:
            feasibility = 'UNFEASIBLE'
            feasibility_note = "Your current monthly expenses and EMIs exceed your income. You need a positive cash flow to save."
        elif required_monthly_savings <= (monthly_surplus * 0.35):
            feasibility = 'EASY'
            feasibility_note = f"Easily achievable! Requires saving ₹{required_monthly_savings:,.2f}/month, which is only {(required_monthly_savings/monthly_surplus*100):.1f}% of your monthly surplus."
        elif required_monthly_savings <= (monthly_surplus * 0.70):
            feasibility = 'MODERATE'
            feasibility_note = f"Achievable with discipline. Requires saving ₹{required_monthly_savings:,.2f}/month ({(required_monthly_savings/monthly_surplus*100):.1f}% of monthly surplus)."
        elif required_monthly_savings <= monthly_surplus:
            feasibility = 'CHALLENGING'
            feasibility_note = f"Tight budget required! Consumes {(required_monthly_savings/monthly_surplus*100):.1f}% of your monthly surplus."
        else:
            feasibility = 'UNFEASIBLE'
            feasibility_note = f"Required saving of ₹{required_monthly_savings:,.2f}/month exceeds your total monthly surplus (₹{monthly_surplus:,.2f})."

        # Scenario 2: Calculate completion date based on user specified contribution
        effective_contribution = float(monthly_contribution) if monthly_contribution and float(monthly_contribution) > 0 else (required_monthly_savings if required_monthly_savings > 0 else monthly_surplus * 0.5)
        
        if effective_contribution > 0:
            estimated_months_needed = remaining_needed / effective_contribution
            estimated_completion_date = today + timedelta(days=int(estimated_months_needed * 30.44))
        else:
            estimated_months_needed = 999
            estimated_completion_date = None

        # What-If Scenarios
        what_if_scenarios = []
        if monthly_surplus > 0:
            # Accelerated 20% boost scenario
            boosted_contrib = min(monthly_surplus, effective_contribution * 1.25)
            boosted_months = remaining_needed / boosted_contrib if boosted_contrib > 0 else estimated_months_needed
            boosted_date = today + timedelta(days=int(boosted_months * 30.44))
            time_saved_months = max(0.0, estimated_months_needed - boosted_months)
            
            if time_saved_months > 0.5:
                what_if_scenarios.append({
                    'name': 'Boost Contribution +25%',
                    'monthly_saving': round(boosted_contrib, 2),
                    'estimated_completion_date': boosted_date.strftime('%Y-%m-%d'),
                    'time_saved': f"{time_saved_months:.1f} months faster"
                })

        return {
            'goal_name': goal_name,
            'target_amount': round(target_amount, 2),
            'current_saved': round(current_saved, 2),
            'remaining_needed': round(remaining_needed, 2),
            'monthly_surplus_available': round(monthly_surplus, 2),
            'required_monthly_savings': round(required_monthly_savings, 2),
            'effective_monthly_contribution': round(effective_contribution, 2),
            'estimated_months_needed': round(estimated_months_needed, 1),
            'estimated_completion_date': estimated_completion_date.strftime('%Y-%m-%d') if estimated_completion_date else None,
            'feasibility': feasibility,
            'feasibility_note': feasibility_note,
            'what_if_scenarios': what_if_scenarios
        }
