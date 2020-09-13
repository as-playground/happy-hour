import { Discount, Drink, Order } from '..';
import { calculatePriceToPay } from './order-fn';

it('[calculatePriceToPay] no discounts', () => {
    const testDrink: Drink = {
        name: 'Schilcher Spritzer',
        price: 5.8,
    };

    const testOrder: Order = { id: 1, timestamp: new Date(), drink: testDrink, discounts: [] };

    const priceToPay = calculatePriceToPay(testOrder);

    expect(priceToPay).toEqual(testDrink.price);
});

it('[calculatePriceToPay] no valid discounts', () => {
    const testDrink: Drink = {
        name: 'Schilcher Spritzer',
        price: 5.8,
    };

    const testDiscounts: Discount[] = [
        {
            name: 'Happy Hour',
            amount: 0.5,
            validDrinks: [{ name: 'Other Drink', price: 3.9 }],
            validDiscountTimes: {},
        },
    ];

    const testOrder: Order = { id: 1, timestamp: new Date(), drink: testDrink, discounts: testDiscounts };

    const priceToPay = calculatePriceToPay(testOrder);

    expect(priceToPay).toEqual(testDrink.price);
});

it('[calculatePriceToPay] valid discounts', () => {
    const testDrink: Drink = {
        name: 'Schilcher Spritzer',
        price: 5.8,
    };

    const testDiscounts: Discount[] = [
        {
            name: 'Happy Hour',
            amount: 0.5,
            validDrinks: [testDrink],
            validDiscountTimes: {},
        },
    ];

    const testOrder: Order = { id: 1, timestamp: new Date(), drink: testDrink, discounts: testDiscounts };

    const priceToPay = calculatePriceToPay(testOrder);

    expect(priceToPay).toEqual(2.9);
});
