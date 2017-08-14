import moment from 'moment-timezone';

export class DateUtil {

    static welcomeMessage() {
        let nowHour = moment().hours();
        if(nowHour >= 0 && nowHour <= 4) {
            return 'Boa madrugada';
        } else if(nowHour > 4 && nowHour <= 12) {
            return 'Bom dia';
        } else if(nowHour > 12 && nowHour <= 18) {
            return 'Boa tarde';
        } else if(nowHour > 18) {
            return 'Boa noite';
        }
    }

    static withoutSignals() {
        let now = moment();
        return `${now.year()}${now.month()}${now.date()}${now.hours()}${now.minutes()}${now.seconds()}`;
    }

    static nowIsBeforeHour(hour) {
        hour = moment(hour, 'HH:mm');
        let now = moment();
        return now.isBefore(hour);
    }

    static nowIsAfterHour(hour) {
        let now = moment();
        return now.isAfter(hour);
    }

    static nowIsBetweenHour(first, last) {
        let now = moment();
        first = moment(first, 'HH:mm');
        last = moment(last, 'HH:mm');
        return now.isAfter(first) && now.isBefore(last);
    }

    static isAfterDate(day) {
        day = Number(day);
        let now = moment();
        let getDay = moment().date(day);
        return now.isAfter(getDay);
    }

    static isBeforeDate(day) {
        day = Number(day);
        let now = moment();
        let getDay = moment().date(day);
        return now.isBefore(getDay);
    }

    static isAfterIntervalDate(date, interval) {
        let now = moment();
        let initialDate = moment(date);
        initialDate.add(interval, 'milliseconds');
        return initialDate.isAfter(now);
    }

    static getFormattedAfterDate(day) {
        day = Number(day);
        let afterDay = moment().date(day)
        let afterMonth = afterDay.month() + 1;
        afterDay.month(afterMonth);
        return afterDay.format('DD/MM/YYYY');
    }

    static getFormattedHour(hour) {
        hour = moment(hour);
        return hour.format('HH:mm');
    }

    static getFormattedDate(day) {
        let currentDay = moment().date(day);
        return currentDay.format('DD/MM/YYYY');
    }

    static getFormattedBoth(fullDate) {
        let both = moment(fullDate);
        return both.format('DD/MM/YYYY H:mm');
    }

    static nowIncrementMinute(minutes) {
        let now = moment();
        now.minutes(now.minutes() + minutes);
        return now;
    }
}