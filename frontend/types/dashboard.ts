export interface KPI {
  total_revenue: number;
  total_orders: number;
  total_customers: number;
  low_stock_count: number;
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  id: string;
  name: string;
  sku: string;
  qty_sold: number;
  revenue: number;
}

export interface LowStockProduct {
  id: string;
  name: string;
  sku: string;
  stock: number;
  reorder_point: number;
}

export interface AdminDashboardData {
  kpi: KPI;

  charts: {
    weekly_sales: SalesData[];
    monthly_sales: SalesData[];
  };

  top_products: {
    weekly: TopProduct[];
    monthly: TopProduct[];
  };

  low_stock_products: LowStockProduct[];
}
