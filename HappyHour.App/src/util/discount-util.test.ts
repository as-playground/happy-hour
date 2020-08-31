import { Discount, WeekDay } from '../model';
import { dayjs } from './date-util';
import { isDiscountActive } from './discount-util';

it('discount is active at exact start', () => {
    const discount: Discount = {
        name: 'Happy Hour',
        amount: 50.0,
        validDrinks: [
            {
                name: 'Aperol Spritzer',
                price: 5.8,
            },
        ],
        validDiscountTimes: {
            [WeekDay.Monday]: {
                from: dayjs().hour(18).minute(0).second(0).millisecond(0).toDate(),
                to: dayjs().hour(20).minute(0).second(0).millisecond(0).toDate(),
            },
        },
    };

    const currentTime = dayjs().day(WeekDay.Monday).hour(18).minute(0).second(0).millisecond(0).toDate();

    expect(isDiscountActive(discount, currentTime)).toBeTruthy();
});

it('discount is active at exact end', () => {
    const discount: Discount = {
        name: 'Happy Hour',
        amount: 50.0,
        validDrinks: [
            {
                name: 'Aperol Spritzer',
                price: 5.8,
            },
        ],
        validDiscountTimes: {
            [WeekDay.Monday]: {
                from: dayjs().hour(18).minute(0).toDate(),
                to: dayjs().hour(20).minute(0).toDate(),
            },
        },
    };

    const currentTime = dayjs().day(WeekDay.Monday).hour(20).minute(0).second(0).millisecond(0).toDate();

    expect(isDiscountActive(discount, currentTime)).toBeTruthy();
});

it('discount is not yet active', () => {
    const discount: Discount = {
        name: 'Happy Hour',
        amount: 50.0,
        validDrinks: [
            {
                name: 'Aperol Spritzer',
                price: 5.8,
            },
        ],
        validDiscountTimes: {
            [WeekDay.Monday]: {
                from: dayjs().hour(18).minute(0).second(0).millisecond(0).toDate(),
                to: dayjs().hour(20).minute(0).second(0).millisecond(0).toDate(),
            },
        },
    };

    const currentTime = dayjs().day(WeekDay.Monday).hour(17).minute(59).second(0).millisecond(0).toDate();

    expect(isDiscountActive(discount, currentTime)).toBeFalsy();
});

it('discount is no longer active', () => {
    const discount: Discount = {
        name: 'Happy Hour',
        amount: 50.0,
        validDrinks: [
            {
                name: 'Aperol Spritzer',
                price: 5.8,
            },
        ],
        validDiscountTimes: {
            [WeekDay.Monday]: {
                from: dayjs().hour(18).minute(0).second(0).millisecond(0).toDate(),
                to: dayjs().hour(20).minute(0).second(0).millisecond(0).toDate(),
            },
        },
    };

    const currentTime = dayjs().day(WeekDay.Monday).hour(20).minute(1).second(0).millisecond(0).toDate();

    expect(isDiscountActive(discount, currentTime)).toBeFalsy();
});
