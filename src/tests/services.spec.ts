//TESTES UNITÁRIOS
import { createConnection, getConnection } from "typeorm";
import CreateListObject, { ListObject } from "../services/CreateListObject";
import GetAllListObjects from "../services/GetAllListObjects";
import GetOneListObject from "../services/GetOneListObject";
import UpdateListObject from "../services/UpdateListObject";

describe("Services layer", () => {
    let exampleListObject : ListObject = {
        item: `UnitTest-${new Date().toISOString()}`,
        preco: Math.floor(Math.random() * 100) + 1
    }

    beforeAll(async () => {
        await createConnection() //conectando ao banco de dados
    })

    afterAll(async () => {
        await getConnection().close() //desconectando do banco de dados
    })

    //CREATE
    it("Should create a new list object in the database", async () => {
        const result = await CreateListObject.create(exampleListObject)

        exampleListObject = result

        expect(result).toHaveProperty('id')
    })

    //UPDATE
    it("Should update a list object in the database", async () => {
        const { id } = exampleListObject
        const preco = Math.floor(Math.random() * 100) + 1

        const result : ListObject = await UpdateListObject.Update({ id, preco })
        exampleListObject = result

        expect(result.preco).toEqual(preco)
    })

    it("Should return an error for not finding the item of the specified id", async () => {
        const id = Math.floor(Math.random() * 10000) + 1000
        const preco = Math.floor(Math.random() * 100) + 1

        const result = await UpdateListObject.Update({ id, preco })

        expect(result).toEqual(new Error('Item da lista não encontrado'))
    })

    //GET ALL
    it("Should return all list objects", async () => {
        const result = await GetAllListObjects.getAll()

        expect(result).toBeInstanceOf(Array)
    })

    //GET ONE
    it("Should return the list object of the specified id", async () => {
        const { id } = exampleListObject
        const result = await GetOneListObject.getOne(id)
        
        expect(result).toMatchObject(exampleListObject)
    })

    it("Should return an error for not finding the item of specified id for get", async () => {
        const id = Math.floor(Math.random() * 10000) + 1000
        const result = await GetOneListObject.getOne(id)

        expect(result).toEqual(new Error('Item da lista não encontrado'))
    })
})