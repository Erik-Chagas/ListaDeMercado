//TESTES DE INTEGRAÇÃO
import { ListObject } from '../services/CreateListObject';
import { app } from "../app";
import request from 'supertest'
import { createConnection, getConnection } from 'typeorm';

describe('Testing API calls', () => {
    const exampleListObject : ListObject = {
        item: 'testAPI',
        preco: 9
    }

    beforeAll(async () => {
        await createConnection() //conectando ao banco de dados
    })

    afterAll(async () => {
        await getConnection().close() //desconectando do banco de dados
    })
    
    //CREATE
    it('Should be able to create a new user', async () => {
        const { item, preco } = exampleListObject

        const response = await request(app).post('/create').send({item, preco})

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(Object.keys(response.body).sort()).toEqual(['id', 'item', 'preco'].sort())
    })
})