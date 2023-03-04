import { Request, Response } from "express";
import { CreateUserType, GetUserType } from "../schema/user.schema";
import prisma from '../utils/prisma'

export async function getUsersHandler(req: Request, res: Response) {

    const users = await prisma.user.findMany()
    return res.send(users)

}

export async function createUser(req: Request<{}, {}, CreateUserType['body']>, res: Response) {
    try {
        console.log(req.body)
        const user = await prisma.user.create({ data: req.body })
        return res.send(user)
    } catch (e: any) {
        console.error(e)
        if (e.code === 'P2002')
            return res.status(409).send('Email already exist!')

        return res.status(500).send(e)
    }

}

export async function getUserHandler(req: Request<GetUserType, {}, {}>, res: Response) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id
            }
        })
        if (!user)
            return res.status(404).send()
        return res.send(user)
    } catch (e: any) {
        console.error(e)
        return res.status(500).send(e)
    }

}