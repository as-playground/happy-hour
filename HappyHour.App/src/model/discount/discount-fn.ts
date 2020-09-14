import { Discount, Drink } from '..';
import { now, utc } from '../../util/date-util';

export const isDiscountActive = (discount: Discount, currentTime: Date): boolean => {
    const currentWeekDay = currentTime.getDay();
    const possibleDiscountTime = discount.validDiscountTimes[currentWeekDay];

    if (!possibleDiscountTime) {
        return false;
    }

    const currentTimeutc = utc().hour(currentTime.getHours()).minute(currentTime.getMinutes()).second(0).millisecond(0);

    const discountTimeToutc = utc()
        .hour(possibleDiscountTime.to.getHours())
        .minute(possibleDiscountTime.to.getMinutes())
        .second(0)
        .millisecond(0);

    const discountTimeFromutc = utc()
        .hour(possibleDiscountTime.from.getHours())
        .minute(possibleDiscountTime.from.getMinutes())
        .second(0)
        .millisecond(0);

    return currentTimeutc.isBetween(discountTimeFromutc, discountTimeToutc, 'minute', '[');
};

export const findActiveDiscounts = (discounts: Discount[], currentTime: Date = now()): Discount[] => {
    return discounts.filter((discount) => isDiscountActive(discount, currentTime));
};

export const findValidDiscounts = (drink: Drink, discounts: Discount[]) => {
    return discounts.filter((discount) => discount.validDrinks.includes(drink));
};

export const calculatePriceToPay = (drink: Drink, discounts: Discount[]) => {
    const validDiscounts = findValidDiscounts(drink, discounts);
    return validDiscounts.reduce((totalSum, discount) => totalSum * (1 - discount.amount), drink.price);
};
