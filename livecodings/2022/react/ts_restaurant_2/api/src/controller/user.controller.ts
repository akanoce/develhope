import { Request, Response } from "express"
import { CreateUserInput } from "../schema/user.schema"
import { createHash, createJwt, verifyHash } from "../utils/auth"
import prisma from '../utils/db'


export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {

    const { email, password } = req.body
    const hashedPassword = await createHash(password)
    try {

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                isAdmin: false
            }
        })

        return res.send(user)

    }

    catch (e: any) {
        console.error(e)
        return res.status(500).send(e)
    }
}

export async function loginHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {

    const { email, password } = req.body
    try {

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user)
            return res.status(400).send('Email or password not valid')

        const passwordMatch = await verifyHash(user.password, password)

        if (!passwordMatch)
            return res.status(400).send('Email or password not valid')

        const accessToken = createJwt({ email: user.email, isAdmin: user.isAdmin })

        return res.send({ accessToken })
    }

    catch (e: any) {
        console.error(e)
        return res.status(500).send(e)
    }

}