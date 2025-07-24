import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    })

    it('round up correctly', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })

    it('round down correctly', () => {
        expect(formatCurrency(2000.3999)).toEqual('20.00');
    })

    it('negative numbers displayed correctly', () => {
        expect(formatCurrency(-10099)).toEqual('-100.99');
    })
})