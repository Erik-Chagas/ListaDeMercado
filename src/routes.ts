import { Router } from "express"
import ListController from "./controllers/ListController"

const routes = Router()

routes.post('/create', ListController.handleCreateListObject)

export { routes }