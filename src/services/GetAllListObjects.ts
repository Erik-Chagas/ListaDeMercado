import { getRepository } from "typeorm"
import { Lista } from "../database/entities/lista"

class GetAllListObjects{
    async getAll(){
        const repo = getRepository(Lista)

        const ListObjects = await repo.find()

        return ListObjects
    }
}

export default new GetAllListObjects()