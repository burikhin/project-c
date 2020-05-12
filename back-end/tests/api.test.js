const request = require('supertest');
const app = require('../app');

describe('POST for count api route', () => {
    it('should have count property', async () => {
        const res = await request(app)
            .post('/count')
            .send({});

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('count');
    });
});

describe('GET for count api route', () => {
    it('should have count property', async () => {
        const res = await request(app)
            .get('/count')
            .send({});

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('count');
    });
});

describe('GET for error api route', () => {
    it('should have count property', async () => {
        const res = await request(app)
            .get('/error')
            .send({});

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('errors');
    });
});

describe('Testing count api route for error', () => {
    it('should have error if called more than 10 times', async () => {
        let res = {};
        for (let i = 0; i <= 10; i++) {
            res = await request(app)
                .post('/count')
                .send({});
        }

        expect(res.statusCode).toEqual(500);
        expect(res.body.data).toHaveProperty('error');
    });
});
