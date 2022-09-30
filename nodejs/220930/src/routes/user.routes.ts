import express from 'express'
import { createUser, getUsersHandler, getUserHandler } from '../controller/user.controller'
import { validateRequest } from '../middleware/validateRequest'
import { createUserSchema, getUserSchema } from '../schema/user.schema'

const router = express.Router()

router.get('/', getUsersHandler)
router.get('/:id', validateRequest(getUserSchema), getUserHandler)
router.post('/', validateRequest(createUserSchema), createUser)
router.put('/:id')
router.delete('/:id')

export default router


