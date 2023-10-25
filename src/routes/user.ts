import { Router } from 'express'
import { register, sigIn, verifyToken } from '../controllers/user.controller'
import { validateSchema } from '../middlewares/validator.middleware'
import { registerSchema, loginSchema } from '../schemas/auth.schema'
const router = Router()


router.post('/register', validateSchema(registerSchema),register)
router.post('/sigin', validateSchema(loginSchema), sigIn)
router.get('/', (req,res)=>{
    res.cookie('probandoo','dddd')
    res.send('ssssss')
})
router.get('/verify',verifyToken)

export{ router}