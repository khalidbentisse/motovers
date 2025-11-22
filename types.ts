export enum Category {
  BIKES = 'Motorcycles',
  PARTS = 'Parts',
  ACCESSORIES = 'Accessories'
}

export enum Brand {
  HONDA = 'Honda',
  YAMAHA = 'Yamaha',
  KTM = 'KTM',
  DUCATI = 'Ducati',
  BMW = 'BMW',
  KAWASAKI = 'Kawasaki',
  DAYTONA = 'Daytona',
  BOXER = 'Boxer',
  GENERIC = 'Aftermarket'
}

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  price: number;
  image: string;
  description: string;
  specs?: {
    engine?: string;
    power?: string;
    weight?: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  total: number;
  date: number;
  status: 'pending' | 'completed';
}