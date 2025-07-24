import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm'

const today = dayjs();

const day3 = today.add(3, 'day');
const oneMonth = today.add(1, 'month');

console.log(day3.format('MMMM D'));
console.log(oneMonth.format('MMMM D'));

console.log(isWeekend(today));
console.log(isWeekend(day3));
console.log(isWeekend(oneMonth));

function isWeekend(date) {
    const formatDate = date.format('dddd');
    return (formatDate === 'Saturday' || formatDate === 'Sunday') ? true : false;
}