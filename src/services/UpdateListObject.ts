import { getRepository } from "typeorm";
import { Lista } from "../database/entities/lista";

export type UpdateList = {
    id: number
    preco: number
}

class UpdateListObject{
    async Update({id, preco} : UpdateList) : Promise<any>{
        const repo = getRepository(Lista)

        const ListObject = await repo.findOne(id)

        if(!ListObject){
            return new Error('Item da lista não encontrado')
        }

        ListObject.preco = preco

        const result = await repo.save(ListObject)

        return result
    }
}

export default new UpdateListObject()