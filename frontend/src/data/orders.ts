export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  options?: string[];
}

export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  externalId?: string; // e.g. Uber Eats order ID
  source: 'website' | 'ubereats' | 'phone';
  customerName: string;
  customerPhone?: string;
  address?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedPrepTime?: number; // in minutes
}

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_1',
    externalId: 'UBER-7721-88',
    source: 'ubereats',
    customerName: 'John Doe',
    items: [
      { id: 'item_1', name: 'Smash Classic Burger', quantity: 2, price: 12.99, options: ['No Onions'] },
      { id: 'item_3', name: 'Peri Peri Fries', quantity: 1, price: 4.50 }
    ],
    total: 30.48,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
  },
  {
    id: 'ord_2',
    source: 'website',
    customerName: 'Sarah Smith',
    items: [
      { id: 'item_2', name: 'Double Bacon Smash', quantity: 1, price: 15.99 }
    ],
    total: 15.99,
    status: 'preparing',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
  }
];
