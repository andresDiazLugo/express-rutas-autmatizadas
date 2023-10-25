import { Router } from 'express'
import { getTasks,getTask,createTask,deleteTask } from '../controllers/task.controller'
import { authRquired } from '../middlewares/validationToken.middleware'
const router = Router()

router.get("/getTasks",authRquired,getTasks)
router.get("/getTask/:id",authRquired,getTask)
router.post("/createTask",authRquired,createTask)
router.delete("/deleteTask/:id",authRquired,deleteTask)

export { router }