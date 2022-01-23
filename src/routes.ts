import { Router } from "express"
import ListController from "./controllers/ListController"

const routes = Router()

routes.post('/itens', ListController.handleCreateListObject)
routes.put('/itens', ListController.handleUpdateListObject)
routes.get('/', ListController.handleGetAllListObjects)
routes.get('/itens/:id', ListController.handleGetOneListObject)
routes.delete('/itens/:id', ListController.handleDeleteOneListObject)

export { routes }