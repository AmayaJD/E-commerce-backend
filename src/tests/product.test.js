const request = require('supertest');
const app = require('../app');
require('../models')

let id;


test('Get /products debe retornar todos los productos de la base datos', async () => {
    const res = await request(app).get('/products');
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('Post /products debe crear un producto', async () => {
    const product = {
        title: 'Fryer',
        description: 'Philips Airfryer Hot Air Fryer Cook Without Oil.',
        brand: 'Ingalex',
        price: 85,
        categoryId: 4
    }
    const res = await request(app).post('/products').send(product);
    id = res.body.id;
    // console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(product.title);
});

test('Put /products/:id debe actualizar un producto de la base de datos', async () => {
    const product = {
        title: 'Fryer Update',
    };
    const res = await request(app).put(`/products/${id}`).send(product);
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(product.title);
});

test('Delete /products/:id debe eliminar un producto de la base datos.', async () => {
    const res = await request(app).delete(`/products/${id}`)
    expect(res.status).toBe(204);
});