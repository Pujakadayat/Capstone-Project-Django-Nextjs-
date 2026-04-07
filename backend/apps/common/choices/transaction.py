from django.db import models


class TransactionType(models.TextChoices):
        RECEIVE = "RECEIVE", "Receive"
        SALE = "SALE", "Sale"
        RETURN = "RETURN", "Return"
        ADJUSTMENT = "ADJUSTMENT","Adjustment"