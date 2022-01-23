import { Router } from "express"
import ListController from "./controllers/ListController"

const routes = Router()

routes.post('/create', ListController.handleCreateListObject)
routes.put('/update', ListController.handleUpdateListObject)

export { routes }