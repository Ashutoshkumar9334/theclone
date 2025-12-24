export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  material: string;
  discount?: number;
  rating?: number;
  reviews?: number;
  brand?: string;
  inStock?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export enum PageView {
  HOME = 'HOME',
  SHOP = 'SHOP',
  PRODUCT = 'PRODUCT',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  CART = 'CART',
  SELL_WITH_FABRIMA = 'SELL_WITH_FABRIMA',
  VENDOR_LOGIN = 'VENDOR_LOGIN',
  USER_LOGIN = 'USER_LOGIN',
  SIGN_UP = 'SIGN_UP'
}