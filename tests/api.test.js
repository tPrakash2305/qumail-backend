const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
    test('GET / should return welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'QuMail API is running');
    });

    test('POST /api/keys should create new key pair', async () => {
        const res = await request(app).post('/api/keys');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('keyId');
        expect(res.body).toHaveProperty('publicKey');
    });

    test('GET /api/keys/:id should return public key', async () => {
        const createRes = await request(app).post('/api/keys');
        const keyId = createRes.body.keyId;
        
        const getRes = await request(app).get(`/api/keys/${keyId}`);
        expect(getRes.statusCode).toBe(200);
        expect(getRes.body).toHaveProperty('key');
    });
});
