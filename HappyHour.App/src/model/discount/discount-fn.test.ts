import { calculatePriceToPay, Discount, findActiveDiscounts, findValidDiscounts, isDiscountActive } from '.';
import { Drink, WeekDay } from '..';
import { utc } from '../../util/date-util';

it('[isDiscountActive] discount is active at exact start', () => {
    const discount: Discount = {
        name: 'Happy Hour',
        amount: 0.5,
        validDrinks: [
            {
                name: 'Aperol Spritzer',
                price: 5.8,
            },
        ],
        validDiscountTimes: {
            [WeekDay.Monday]: {
                from: utc().hour(18).minute(0).second(0).millisecond(0).toDate(),
                to: utc().hour(20).minute(0).second(0).millisecond(0).toDate(),
            },
        },
    };

    const currentTime = utc().day(WeekDay.Monday).hour(18).minute(0).second(0).millisecond(0).toDate();

    expect(isDiscountActive(discount, currentTime)).toBeTruthy();
});

it('[isDiscountActive] discount is active at exact end', () => {
    const discount: Discount = {
        name: 'Happy Hour',
        amount: 0.5,
        validDrinks: [
            {
                name: 'Aperol Spritzer',
                price: 5.8,
            },
        ],
        validDiscountTimes: {
            [WeekDay.Monday]: {
                from: utc().hour(18).minute(0).toDate(),
                to: utc().hour(20).minute(0).toDate(),
            },
        },
    };

    const currentTime = utc().day(WeekDay.Monday).hour(20).minute(0).second(0).millisecond(0).toDate();

    expect(isDiscountActive(discount, currentTime)).toBeTruthy();
});

it('[isDiscountActive] discount is not yet active', () => {
    const discount: Discount = {
        name: 'Happy Hour',
        amount: 0.5,
        validDrinks: [
            {
                name: 'Aperol Spritzer',
                price: 5.8,
            },
        ],
        validDiscountTimes: {
            [WeekDay.Monday]: {
                from: utc().hour(18).minute(0).second(0).millisecond(0).toDate(),
                to: utc().hour(20).minute(0).second(0).millisecond(0).toDate(),
            },
        },
    };

    const currentTime = utc().day(WeekDay.Monday).hour(17).minute(59).second(0).millisecond(0).toDate();

    expect(isDiscountActive(discount, currentTime)).toBeFalsy();
});

it('[isDiscountActive] discount is no longer active', () => {
    const discount: Discount = {
        name: 'Happy Hour',
        amount: 0.5,
        validDrinks: [
            {
                name: 'Aperol Spritzer',
                price: 5.8,
            },
        ],
        validDiscountTimes: {
            [WeekDay.Monday]: {
                from: utc().hour(18).minute(0).second(0).millisecond(0).toDate(),
                to: utc().hour(20).minute(0).second(0).millisecond(0).toDate(),
            },
        },
    };

    const currentTime = utc().day(WeekDay.Monday).hour(20).minute(1).second(0).millisecond(0).toDate();

    expect(isDiscountActive(discount, currentTime)).toBeFalsy();
});

it('[findActiveDiscounts] no active discounts', () => {
    const testDiscounts: Discount[] = [
        {
            name: 'Happy Hour',
            amount: 0.5,
            validDrinks: [],
            validDiscountTimes: {
                [WeekDay.Monday]: {
                    from: utc().hour(16).minute(0).second(0).millisecond(0).toDate(),
                    to: utc().hour(18).minute(0).second(0).millisecond(0).toDate(),
                },
            },
        },
    ];

    const currentTime = utc().day(WeekDay.Monday).hour(18).minute(1).second(0).millisecond(0).toDate();

    const activeDiscounts = findActiveDiscounts(testDiscounts, currentTime);

    expect(activeDiscounts.length).toEqual(0);
});

it('[findActiveDiscounts] active discounts', () => {
    const testDiscounts: Discount[] = [
        {
            name: 'Happy Hour',
            amount: 0.5,
            validDrinks: [],
            validDiscountTimes: {
                [WeekDay.Monday]: {
                    from: utc().hour(16).minute(0).second(0).millisecond(0).toDate(),
                    to: utc().hour(18).minute(0).second(0).millisecond(0).toDate(),
                },
            },
        },
    ];

    const testCurrentTime = utc().day(WeekDay.Monday).hour(17).minute(30).second(0).millisecond(0).toDate();

    const activeDiscounts = findActiveDiscounts(testDiscounts, testCurrentTime);

    expect(activeDiscounts.length).toEqual(1);
    expect(activeDiscounts).toContain(testDiscounts[0]);
});

it('[findValidDiscounts] no valid discounts', () => {
    const testDrinks: Drink[] = [
        {
            name: 'Aperol Spritzer',
            price: 5.8,
        },
        {
            name: 'Soda Zitron 0.5L',
            price: 3.9,
        },
    ];

    const testDiscounts: Discount[] = [
        {
            name: 'Happy Hour',
            amount: 0.5,
            validDrinks: [testDrinks[0]],
            validDiscountTimes: {
                [WeekDay.Monday]: {
                    from: utc().hour(16).minute(0).second(0).millisecond(0).toDate(),
                    to: utc().hour(18).minute(0).second(0).millisecond(0).toDate(),
                },
            },
        },
    ];

    const testDrink = testDrinks[1];

    const validDiscounts = findValidDiscounts(testDrink, testDiscounts);

    expect(validDiscounts.length).toEqual(0);
});

it('[findValidDiscounts] valid discounts', () => {
    const testDrinks: Drink[] = [
        {
            name: 'Aperol Spritzer',
            price: 5.8,
        },
        {
            name: 'Soda Zitron 0.5L',
            price: 3.9,
        },
    ];

    const testDiscounts: Discount[] = [
        {
            name: 'Happy Hour',
            amount: 0.5,
            validDrinks: [testDrinks[0]],
            validDiscountTimes: {
                [WeekDay.Monday]: {
                    from: utc().hour(16).minute(0).second(0).millisecond(0).toDate(),
                    to: utc().hour(18).minute(0).second(0).millisecond(0).toDate(),
                },
            },
        },
    ];

    const testDrink = testDrinks[0];

    const validDiscounts = findValidDiscounts(testDrink, testDiscounts);

    expect(validDiscounts.length).toEqual(1);
    expect(validDiscounts).toContain(testDiscounts[0]);
});

it('[calculatePriceToPay] no discounts', () => {
    const testDrink: Drink = {
        name: 'Schilcher Spritzer',
        price: 5.8,
    };

    const priceToPay = calculatePriceToPay(testDrink, []);

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
            validDiscountTimes: {
                [WeekDay.Monday]: {
                    from: utc().hour(16).minute(0).second(0).millisecond(0).toDate(),
                    to: utc().hour(18).minute(0).second(0).millisecond(0).toDate(),
                },
            },
        },
    ];

    const priceToPay = calculatePriceToPay(testDrink, testDiscounts);

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
            validDiscountTimes: {
                [WeekDay.Monday]: {
                    from: utc().hour(16).minute(0).second(0).millisecond(0).toDate(),
                    to: utc().hour(18).minute(0).second(0).millisecond(0).toDate(),
                },
            },
        },
    ];

    const priceToPay = calculatePriceToPay(testDrink, testDiscounts);

    expect(priceToPay).toEqual(2.9);
});
