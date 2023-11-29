const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests

        const user = {
            firstName: 'testa',
            lastName: 'taste',
            email: 'test@gmail.com',
            password: '5555',
            phone: '+82826736'
        }

        await request(app).post('/users').send(user);

        sequelize.sync();
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();