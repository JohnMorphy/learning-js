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
})

