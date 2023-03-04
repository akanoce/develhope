import express from "express";
import { getProducts } from "../controller/product.controller";
import { createUserHandler, loginHandler } from "../controller/user.controller";
import { requireAuth } from "../middleware/requireAuth";
import { validateRequest } from "../middleware/validateRequest";
import { createUserSchema } from "../schema/user.schema";

// /api
const baseRouter = express.Router()

baseRouter.get('/products', requireAuth(true), getProducts)



// /api/admin
const adminRouter = express.Router()




export default {
    baseRouter,
    adminRouter
}


