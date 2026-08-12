from django.test import TestCase
from django.contrib.auth.models import User
from expenses.models import Wallet, CategoryBudget, Income, Expense, WalletTransfer
from decimal import Decimal

class WalletBudgetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password123')
        self.wallet1 = Wallet.objects.create(
            user=self.user,
            name='Main Bank',
            wallet_type='BANK',
            balance=Decimal('10000.00')
        )
        self.wallet2 = Wallet.objects.create(
            user=self.user,
            name='Cash Wallet',
            wallet_type='CASH',
            balance=Decimal('2000.00')
        )

    def test_income_increases_wallet_balance(self):
        Income.objects.create(
            user=self.user,
            title='Salary',
            amount=Decimal('5000.00'),
            wallet=self.wallet1
        )
        self.wallet1.refresh_from_db()
        self.assertEqual(self.wallet1.balance, Decimal('15000.00'))

    def test_expense_deducts_wallet_balance(self):
        Expense.objects.create(
            user=self.user,
            title='Groceries',
            amount=Decimal('1500.00'),
            category='FOO',
            wallet=self.wallet1
        )
        self.wallet1.refresh_from_db()
        self.assertEqual(self.wallet1.balance, Decimal('8500.00'))

    def test_wallet_transfer(self):
        WalletTransfer.objects.create(
            user=self.user,
            from_wallet=self.wallet1,
            to_wallet=self.wallet2,
            amount=Decimal('3000.00')
        )
        self.wallet1.refresh_from_db()
        self.wallet2.refresh_from_db()
        self.assertEqual(self.wallet1.balance, Decimal('7000.00'))
        self.assertEqual(self.wallet2.balance, Decimal('5000.00'))

    def test_category_budget_creation(self):
        budget = CategoryBudget.objects.create(
            user=self.user,
            category='FOO',
            monthly_limit=Decimal('6000.00')
        )
        self.assertEqual(budget.monthly_limit, Decimal('6000.00'))
