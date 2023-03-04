import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/auth";

export const requireAuth = (isAdminAuth?: boolean) => (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization

    if (!authHeader)
        return res.status(403).send('Token not found in authorization')


    if (authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7, authHeader.length);
        const decoded = verifyJwt(token)
        res.locals.user = decoded
        if (!decoded)
            return res.status(403).send('Token malformed or not valid')
        if (isAdminAuth && !decoded.isAdmin)
            return res.status(403).send('Unauthorized')
    } else
        return res.status(403).send('Token malformed or not valid')



    next()


}