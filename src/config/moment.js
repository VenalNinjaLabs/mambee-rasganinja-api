import moment from 'moment-timezone';

export function setupMoment() {
    moment.locale('pt-br');
    moment.tz('America/Recife');
}