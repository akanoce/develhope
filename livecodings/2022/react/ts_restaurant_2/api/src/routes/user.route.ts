import express from "express";
import { createUserHandler, loginHandler } from "../controller/user.controller";
import { validateRequest } from "../middleware/validateRequest";
import { createUserSchema } from "../schema/user.schema";

// /api
const baseRouter = express.Router()

baseRouter.post('/users/user', validateRequest(createUserSchema), createUserHandler)
baseRouter.post('/users/user/login', validateRequest(createUserSchema), loginHandler)

baseRouter.put('/users/user')


// /api/admin
const adminRouter = express.Router()

adminRouter.get('/users')
adminRouter.put('/users/user')



export default {
    baseRouter,
    adminRouter
}


