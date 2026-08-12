from rest_framework import serializers
from decision_engine.models import FinancialGoal, AffordabilityQueryLog, FinancialHealthHistory, AIRecommendation

class FinancialGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialGoal
        fields = ['id', 'name', 'target_amount', 'current_saved', 'target_date', 'category', 'priority', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


from decimal import Decimal

class AffordabilityRequestSerializer(serializers.Serializer):
    purchase_name = serializers.CharField(max_length=150, required=True)
    amount = serializers.DecimalField(max_digits=12, decimal_places=2, min_value=Decimal('1.00'))
    payment_type = serializers.ChoiceField(choices=['LUMP_SUM', 'EMI'], default='LUMP_SUM')
    down_payment = serializers.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0.00'), min_value=Decimal('0.00'))
    tenure_months = serializers.IntegerField(default=12, min_value=1, max_value=360)
    interest_rate = serializers.FloatField(default=12.0, min_value=0.0, max_value=100.0)


class GoalSimulationRequestSerializer(serializers.Serializer):
    goal_name = serializers.CharField(max_length=150, required=True)
    target_amount = serializers.DecimalField(max_digits=12, decimal_places=2, min_value=Decimal('1.00'))
    current_saved = serializers.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0.00'), min_value=Decimal('0.00'))
    target_date = serializers.DateField(required=False, allow_null=True)
    monthly_contribution = serializers.DecimalField(max_digits=12, decimal_places=2, required=False, allow_null=True, min_value=Decimal('0.00'))


class AIRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIRecommendation
        fields = ['id', 'category', 'priority', 'title', 'description', 'action_url', 'is_dismissed', 'created_at']
        read_only_fields = ['id', 'created_at']


class FinancialHealthHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialHealthHistory
        fields = ['id', 'score', 'status', 'dti_ratio', 'savings_ratio', 'expense_ratio', 'calculated_at']
        read_only_fields = ['id', 'calculated_at']
