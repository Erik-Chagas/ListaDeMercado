import { getRepository } from 'typeorm'
import { Lista } from '../database/entities/lista'

export type ListObject = {
    id?: number
    item: string;
    preco: number;
}

class CreateListObject{
    async create({item, preco} : ListObject) : Promise<any>{
        const repo = getRepository(Lista)

        const ListObj = repo.create({
            item,
            preco
        })

        try{
            const result = await repo.save(ListObj)
            return result
        }catch(erro){
            return new Error(`${erro.message}`)
        }
    }
}

export default new CreateListObject()