from decimal import Decimal
from datetime import date, timedelta
from django.db.models import Sum
from core.models import Loan, Saving, UserProfile
from expenses.models import Expense, Wallet, Income, RecurringExpense

class CashFlowPredictionService:
    def __init__(self, user):
        self.user = user

    def predict(self, days=90):
        try:
            days = int(days)
        except (TypeError, ValueError):
            days = 90

        if days not in [30, 90, 180, 365]:
            days = 90

        today = date.today()
        months_in_period = max(1, round(days / 30.0))

        # 1. Base Starting Liquid Balance
        total_savings = float(Saving.objects.aggregate(Sum('amount'))['amount__sum'] or 0)
        total_wallets = float(Wallet.objects.filter(user=self.user).aggregate(Sum('balance'))['balance__sum'] or 0)
        starting_balance = total_savings + total_wallets

        # 2. Monthly Base Income
        user_income = Decimal('0.00')
        if hasattr(self.user, 'userprofile') and self.user.userprofile.monthly_income > 0:
            user_income = self.user.userprofile.monthly_income
        else:
            first_day = today.replace(day=1)
            logged_inc = Income.objects.filter(user=self.user, date__gte=first_day).aggregate(Sum('amount'))['amount__sum']
            user_income = logged_inc or Decimal('50000.00')

        monthly_income_val = float(user_income)

        # 3. Monthly Outflows
        first_day = today.replace(day=1)
        recent_expenses = float(Expense.objects.filter(user=self.user, date__gte=first_day).aggregate(Sum('amount'))['amount__sum'] or 0)
        loans = Loan.objects.all()
        monthly_emi_val = float(sum(l.calculate_emi() for l in loans))

        # Recurring expenses
        recurring_bills = float(RecurringExpense.objects.filter(is_active=True).aggregate(Sum('amount'))['amount__sum'] or 0)
        monthly_outflow_val = max(recent_expenses, recurring_bills) + monthly_emi_val

        # 4. Generate Monthly Trajectory Milestones
        projected_balance = starting_balance
        milestones = []
        low_balance_warnings = []

        confidence_map = {30: 92, 90: 85, 180: 75, 365: 65}
        confidence_percent = confidence_map.get(days, 80)

        total_projected_income = 0.0
        total_projected_outflow = 0.0

        for m in range(1, months_in_period + 1):
            m_date = today + timedelta(days=m * 30)
            
            # Apply slight inflation/seasonality variance for long horizons
            income_m = monthly_income_val
            outflow_m = monthly_outflow_val * (1.0 + (0.005 * m)) # 0.5% monthly inflation trend
            
            total_projected_income += income_m
            total_projected_outflow += outflow_m
            
            net_change = income_m - outflow_m
            projected_balance += net_change

            if projected_balance < (outflow_m * 0.5):
                low_balance_warnings.append({
                    'month': m,
                    'projected_date': m_date.strftime('%Y-%m-%d'),
                    'projected_balance': round(projected_balance, 2),
                    'message': f"Liquidity Warning: Balance drops below 50% of monthly outflow around {m_date.strftime('%B %Y')}."
                })

            milestones.append({
                'month_number': m,
                'date': m_date.strftime('%Y-%m-%d'),
                'month_name': m_date.strftime('%b %Y'),
                'income': round(income_m, 2),
                'outflow': round(outflow_m, 2),
                'net_cashflow': round(net_change, 2),
                'projected_ending_balance': round(projected_balance, 2)
            })

        net_period_change = total_projected_income - total_projected_outflow

        return {
            'horizon_days': days,
            'confidence_percent': confidence_percent,
            'starting_balance': round(starting_balance, 2),
            'projected_ending_balance': round(projected_balance, 2),
            'total_projected_income': round(total_projected_income, 2),
            'total_projected_outflow': round(total_projected_outflow, 2),
            'net_period_change': round(net_period_change, 2),
            'monthly_run_rate_income': round(monthly_income_val, 2),
            'monthly_run_rate_outflow': round(monthly_outflow_val, 2),
            'liquidity_warnings': low_balance_warnings,
            'milestones': milestones
        }
