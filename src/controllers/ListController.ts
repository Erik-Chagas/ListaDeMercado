import CreateListObject from '../services/CreateListObject'
import { Response, Request } from 'express'
import UpdateListObject from '../services/UpdateListObject'
import GetAllListObjects from '../services/GetAllListObjects'
import GetOneListObject from '../services/GetOneListObject'
import DeleteListObject from '../services/DeleteListObject'

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

    async handleGetAllListObjects(req: Request, res: Response){
        const result = await GetAllListObjects.getAll()

        return res.json(result)
    }

    async handleGetOneListObject(req: Request, res: Response){
        const { id } = req.params

        if(id === undefined){
            return res.status(400).json({
                error: true,
                message: 'id é necessário para realizar a busca'
            })
        }

        const result = await GetOneListObject.getOne(parseInt(id))

        if(result instanceof Error){
            return res.status(400).json({
                error: true,
                message: result.message
            })
        }

        return res.json(result)
    }

    async handleDeleteOneListObject(req: Request, res: Response){
        const { id } = req.params

        if(id === undefined){
            return res.status(400).json({
                error: true,
                message: 'id é necessário para deletar um item'
            })
        }

        const result = await DeleteListObject.delete(parseInt(id))

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