//TESTES DE INTEGRAÇÃO
import { ListObject } from '../services/CreateListObject';
import { app } from "../app";
import request from 'supertest'
import { createConnection, getConnection } from 'typeorm';

describe('Testing API calls', () => {
    let exampleListObject : ListObject = {
        item: `APITest-${new Date().toISOString()}`,
        preco: Math.floor(Math.random() * 100) + 1
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
        exampleListObject = response.body

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(Object.keys(response.body).sort()).toEqual(['id', 'item', 'preco'].sort())
    })

    //UPDATE
    it("Should update a list object", async () => {
        const { id } = exampleListObject
        const preco = Math.floor(Math.random() * 100) + 1
        
        const response = await request(app).put('/update').send({id, preco})

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body.preco).toEqual(preco)
    })

    it("Should return an error for not finding the item of the specified id", async () => {
        const id = Math.floor(Math.random() * 10000) + 1000
        const preco = Math.floor(Math.random() * 100) + 1

        const response = await request(app).put('/update').send({id, preco})

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body.error).toEqual(true)
        expect(response.body.message).toEqual('Item da lista não encontrado')
    })
})