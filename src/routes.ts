import { Router } from "express"
import ListController from "./controllers/ListController"

const routes = Router()

routes.post('/create', ListController.handleCreateListObject)
routes.put('/update', ListController.handleUpdateListObject)
routes.get('/', ListController.handleGetAllListObjects)

export { routes }