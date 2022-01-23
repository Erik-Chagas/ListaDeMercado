import CreateListObject from '../services/CreateListObject'
import { Response, Request } from 'express'
import UpdateListObject from '../services/UpdateListObject'

class ListController{
    async handleCreateListObject(req: Request, res: Response){
        const { item, preco } = req.body

        if(item === undefined || preco === undefined){
            return res.status(400).json({
                error: true,
                message: 'Item e preço são necessários'
            })
        }

        const result = await CreateListObject.create({item, preco})

        if(result instanceof Error){
            return res.status(400).json({
                error: true,
                message: result.message
            })
        }
        
        return res.json(result)
    }

    async handleUpdateListObject(req: Request, res: Response){
        const { id, preco } = req.body

        if(id === undefined || preco === undefined){
            return res.status(400).json({
                error: true,
                message: 'id e preço são necessários'
            })
        }

        const result = await UpdateListObject.Update({id, preco})

        if(result instanceof Error){
            return res.status(400).json({
                error: true,
                message: result.message
            })
        }
        
        return res.json(result)
    }
}

export default new ListController()