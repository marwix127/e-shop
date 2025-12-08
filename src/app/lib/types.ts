export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity?: number;
}

export interface Purchase {
  id: string;
  date: string;
  items: Product[];
  total: number;
}