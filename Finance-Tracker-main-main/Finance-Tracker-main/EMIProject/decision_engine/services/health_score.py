from decimal import Decimal
from datetime import date
from django.db.models import Sum
from core.models import Loan, Saving, Investment, UserProfile
from expenses.models import Expense, Wallet, Income
from decision_engine.models import FinancialHealthHistory

class FinancialHealthScoreService:
    def __init__(self, user):
        self.user = user

    def calculate(self):
        today = date.today()
        first_day = today.replace(day=1)

        # 1. Income Analysis
        user_income = Decimal('0.00')
        if hasattr(self.user, 'userprofile') and self.user.userprofile.monthly_income > 0:
            user_income = self.user.userprofile.monthly_income
        else:
            # Fallback to logged monthly incomes
            logged_inc = Income.objects.filter(user=self.user, date__gte=first_day).aggregate(Sum('amount'))['amount__sum']
            user_income = logged_inc or Decimal('50000.00') # Reasonable default benchmark

        income_val = float(user_income)

        # 2. Monthly Expenses & EMIs
        monthly_expenses = float(Expense.objects.filter(user=self.user, date__gte=first_day).aggregate(Sum('amount'))['amount__sum'] or 0)
        loans = Loan.objects.all() # Or filtered by user if multi-tenant
        total_monthly_emi = float(sum(l.calculate_emi() for l in loans))

        # 3. Liquid Savings & Wallets
        total_savings = float(Saving.objects.aggregate(Sum('amount'))['amount__sum'] or 0)
        total_wallets = float(Wallet.objects.filter(user=self.user).aggregate(Sum('balance'))['balance__sum'] or 0)
        liquid_assets = total_savings + total_wallets

        # 4. Total Investments & Net Worth
        total_investments = float(Investment.get_total_current_value())
        total_net_worth = liquid_assets + total_investments - float(sum(l.principal for l in loans))

        # --- SUB-METRICS CALCULATIONS ---

        # 1. DTI Score (Debt-to-Income)
        dti_ratio = (total_monthly_emi / income_val * 100) if income_val > 0 else 0
        if dti_ratio <= 20:
            dti_score = 100.0
        elif dti_ratio <= 35:
            dti_score = 100.0 - ((dti_ratio - 20) * 2.0) # 70-100
        elif dti_ratio <= 50:
            dti_score = 70.0 - ((dti_ratio - 35) * 2.66) # 30-70
        else:
            dti_score = max(0.0, 30.0 - ((dti_ratio - 50) * 1.5))

        # 2. Emergency Savings Cushion (Months of expenses covered)
        total_monthly_commitments = monthly_expenses + total_monthly_emi
        monthly_run_rate = total_monthly_commitments if total_monthly_commitments > 0 else (income_val * 0.5)
        cushion_months = liquid_assets / monthly_run_rate if monthly_run_rate > 0 else 0
        
        if cushion_months >= 6.0:
            cushion_score = 100.0
        elif cushion_months >= 3.0:
            cushion_score = 70.0 + ((cushion_months - 3.0) / 3.0 * 30.0)
        elif cushion_months >= 1.0:
            cushion_score = 35.0 + ((cushion_months - 1.0) / 2.0 * 35.0)
        else:
            cushion_score = cushion_months * 35.0

        # 3. Expense Outflow Score
        outflow_ratio = (total_monthly_commitments / income_val * 100) if income_val > 0 else 100
        if outflow_ratio <= 50:
            outflow_score = 100.0
        elif outflow_ratio <= 75:
            outflow_score = 100.0 - ((outflow_ratio - 50) * 1.6)
        elif outflow_ratio <= 95:
            outflow_score = 60.0 - ((outflow_ratio - 75) * 2.0)
        else:
            outflow_score = max(0.0, 20.0 - ((outflow_ratio - 95) * 2.0))

        # 4. Investment & Asset Ratio Score
        investment_ratio = (total_investments / (income_val * 12) * 100) if income_val > 0 else 0
        if investment_ratio >= 100: # Invested at least 1 year's income
            investment_score = 100.0
        elif investment_ratio >= 50:
            investment_score = 75.0 + ((investment_ratio - 50) / 50.0 * 25.0)
        else:
            investment_score = investment_ratio * 1.5

        # Weighted Final Score
        final_score = round(
            (0.30 * dti_score) +
            (0.30 * cushion_score) +
            (0.25 * outflow_score) +
            (0.15 * investment_score),
            1
        )
        final_score = max(0.0, min(100.0, final_score))

        # Status & Grade Determination
        if final_score >= 85:
            status = 'EXCELLENT'
            grade = 'A+'
        elif final_score >= 70:
            status = 'GOOD'
            grade = 'A'
        elif final_score >= 55:
            status = 'FAIR'
            grade = 'B'
        elif final_score >= 40:
            status = 'POOR'
            grade = 'C'
        else:
            status = 'CRITICAL'
            grade = 'D'

        # Generate Key Risk Factors & Highlights
        risk_factors = []
        if dti_ratio > 40:
            risk_factors.append(f"High Debt Burden: {dti_ratio:.1f}% of income is spent on loan EMIs.")
        if cushion_months < 3.0:
            risk_factors.append(f"Low Emergency Reserve: Current liquid funds cover only {cushion_months:.1f} months of expenses.")
        if outflow_ratio > 80:
            risk_factors.append(f"Tight Cash Flow: Monthly commitments consume {outflow_ratio:.1f}% of total income.")
        if total_investments == 0:
            risk_factors.append("No active investment portfolio detected.")

        # Save to history for trend tracking
        if self.user and self.user.is_authenticated:
            FinancialHealthHistory.objects.create(
                user=self.user,
                score=final_score,
                status=status,
                dti_ratio=round(dti_ratio, 2),
                savings_ratio=round(cushion_months, 2),
                expense_ratio=round(outflow_ratio, 2)
            )

        return {
            'overall_score': final_score,
            'status': status,
            'grade': grade,
            'metrics': {
                'dti': {
                    'score': round(dti_score, 1),
                    'ratio_percent': round(dti_ratio, 1),
                    'monthly_emi': round(total_monthly_emi, 2),
                    'income': round(income_val, 2)
                },
                'emergency_cushion': {
                    'score': round(cushion_score, 1),
                    'months_covered': round(cushion_months, 1),
                    'liquid_assets': round(liquid_assets, 2)
                },
                'cashflow_outflow': {
                    'score': round(outflow_score, 1),
                    'outflow_percent': round(outflow_ratio, 1),
                    'monthly_commitments': round(total_monthly_commitments, 2)
                },
                'investment_growth': {
                    'score': round(investment_score, 1),
                    'total_investments': round(total_investments, 2),
                    'net_worth': round(total_net_worth, 2)
                }
            },
            'risk_factors': risk_factors
        }
