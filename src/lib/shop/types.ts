export type ProductCategory =
  | 'whey-protein'
  | 'creatine'
  | 'mass-gainer'
  | 'protein-shake'
  | 'accessories'
  | 'merchandise';

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'whey-protein': 'Whey Protein',
  'creatine': 'Creatine',
  'mass-gainer': 'Mass Gainer',
  'protein-shake': 'Protein Shake',
  'accessories': 'Accessories',
  'merchandise': 'Merchandise',
};

export interface ProductVariant {
  id: string;
  label: string;
  priceModifier: number;
  inStock: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  images: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  variants?: ProductVariant[];
  tags: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  nutritionFacts?: Record<string, string>;
  reviews?: ProductReview[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM'; product: Product; variant?: ProductVariant }
  | { type: 'REMOVE_ITEM'; productId: string; variantId?: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; variantId: string | undefined; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'HYDRATE'; items: CartItem[] };

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface PaymentInfo {
  method: 'card' | 'upi' | 'cod';
  cardLast4?: string;
  upiId?: string;
}

export type CheckoutStep = 'shipping' | 'payment' | 'review';

export interface CheckoutFormData {
  shipping: ShippingAddress;
  payment: PaymentInfo;
}

export interface OrderItem {
  productId: string;
  productName: string;
  variantLabel?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  shipping: ShippingAddress;
  payment: PaymentInfo;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  placedAt: string;
  estimatedDelivery: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface FilterParams {
  categories?: ProductCategory[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStockOnly?: boolean;
  sortBy?: SortOption;
}
