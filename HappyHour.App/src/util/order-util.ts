import { Order } from '../model';

export const calculatePriceToPay = ({ drink, discounts }: Order) =>
    discounts.reduce((totalSum, discount) => totalSum * (1 - discount.amount), drink.price);

export const calculateSum = (orders: Order[]) => {
    return orders.reduce((sum, order) => sum + calculatePriceToPay(order), 0);
};
