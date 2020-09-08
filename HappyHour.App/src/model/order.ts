import { Discount } from './discount';
import { Drink } from './drink';

export interface Order {
    id: number;
    timestamp: Date;
    drink: Drink;
    discounts: Discount[];
}
