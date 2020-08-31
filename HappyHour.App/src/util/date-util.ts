import DayJs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';

DayJs.extend(utc);
DayJs.extend(isBetween);

export const dayjs = (): DayJs.Dayjs => DayJs.utc();

export const now = (): Date => dayjs().toDate();

export const remainingSecondsInMinute = () => 60 - now().getSeconds();
