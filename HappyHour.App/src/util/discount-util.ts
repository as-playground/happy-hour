import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import { Discount } from '../model/discount';

dayjs.extend(isBetween, utc);

export const isDiscountActive = (discount: Discount, currentTime: Date): boolean => {
    const currentWeekDay = currentTime.getDay();
    const possibleDiscountTime = discount.validDiscountTimes[currentWeekDay];

    if (!possibleDiscountTime) {
        return false;
    }

    const currentTimeDayJs = dayjs
        .utc()
        .hour(currentTime.getHours())
        .minute(currentTime.getMinutes())
        .second(0)
        .millisecond(0);

    const discountTimeToDayJs = dayjs
        .utc()
        .hour(possibleDiscountTime.to.getHours())
        .minute(possibleDiscountTime.to.getMinutes())
        .second(0)
        .millisecond(0);

    const discountTimeFromDayJs = dayjs
        .utc()
        .hour(possibleDiscountTime.from.getHours())
        .minute(possibleDiscountTime.from.getMinutes())
        .second(0)
        .millisecond(0);

    return currentTimeDayJs.isBetween(discountTimeFromDayJs, discountTimeToDayJs, 'minute', '[');
};

export const findActiveDiscounts = (discounts: Discount[], currentTime: Date): Discount[] => {
    return discounts.filter((discount) => isDiscountActive(discount, currentTime));
};
