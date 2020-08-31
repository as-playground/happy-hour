import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Bar, Drink, WeekDay } from './../model';

dayjs.extend(utc);

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
            name: 'Soda Zitron 0.5L',
            price: 2.8,
        },
    ],
    offeredDiscounts: [
        {
            name: 'Happy Hour',
            amount: 50.0,
            validDrinks: happyHourDrinks,
            validDiscountTimes: {
                [WeekDay.Monday]: {
                    from: dayjs.utc().hour(18).minute(0).toDate(),
                    to: dayjs.utc().hour(20).minute(0).toDate(),
                },
                [WeekDay.Tuesday]: {
                    from: dayjs.utc().hour(18).minute(0).toDate(),
                    to: dayjs.utc().hour(20).minute(0).toDate(),
                },
                [WeekDay.Wednesday]: {
                    from: dayjs.utc().hour(18).minute(0).toDate(),
                    to: dayjs.utc().hour(20).minute(0).toDate(),
                },
                [WeekDay.Thursday]: {
                    from: dayjs.utc().hour(18).minute(0).toDate(),
                    to: dayjs.utc().hour(20).minute(0).toDate(),
                },
            },
        },
    ],
};

export default bar;
