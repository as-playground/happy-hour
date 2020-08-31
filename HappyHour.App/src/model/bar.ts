import { Discount } from './discount';
import { Drink } from './drink';
export interface Bar {
    name: string;
    offeredDrinks: Drink[];
    offeredDiscounts: Discount[];
}
