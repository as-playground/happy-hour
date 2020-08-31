import { dayjs } from '../util';
import { Bar, Drink, WeekDay } from './../model';

const happyHourDrinks: Drink[] = [
    {
        name: 'Schilcher-Spritzer',
        price: 5.8,
    },
    {
        name: 'Hugo',
        price: 5.8,
    },
    {
        name: 'Aperol Spritzer',
        price: 5.8,
    },
    {
        name: 'Sommerpunsch',
        price: 5.8,
    },
];

const bar: Bar = {
    name: 'Bruckner-Kaffeehaus',
    offeredDrinks: [
        ...happyHourDrinks,
        {
            name: 'Soda Zitron 0.25L',
            price: 2.3,
        },
        {
            name: 'Soda Zitron 0.5L',
            price: 3.9,
        },
        {
            name: 'Coca Cola / Coca Cola Zero 0.33L',
            price: 3.6,
        },
        {
            name: 'Freistädter Ratsherrn 0.5L',
            price: 3.9,
        },
    ],
    offeredDiscounts: [
        {
            name: 'Happy Hour',
            amount: 50.0,
            validDrinks: happyHourDrinks,
            validDiscountTimes: {
                [WeekDay.Monday]: {
                    from: dayjs().hour(16).minute(0).toDate(),
                    to: dayjs().hour(18).minute(0).toDate(),
                },
                [WeekDay.Tuesday]: {
                    from: dayjs().hour(16).minute(0).toDate(),
                    to: dayjs().hour(18).minute(0).toDate(),
                },
                [WeekDay.Wednesday]: {
                    from: dayjs().hour(16).minute(0).toDate(),
                    to: dayjs().hour(18).minute(0).toDate(),
                },
                [WeekDay.Thursday]: {
                    from: dayjs().hour(16).minute(0).toDate(),
                    to: dayjs().hour(18).minute(0).toDate(),
                },
            },
        },
    ],
};

export default bar;
