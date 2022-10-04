import { Request, Response } from "express";
import prisma from '../utils/db'


export async function getProducts(req: Request, res: Response) {

    try {
        console.log(res.locals.user)
        const products = await prisma.product.findMany()
        return res.send(products)
    }
    catch (e: any) {

        return res.status(500).send()

    }
}