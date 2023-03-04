import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";


export function validateRequest(schema: AnyZodObject) {

    return (req: Request, res: Response, next: NextFunction) => {

        try {
            const parsedSchema = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            })
            req.params = parsedSchema.params
            req.query = parsedSchema.query
            req.body = parsedSchema.body
            next()
        }
        catch (e: any) {
            return res.status(400).send(e.errors)
        }
    }
}