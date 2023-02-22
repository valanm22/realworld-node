import { Request, Response, NextFunction } from "express";
import { Schema, object, string } from "yup";
import { BadRequestError } from "../global/errors";

export function validate(schema: Schema) {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (!await schema.isValid(req.body)) {
            return next(new BadRequestError());
        }

        next();
    }
}

export const schemas: Record<string, Schema> = {
    register: object({
        user: object({
            username: string().required(),
            email: string().email().required(),
            password: string().required()
        })
    }),

    login: object({
        user: object({
            email: string().email().required(),
            password: string().required()
        })
    }),
}
