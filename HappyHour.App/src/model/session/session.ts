import { Order } from '../order';

export interface Session {
    id?: number;
    timestamp: Date;
    orders: Order[];
    closed: boolean;
}
