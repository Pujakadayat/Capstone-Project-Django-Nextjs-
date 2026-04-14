export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  image?: string | null;
  parent?: ProductCategory | null;
  created_at: string;
  updated_at: string;
}
