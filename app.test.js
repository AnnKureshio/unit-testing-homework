const { nameIsValid, fullTrim, getTotal } = require('./functions');

describe('nameIsValid', () => {
    it('should return true for valid name', () => {
        const result = nameIsValid('John');
        expect(result).toBe(true);
    });

    it('should return false for name shorter than 2 characters', () => {
        const result = nameIsValid('J');
        expect(result).toBe(false);
    });

    it('should return false for name with non-alphabet characters', () => {
        const result = nameIsValid('John123');
        expect(result).toBe(false);
    });
});

describe('fullTrim', () => {
    it('should remove spaces from the string', () => {
        const result = fullTrim('hello world');
        expect(result).toBe('helloworld');
    });

    it('should return an empty string if input is empty', () => {
        const result = fullTrim('');
        expect(result).toBe('');
    });

    it('should return an empty string if input is null or undefined', () => {
        const result = fullTrim(null);
        expect(result).toBe('');
    });
});

describe('getTotal', () => {
    it('should return total without discount', () => {
        const result = getTotal(20, 0);
        expect(result).toBe(20);
    });

    it('should return total with 50% discount', () => {
        const result = getTotal(20, 50);
        expect(result).toBe(10);
    });

    it('should throw an error if discount is not a number', () => {
        const action = () => getTotal(20, 'not-a-number');
        expect(action).toThrow('Скидка должна быть числом');
    });

    it('should throw an error if discount is less than 0', () => {
        const action = () => getTotal(20, -1);
        expect(action).toThrow('Процент скидки должен быть от 0 до 99');
    });

    it('should throw an error if discount is 100 or more', () => {
        const action = () => getTotal(20, 100);
        expect(action).toThrow('Процент скидки должен быть от 0 до 99');
    });
});
