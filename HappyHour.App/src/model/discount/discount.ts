import { DiscountTimeDictionary } from '../discount-time-dictionary';
import { Drink } from '../drink';

export interface Discount {
    name: string;
    amount: number;
    validDiscountTimes: DiscountTimeDictionary;
    validDrinks: Drink[];
}
