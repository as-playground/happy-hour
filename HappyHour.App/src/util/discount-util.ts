import { Discount } from '../model/discount';
import { dayjs, now } from './date-util';

const isDiscountActive = (discount: Discount, currentTime: Date): boolean => {
    const currentWeekDay = currentTime.getDay();
    const possibleDiscountTime = discount.validDiscountTimes[currentWeekDay];

    if (!possibleDiscountTime) {
        return false;
    }

    const currentTimeDayJs = dayjs()
        .hour(currentTime.getHours())
        .minute(currentTime.getMinutes())
        .second(0)
        .millisecond(0);

    const discountTimeToDayJs = dayjs()
        .hour(possibleDiscountTime.to.getHours())
        .minute(possibleDiscountTime.to.getMinutes())
        .second(0)
        .millisecond(0);

    const discountTimeFromDayJs = dayjs()
        .hour(possibleDiscountTime.from.getHours())
        .minute(possibleDiscountTime.from.getMinutes())
        .second(0)
        .millisecond(0);

    return currentTimeDayJs.isBetween(discountTimeFromDayJs, discountTimeToDayJs, 'minute', '[');
};

export const findActiveDiscounts = (discounts: Discount[], currentTime: Date = now()): Discount[] => {
    return discounts.filter((discount) => isDiscountActive(discount, currentTime));
};
