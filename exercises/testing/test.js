const request = require('supertest');
const users = require('./users');
const app = require('./api');

describe('controller', () => {
    describe('/user', () => {
        describe('GET', () => {
            describe('Sucessful request', () => {

                test('retrieve 200', () => {
                    request(app).get('/user/1').then(response => {
                        expect(response.statusCode).toBe(200);
                    });
                });

                test('retrieve requested user', () => {
                    request(app).get('/user/1').then(response => {
                        expect(response.body.id).toBe(1);
                    });
                });
            });

            describe('Wrong request', () => {

                test('retrieve 422', () => {
                    request(app).get('/user/a').then(response => {
                        expect(response.statusCode).toBe(422);
                    });
                });

                test('retrieve empty response', () => {
                    request(app).get('/user/a').then(response => {
                        expect(response.body).toEqual({});
                    });
                });
            });
        });

        describe('DELETE', () => {
            describe('Sucessful request', () => {

                test('retrieve 200', () => {
                    request(app).delete('/user/1').then(response => {
                        expect(response.statusCode).toBe(201);
                    });
                });

                test('retrieve requested user', () => {
                    request(app).delete('/user/1').then(response => {
                        expect(response.body.id).toEqual(1);
                    });
                });
            });

            describe('Wrong request', () => {

                test('retrieve 422', () => {
                    request(app).delete('/user/a').then(response => {
                        expect(response.statusCode).toBe(422);
                    });
                });

                test('retrieve empty response', () => {
                    request(app).delete('/user/a').then(response => {
                        expect(response.body).toEqual({});
                    });
                });
            });
        });
    });
});

describe('model', () => {
    describe('users', () => {
        describe('methods', () => {

            describe('findUser', () => {
                test('find available user by id', () => {
                    users.findUser(1).then(result => {
                        expect(result).not.toBeNull();
                    });
                });
            });

            describe('deleteUser', () => {
                test('remove an available user by id', () => {
                    users.deleteUser(1).then(result => {
                        expect(result.id).toBe(1);
                    });
                });
            });
        });
    });
});
