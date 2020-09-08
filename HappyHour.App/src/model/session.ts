import { Order } from './order';

export interface Session {
    timestamp?: Date;
    orders: Order[];
}
