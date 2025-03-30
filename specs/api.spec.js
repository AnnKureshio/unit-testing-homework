const axios = require('axios');

const BASE_URL = 'https://bookstore.demoqa.com';
const USER_ENDPOINT = '/Account/v1/User';
const TOKEN_ENDPOINT = '/Account/v1/GenerateToken';

const existingUser = {
    userName: 'testuser',
    password: 'Password123!'
};

describe('Bookstore API - User and Token Tests', () => {
    test('Should return error when creating a user with an existing username', async () => {
        await axios.post(`${BASE_URL}${USER_ENDPOINT}`, existingUser).catch(() => {});
        const response = await axios.post(`${BASE_URL}${USER_ENDPOINT}`, existingUser).catch(error => error.response);
        expect(response.status).toBe(406);
        expect(response.data.code).toBe('1204');
        expect(response.data.message).toBe('User exists!');
    });

    test('Should return error when creating a user with an invalid password', async () => {
        const invalidUser = {
            userName: 'newuser',
            password: 'short'
        };
        const response = await axios.post(`${BASE_URL}${USER_ENDPOINT}`, invalidUser).catch(error => error.response);
        expect(response.status).toBe(400);
        expect(response.data.message).toContain('Passwords must have');
    });

    test('Should successfully create a new user', async () => {
        const newUser = {
            userName: `user_${Date.now()}`,
            password: 'Password123!'
        };
        const response = await axios.post(`${BASE_URL}${USER_ENDPOINT}`, newUser);
        expect(response.status).toBe(201);
        expect(response.data.username).toBe(newUser.userName);
    });

    test('Should return error when generating a token with incorrect credentials', async () => {
        const invalidCredentials = {
            userName: 'nonexistentuser',
            password: 'WrongPassword!'
        };
        const response = await axios.post(`${BASE_URL}${TOKEN_ENDPOINT}`, invalidCredentials).catch(error => error.response);
        expect(response.status).toBe(200);
        expect(response.data.token).toBeNull();  // Изменили на toBeNull()
        expect(response.data.status).toBe('Failed');
    });

    test('Should successfully generate a token', async () => {
        const response = await axios.post(`${BASE_URL}${TOKEN_ENDPOINT}`, existingUser);
        expect(response.status).toBe(200);
        expect(response.data.token).toBeDefined();
        expect(response.data.status).toBe('Success');
    });
});
