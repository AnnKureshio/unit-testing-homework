// Определение функции nameIsValid
function nameIsValid(name) {
    return typeof name === 'string' && name.length >= 2 && /^[a-zA-Z]+$/.test(name);
}

// Определение функции fullTrim
function fullTrim(str) {
    if (str === null || str === undefined) return '';
    return str.replace(/\s+/g, '');
}

// Определение функции getTotal
function getTotal(price, discount) {
    if (typeof discount !== 'number') {
        throw new Error('Скидка должна быть числом');
    }
    if (discount < 0 || discount >= 100) {
        throw new Error('Процент скидки должен быть от 0 до 99');
    }
    return price - (price * discount) / 100;
}

// Экспорт функций
module.exports = {
    nameIsValid,
    fullTrim,
    getTotal
};
