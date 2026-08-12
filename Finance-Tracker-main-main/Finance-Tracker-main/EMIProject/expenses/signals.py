from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Expense, Income, WalletTransfer, Wallet
from core.services.whatsapp import WhatsAppService
from django.contrib.auth import get_user_model

HIGH_VALUE_THRESHOLD = 5000

@receiver(post_save, sender=Expense)
def handle_expense_save(sender, instance, created, **kwargs):
    if created:
        if instance.wallet:
            instance.wallet.balance -= instance.amount
            instance.wallet.save()

        if instance.amount > HIGH_VALUE_THRESHOLD:
            User = get_user_model()
            target_user = instance.user or User.objects.filter(profile__phone_number__isnull=False).first()
            if target_user:
                try:
                    service = WhatsAppService()
                    service.send_alert(target_user, instance.title, instance.amount)
                except Exception as e:
                    print(f"Failed to send alert: {e}")

@receiver(post_delete, sender=Expense)
def handle_expense_delete(sender, instance, **kwargs):
    if instance.wallet:
        instance.wallet.balance += instance.amount
        instance.wallet.save()

@receiver(post_save, sender=Income)
def handle_income_save(sender, instance, created, **kwargs):
    if created and instance.wallet:
        instance.wallet.balance += instance.amount
        instance.wallet.save()

@receiver(post_delete, sender=Income)
def handle_income_delete(sender, instance, **kwargs):
    if instance.wallet:
        instance.wallet.balance -= instance.amount
        instance.wallet.save()

@receiver(post_save, sender=WalletTransfer)
def handle_transfer_save(sender, instance, created, **kwargs):
    if created:
        instance.from_wallet.balance -= instance.amount
        instance.from_wallet.save()
        instance.to_wallet.balance += instance.amount
        instance.to_wallet.save()

@receiver(post_delete, sender=WalletTransfer)
def handle_transfer_delete(sender, instance, **kwargs):
    instance.from_wallet.balance += instance.amount
    instance.from_wallet.save()
    instance.to_wallet.balance -= instance.amount
    instance.to_wallet.save()
