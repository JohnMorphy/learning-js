export const deliveryOptions = [
    {
        id: '1',
        priceCents: 0,
        deliveryDays: 7,
    }, {
        id: '2',
        priceCents: 499,
        deliveryDays: 3,
    }, {
        id: '3',
        priceCents: 999,
        deliveryDays: 1,
    }
]

export function getDeliveryOptionById(deliveryOptionId) {

    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id == deliveryOptionId) {
            deliveryOption = option;
        }
    })

    return deliveryOption || deliveryOptions[0];

}

export function calculateDeliveryDate(deliveryOptionId, date) {
    const deliveryOption = getDeliveryOptionById(deliveryOptionId);
    const deliveryDays = Number(deliveryOption.deliveryDays);

    for (let i = 0; i < deliveryDays; i++) {
        do {
            date = date.add(1, 'day');
        } while (isWeekend(date))
    }

    return date;
}

function isWeekend(date) {
    const weekday = date.format('dddd');
    return (weekday === 'Saturday' || weekday === 'Sunday');
}