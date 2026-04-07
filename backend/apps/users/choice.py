from django.db import models


class Role(models.TextChoices):
    ADMIN= "ADMIN","Admin"
    STAFF = "STAFF","Staff"
    CUSTOMER = "CUSTOMER","Customer"