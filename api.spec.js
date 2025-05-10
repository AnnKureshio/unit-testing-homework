const axios = require('axios');

const BASE_URL = 'https://bookstore.demoqa.com';
const USER_ENDPOINT = '/Account/v1/User';
const TOKEN_ENDPOINT = '/Account/v1/GenerateToken';

describe('Тесты API для Bookstore', () => {
    test('Должен вернуть ошибку при попытке создать пользователя с уже существующим именем', async () => {
        const existingUser = {
            userName: 'existingUser',
            password: 'Test@1234'
        };
        const response = await axios.post(`${BASE_URL}${USER_ENDPOINT}`, existingUser).catch(error => error.response);
        expect(response.status).toBe(400);
        expect(response.data.message).toBe('User exists!');
    });

    test('Должен вернуть ошибку при попытке создать пользователя с некорректным паролем', async () => {
        const invalidPasswordUser = {
            userName: 'newUser',
            password: '123'  // Пароль слишком простой
        };
        const response = await axios.post(`${BASE_URL}${USER_ENDPOINT}`, invalidPasswordUser).catch(error => error.response);
        expect(response.status).toBe(400);
        expect(response.data.message).toBe('Password complexity is not met!');
    });

    test('Должен успешно создать нового пользователя', async () => {
        const newUser = {
            userName: 'newUser',
            password: 'Test@1234'
        };
        const response = await axios.post(`${BASE_URL}${USER_ENDPOINT}`, newUser);
        expect(response.status).toBe(201);
        expect(response.data.message).toBe('User created!');
    });

    test('Должен вернуть ошибку при попытке сгенерировать токен с некорректными учетными данными', async () => {
        const invalidCredentials = {
            userName: 'wrongUser',
            password: 'wrongPassword'
        };
        const response = await axios.post(`${BASE_URL}${TOKEN_ENDPOINT}`, invalidCredentials).catch(error => error.response);
        expect(response.status).toBe(400);
        expect(response.data.message).toBe('User credentials are incorrect');
    });

    test('Должен успешно сгенерировать токен', async () => {
        const validCredentials = {
            userName: 'newUser',
            password: 'Test@1234'
        };
        const response = await axios.post(`${BASE_URL}${TOKEN_ENDPOINT}`, validCredentials);
        expect(response.status).toBe(200);
        expect(response.data.token).toBeDefined();
    });
});
