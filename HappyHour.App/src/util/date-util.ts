import DayJs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import localizedFormatPlugin from 'dayjs/plugin/localizedFormat';
import utcPlugin from 'dayjs/plugin/utc';

DayJs.extend(utcPlugin);
DayJs.extend(isBetweenPlugin);
DayJs.extend(localizedFormatPlugin);

export const utc = (date?: Date): DayJs.Dayjs => DayJs.utc(date);
export const local = (date?: Date): DayJs.Dayjs => DayJs(date);
export const now = (): Date => utc().toDate();

export const remainingSecondsInMinutes = () => 60 - now().getSeconds();
