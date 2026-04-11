from datetime import timedelta, timezone

from apps.users.permissions import IsAdminOrIsStaff, IsAdminUser
from apps.orders.models.order import Order
from apps.orders.models.orderitem import OrderItem
from apps.products.models.products import Product
from apps.common.choices.status import Status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
from django.contrib.auth import get_user_model
from django.db.models.functions import TruncDay, TruncWeek
from django.db.models import Sum,Count

User = get_user_model()

class DashboardView(APIView):
    permission_classes = [IsAuthenticated,IsAdminOrIsStaff]

    def get(self, request):
        now = timezone.now()
        week_ago = now - timedelta(days=7)
        month_ago = now - timedelta(days=30)

        total_revenue = (
            Order.objects.filter(is_active=True, status=Status.DELIVERED)
            .aggregate(total=Sum("total_amount"))["total"] or 0
        )
        total_orders = Order.objects.filter(is_active=True).count()
        total_customers = User.objects.filter(role="CUSTOMER").count()

       
        low_stock_products = []
        for p in Product.objects.filter(is_active=True).prefetch_related("variants"):
            if p.is_low_stock:
                low_stock_products.append({
                    "id": str(p.id),
                    "name": p.name,
                    "sku": p.sku,
                    "stock": p.total_stock,
                    "reorder_point": p.reorder_point,
                })

        low_stock_count = len(low_stock_products)


        weekly_sales = (
            Order.objects.filter(is_active=True, created_at__gte=week_ago)
            .annotate(day=TruncDay("created_at"))
            .values("day")
            .annotate(
                revenue=Sum("total_amount"),
                orders=Count("id"),
            )
            .order_by("day")
        )


        monthly_sales = (
            Order.objects.filter(is_active=True, created_at__gte=month_ago)
            .annotate(week=TruncWeek("created_at"))
            .values("week")
            .annotate(
                revenue=Sum("total_amount"),
                orders=Count("id"),
            )
            .order_by("week")
        )

    
        top_weekly = (
            OrderItem.objects.filter(
                is_active=True,
                created_at__gte=week_ago,
                order__is_active=True
            )
            .values("product__id", "product__name", "product__sku")
            .annotate(
                total_qty=Sum("quantity"),
                total_revenue=Sum("line_total")
            )
            .order_by("-total_qty")[:5]
        )

        top_monthly = (
            OrderItem.objects.filter(
                is_active=True,
                created_at__gte=month_ago,
                order__is_active=True
            )
            .values("product__id", "product__name", "product__sku")
            .annotate(
                total_qty=Sum("quantity"),
                total_revenue=Sum("line_total")
            )
            .order_by("-total_qty")[:5]
        )

        return Response({
            "kpi": {
                "total_revenue": total_revenue,
                "total_orders": total_orders,
                "total_customers": total_customers,
                "low_stock_count": low_stock_count,
            },
            "charts": {
                "weekly_sales": [
                    {
                        "date": item["day"].strftime("%Y-%m-%d"),
                        "revenue": item["revenue"],
                        "orders": item["orders"],
                    }
                    for item in weekly_sales
                ],
                "monthly_sales": [
                    {
                        "date": item["week"].strftime("%Y-%m-%d"),
                        "revenue": item["revenue"],
                        "orders": item["orders"],
                    }
                    for item in monthly_sales
                ],
            },
            "top_products": {
                "weekly": [
                    {
                        "id": str(item["product__id"]),
                        "name": item["product__name"],
                        "sku": item["product__sku"],
                        "qty_sold": item["total_qty"],
                        "revenue": item["total_revenue"],
                    }
                    for item in top_weekly
                ],
                "monthly": [
                    {
                        "id": str(item["product__id"]),
                        "name": item["product__name"],
                        "sku": item["product__sku"],
                        "qty_sold": item["total_qty"],
                        "revenue": item["total_revenue"],
                    }
                    for item in top_monthly
                ],
            },
            "low_stock_products": low_stock_products,
        })