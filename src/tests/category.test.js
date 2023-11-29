const request = require('supertest');
const app = require('../app');

let id;
let token;

beforeAll(async() => {
    const user = {
        email: 'test@gmail.com',
        password: '5555'
    }
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
});

test('Get /categories debe retornar todas las catogorias', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('Post /categories debe crear una categoria en la tienda', async () => {
    const category = {
        name: 'Ferreterias'
    }
    const res = await request(app).post('/categories').send(category).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    // console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(category.name);  
});

test('Update /categories/:id debe actualizar una categoria', async () => {
    const category = {
      name: 'Ferreterias Update'
    }
    const res = await request(app).put(`/categories/${id}`).send(category).set('Authorization', `Bearer ${token}`);
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(category.name);
});

test('Delete /categories/:id debe eliminar una categoria', async () => {
    const res = await request(app).delete(`/categories/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});