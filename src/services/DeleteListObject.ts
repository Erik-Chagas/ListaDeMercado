import { getRepository } from "typeorm"
import { Lista } from "../database/entities/lista"

class DeleteListObject{
    async delete(id : number){
        const repo = getRepository(Lista)

        const ListObject = await repo.findOne(id)

        if(!ListObject){
            return new Error('Item da lista não encontrado')
        }

        const result = await repo.delete(id)
        
        return 'Item deletado com sucesso'
    }
}

export default new DeleteListObject()