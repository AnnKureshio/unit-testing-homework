import { nameIsValid, fullTrim, getTotal } from './functions';

describe('nameIsValid', () => {
    it('should return true for valid name', () => {
        // Arrange
        const name = 'john';

        // Act
        const result = nameIsValid(name);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false for name shorter than 2 characters', () => {
        // Arrange
        const name = 'a';

        // Act
        const result = nameIsValid(name);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false for name with non-alphabet characters', () => {
        // Arrange
        const name = 'john123';

        // Act
        const result = nameIsValid(name);

        // Assert
        expect(result).toBe(false);
    });
});

describe('fullTrim', () => {
    it('should remove spaces from the string', () => {
        // Arrange
        const text = '  hello   world  ';

        // Act
        const result = fullTrim(text);

        // Assert
        expect(result).toBe('helloworld');
    });

    it('should return an empty string if input is empty', () => {
        // Arrange
        const text = '';

        // Act
        const result = fullTrim(text);

        // Assert
        expect(result).toBe('');
    });

    it('should return an empty string if input is null or undefined', () => {
        // Arrange
        const text = null;

        // Act
        const result = fullTrim(text);

        // Assert
        expect(result).toBe('');
    });
});

describe('getTotal', () => {
    it('should return total without discount', () => {
        // Arrange
        const items = [{ price: 10, quantity: 2 }];

        // Act
        const result = getTotal(items);

        // Assert
        expect(result).toBe(20);
    });

    it('should return total with 50% discount', () => {
        // Arrange
        const items = [{ price: 10, quantity: 2 }];
        const discount = 50;

        // Act
        const result = getTotal(items, discount);

        // Assert
        expect(result).toBe(10);
    });

    it('should return total with 100% discount', () => {
        // Arrange
        const items = [{ price: 10, quantity: 2 }];
        const discount = 100;

        // Act
        const result = getTotal(items, discount);

        // Assert
        expect(result).toBe(0);
    });

    it('should throw an error if discount is not a number', () => {
        // Arrange
        const items = [{ price: 10, quantity: 2 }];
        const discount = '50%';

        // Act
        const action = () => getTotal(items, discount);

        // Assert
        expect(action).toThrow('Скидка должна быть числом');
    });

    it('should throw an error if discount is less than 0', () => {
        // Arrange
        const items = [{ price: 10, quantity: 2 }];
        const discount = -5;

        // Act
        const action = () => getTotal(items, discount);

        // Assert
        expect(action).toThrow('Процент скидки должен быть от 0 до 99');
    });

    it('should throw an error if discount is 100 or more', () => {
        // Arrange
        const items = [{ price: 10, quantity: 2 }];
        const discount = 100;

        // Act
        const action = () => getTotal(items, discount);

        // Assert
        expect(action).toThrow('Процент скидки должен быть от 0 до 99');
    });
});
