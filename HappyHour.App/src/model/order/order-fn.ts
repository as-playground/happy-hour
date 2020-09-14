import { calculatePriceToPay as calculatePriceToPayForDrink } from '../discount';
import { Order } from './order';

export const calculatePriceToPay = ({ drink, discounts }: Order) => calculatePriceToPayForDrink(drink, discounts);

export const calculateSum = (orders: Order[]) => orders.reduce((sum, order) => sum + calculatePriceToPay(order), 0);
