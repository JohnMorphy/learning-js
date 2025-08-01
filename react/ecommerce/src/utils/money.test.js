import { describe, expect, it } from 'vitest';
import { formatMoney } from './money';

describe('format money', () => {
    it('formats 1999 cents as $19.99', () => {
        expect(formatMoney(1999)).toBe('$19.99');
    });

    it('displays 2 decimals', () => {
        expect(formatMoney(1090)).toBe('$10.90');
        expect(formatMoney(0)).toBe('$0.00');
    });

    it('rounds the bad decimal from cents - no decimal cents in real world', () => {
        expect(formatMoney(100.9)).toBe('$1.01')
    })

    it('correctly displays negative numbers', () => {
        expect(formatMoney(-999)).toBe('-$9.99')
    })
})

