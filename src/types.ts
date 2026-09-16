export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'veggies' | 'greens' | 'fruits' | 'dairy' | 'oils' | 'staples';
  farm: string;
  price: number;
  originalPrice: number;
  discountPercentage?: number;
  weight: string;
  image: string;
  altText: string;
  badge?: string;
  badgeColor?: 'primary' | 'secondary' | 'tertiary';
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  giTagged?: boolean;
  organicCertified?: boolean;
  coldChainTemp?: string;
  harvestTime?: string;
  description?: string;
  origin?: string;
  brix?: number;
  sensoryNotes?: {
    aroma: string;
    aromaSub: string;
    texture: string;
    textureSub: string;
    seedRatio: string;
    seedRatioSub: string;
  };
  packOptions?: {
    id: string;
    name: string;
    weight: string;
    price: number;
    originalPrice: number;
  }[];
  gallery?: string[];
  farmerProfile?: {
    name: string;
    role: string;
    experience: string;
    image: string;
    quote: string;
    elevation: string;
    method: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPackId?: string;
  selectedPackName?: string;
  unitPrice: number;
  selectedRipeness?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'confirmed' | 'packing' | 'in_transit' | 'delivered';
  etaMinutes: number;
  coldTemp: string;
  items: CartItem[];
  itemTotal: number;
  discount: number;
  deliveryFee: number;
  insulationFee: number;
  tip: number;
  total: number;
  paymentMethod: string;
  paymentRef?: string;
  deliverySlot: string;
  tamperSeal: string;
  rider: {
    name: string;
    rating: number;
    deliveries: number;
    phone: string;
    image: string;
    vehicle: string;
    speed: string;
    battery: string;
  };
  address: {
    title: string;
    zone: string;
    line1: string;
    line2: string;
    cityPin: string;
    contact: string;
    note?: string;
  };
}

export type ActiveView = 
  | 'shop' 
  | 'product_detail' 
  | 'product-detail'
  | 'cart' 
  | 'order_success' 
  | 'order-success'
  | 'tracking' 
  | 'account';
