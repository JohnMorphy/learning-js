
export function formatMoney(cents: number) {
    return `${cents < 0 ? '-' : ''}$${Math.abs(Math.round(cents) / 100).toFixed(2)}`
}