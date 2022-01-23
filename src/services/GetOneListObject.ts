import { getRepository } from "typeorm"
import { Lista } from "../database/entities/lista"

class GetOneListObject{
    async getOne(id: number){
        const repo = getRepository(Lista)

        const ListObject = await repo.findOne(id)

        if(!ListObject){
            return new Error('Item da lista não encontrado')
        }

        ListObject.preco = parseFloat(ListObject.preco.toString())
        
        return ListObject
    }
}

export default new GetOneListObject()