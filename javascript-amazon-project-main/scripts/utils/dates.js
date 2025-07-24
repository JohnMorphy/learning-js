import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm';

export function getOrderDateFormat(date) {
    let dateObject = dayjs(date);
    return dateObject.format("MMMM D");
}