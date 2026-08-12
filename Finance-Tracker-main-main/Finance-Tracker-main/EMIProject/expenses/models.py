from django.db import models
from django.utils import timezone
from datetime import date
from django.contrib.auth.models import User

class Wallet(models.Model):
    TYPE_CHOICES = [
        ('BANK', 'Bank Account'),
        ('CASH', 'Cash Wallet'),
        ('CARD', 'Credit/Debit Card'),
        ('EWALLET', 'E-Wallet / UPI'),
        ('SAVINGS', 'Savings Account'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    wallet_type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='BANK')
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    account_number_last4 = models.CharField(max_length=4, blank=True, null=True)
    color = models.CharField(max_length=20, default='#2563eb')
    icon = models.CharField(max_length=50, default='fa-wallet')
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} (₹{self.balance})"

    @classmethod
    def get_total_balance(cls, user=None):
        from django.db.models import Sum
        qs = cls.objects.all()
        if user and user.is_authenticated:
            qs = qs.filter(user=user)
        return qs.aggregate(Sum('balance'))['balance__sum'] or 0.00


class CategoryBudget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    category = models.CharField(max_length=3, choices=[
        ('FOO', 'Food'),
        ('TRA', 'Transport'),
        ('ENT', 'Entertainment'),
        ('BIL', 'Bills'),
        ('EMI', 'EMI'),
        ('OTH', 'Other'),
    ])
    monthly_limit = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'category')

    def __str__(self):
        return f"{self.get_category_display()}: ₹{self.monthly_limit}"


class Expense(models.Model):
    CATEGORY_CHOICES = [
        ('FOO', 'Food'),
        ('TRA', 'Transport'),
        ('ENT', 'Entertainment'),
        ('BIL', 'Bills'),
        ('EMI', 'EMI'),
        ('OTH', 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    wallet = models.ForeignKey(Wallet, on_delete=models.SET_NULL, null=True, blank=True, related_name='expenses')
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=3, choices=CATEGORY_CHOICES, default='OTH')
    date = models.DateField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.amount}"

    class Meta:
        ordering = ['-date']


class RecurringExpense(models.Model):
    FREQUENCY_CHOICES = [
        ('MON', 'Monthly'),
        ('WEK', 'Weekly'),
    ]
    
    TYPE_CHOICES = [
        ('BILL', 'Bill/Subscription'),
        ('SIP', 'SIP / Investment'),
    ]

    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    recurrence_type = models.CharField(max_length=4, choices=TYPE_CHOICES, default='BILL')
    category = models.CharField(max_length=3, choices=Expense.CATEGORY_CHOICES, null=True, blank=True)
    frequency = models.CharField(max_length=3, choices=FREQUENCY_CHOICES, default='MON')
    
    # New Field: Fixed Payment Date (1-31)
    payment_date = models.IntegerField(default=1, help_text="Day of the month (1-31) when this is due")
    
    start_date = models.DateField(default=date.today)
    last_processed_date = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.title} ({self.get_frequency_display()})"


class Income(models.Model):
    SOURCE_CHOICES = [
        ('SALARY', 'Salary'),
        ('FREELANCE', 'Freelance'),
        ('INVESTMENT', 'Investment Return'),
        ('GIFT', 'Gift / Bonus'),
        ('OTHER', 'Other Income'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='SALARY')
    wallet = models.ForeignKey(Wallet, on_delete=models.SET_NULL, null=True, blank=True, related_name='incomes')
    date = models.DateField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} (+₹{self.amount})"

    class Meta:
        ordering = ['-date']


class WalletTransfer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    from_wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transfers_sent')
    to_wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transfers_received')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    note = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transfer ₹{self.amount} from {self.from_wallet.name} to {self.to_wallet.name}"
