import { Discount } from '../model/discount';
import { now, utc } from './date-util';

const isDiscountActive = (discount: Discount, currentTime: Date): boolean => {
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
