const request = require('supertest');
const app = require('../app');

let id;
let token;

test('Post /users debe crear un usuario', async () => {
    const body = {
        firstName: 'Daniels',
        lastName: 'Rosarios',
        email: 'daniels@gmail.com',
        password: '5555',
        phone: '+50-648-121332'
    };
    const res = await request(app).post('/users').send(body);
    id = res.body.id;
    // console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
});

test('Login /users/login', async () => {
    const body = {
        email: 'daniels@gmail.com',
        password: '5555'
    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('Get /users', async () => {
    const res = await request(app).get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('Put /users/:id', async () => {
    const body = {
        firstName: 'Daniel Update'
    };
    const res = await request(app).put(`/users/${id}`).send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('Post /users/login debe retornar credenciales incrporretas', async () => {
    const body = {
        email: 'danielsINCORRECTO@gmail.com',
        password: '5555INCORRECTO'
    }
    const res = await request(app).post('/users/login').send(body);
    expect(res.status).toBe(401);
});

test('Delete /users/:id', async () => {
    const res = await request(app).delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});