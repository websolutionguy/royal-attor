export type VolumeOption = '10ml' | '20ml' | '30ml';

export interface ProductVariation {
  volume: VolumeOption;
  price: number; // in BDT (৳)
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'Oud' | 'Musk' | 'Floral' | 'Woody';
  image: string;
  isBestseller?: boolean;
  notes: {
    top: string;
    middle: string;
    base: string;
  };
  variations: Record<VolumeOption, number>; // volume -> price in BDT
}

export interface CartItem {
  id: string; // unique cart item id: e.g., product.id + '-' + variation
  productId: string;
  name: string;
  image: string;
  selectedVolume: VolumeOption;
  unitPrice: number;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  email?: string;
  phone: string;
  address: string;
  notes?: string;
  paymentMethod: 'cod'; // Cash on Delivery
}

export interface Order {
  orderId: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  createdAt: string;
  status: 'Pending' | 'Confirmed' | 'Processing';
}
