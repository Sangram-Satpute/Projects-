from django.db import models
from django.contrib.auth.models import User

class FinancialGoal(models.Model):
    CATEGORY_CHOICES = [
        ('VEHICLE', 'Vehicle (Bike/Car)'),
        ('ELECTRONICS', 'Electronics (Laptop/Phone)'),
        ('VACATION', 'Travel & Vacation'),
        ('EMERGENCY', 'Emergency Fund'),
        ('HOUSE', 'Real Estate / House'),
        ('OTHER', 'Other Goal'),
    ]

    PRIORITY_CHOICES = [
        ('HIGH', 'High Priority'),
        ('MEDIUM', 'Medium Priority'),
        ('LOW', 'Low Priority'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='financial_goals')
    name = models.CharField(max_length=120)
    target_amount = models.DecimalField(max_digits=12, decimal_places=2)
    current_saved = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    target_date = models.DateField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='OTHER')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='MEDIUM')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - ₹{self.current_saved}/₹{self.target_amount}"

    class Meta:
        ordering = ['target_date']


class AffordabilityQueryLog(models.Model):
    PAYMENT_CHOICES = [
        ('LUMP_SUM', 'Lump Sum'),
        ('EMI', 'EMI / Financing'),
    ]

    DECISION_CHOICES = [
        ('YES', 'Yes, Affordable'),
        ('WAIT', 'Wait & Save'),
        ('NO', 'Not Affordable'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='affordability_queries')
    purchase_name = models.CharField(max_length=150)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_type = models.CharField(max_length=10, choices=PAYMENT_CHOICES, default='LUMP_SUM')
    decision = models.CharField(max_length=10, choices=DECISION_CHOICES)
    affordability_score = models.FloatField()
    explanation = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.purchase_name} (₹{self.amount}) - {self.decision}"

    class Meta:
        ordering = ['-created_at']


class FinancialHealthHistory(models.Model):
    STATUS_CHOICES = [
        ('EXCELLENT', 'Excellent'),
        ('GOOD', 'Good'),
        ('FAIR', 'Fair'),
        ('POOR', 'Poor'),
        ('CRITICAL', 'Critical'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='health_histories')
    score = models.FloatField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    dti_ratio = models.FloatField()
    savings_ratio = models.FloatField()
    expense_ratio = models.FloatField()
    calculated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} Health Score: {self.score} ({self.status})"

    class Meta:
        ordering = ['-calculated_at']


class AIRecommendation(models.Model):
    CATEGORY_CHOICES = [
        ('SAVINGS', 'Savings & Liquid Fund'),
        ('DEBT', 'Debt & EMI Management'),
        ('INVESTMENT', 'Investments & Growth'),
        ('SPENDING', 'Budget & Outflow Optimization'),
        ('EMERGENCY_FUND', 'Emergency Preparedness'),
    ]

    PRIORITY_CHOICES = [
        ('HIGH', 'High Priority'),
        ('MEDIUM', 'Medium Priority'),
        ('LOW', 'Low Priority'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ai_recommendations')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='MEDIUM')
    title = models.CharField(max_length=200)
    description = models.TextField()
    action_url = models.CharField(max_length=255, blank=True, null=True)
    is_dismissed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.priority}] {self.title}"

    class Meta:
        ordering = ['-created_at']
