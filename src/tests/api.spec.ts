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

        const response = await request(app).post('/itens').send({item, preco})
        exampleListObject = response.body

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(Object.keys(response.body).sort()).toEqual(['id', 'item', 'preco'].sort())
    })

    //UPDATE
    it("Should update a list object", async () => {
        const { id } = exampleListObject
        const preco = Math.floor(Math.random() * 100) + 1
        
        const response = await request(app).put('/itens').send({id, preco})
        exampleListObject = response.body

        expect(response.status).toBe(200)
        expect(response.body).toMatchObject(exampleListObject)
        expect(response.body.preco).toEqual(preco)
    })

    it("Should return an error for not finding the item of the specified id", async () => {
        const id = Math.floor(Math.random() * 10000) + 1000
        const preco = Math.floor(Math.random() * 100) + 1

        const response = await request(app).put('/itens').send({id, preco})

        expect(response.status).toBe(400)
        expect(response.body.error).toEqual(true)
        expect(response.body.message).toEqual('Item da lista não encontrado')
    })

    //GET ALL
    it("Should return all list objects", async () => {
        const response = await request(app).get('/')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })

    //GET ONE
    it("Should return the list object of the specified id", async () => {
        const { id } = exampleListObject

        const response = await request(app).get(`/itens/${id}`)

        expect(response.status).toBe(200)
        expect(response.body).toMatchObject(exampleListObject)
    })

    it("Should return an error for not finding the item of specified id for get", async () => {
        const id = Math.floor(Math.random() * 10000) + 1000

        const response = await request(app).get(`/itens/${id}`)

        expect(response.status).toBe(400)
        expect(response.body.message).toEqual('Item da lista não encontrado')
    })

    //DELETE
    it("Should delete a list object of the specified id", async () => {
        const { id } = exampleListObject

        const response = await request(app).delete(`/itens/${id}`)
        const checkDelete = await request(app).get(`/itens/${id}`)

        expect(response.status).toBe(200)

        expect(checkDelete.status).toBe(400)
        expect(checkDelete.body.message).toEqual('Item da lista não encontrado')
    })

    it("Should return an error for not finding the item of specified id for delete", async () => {
        const id = Math.floor(Math.random() * 10000) + 1000

        const response = await request(app).delete(`/itens/${id}`)

        expect(response.status).toBe(400)
        expect(response.body.message).toEqual('Item da lista não encontrado')
    })
})