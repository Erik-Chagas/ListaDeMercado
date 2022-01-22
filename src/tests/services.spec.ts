//TESTES UNITÁRIOS
import { createConnection, getConnection } from "typeorm";
import CreateListObject, { ListObject } from "../services/CreateListObject";

describe("Services layer", () => {
    const exampleListObject : ListObject = {
        item: 'test',
        preco: 7.10
    }

    beforeAll(async () => {
        await createConnection() //conectando ao banco de dados
    })

    afterAll(async () => {
        await getConnection().close() //desconectando do banco de dados
    })

    //CREATE
    it("Should create a new user in the database", async () => {
        const result = await CreateListObject.create(exampleListObject)

        expect(result).toHaveProperty('id')
    })
})