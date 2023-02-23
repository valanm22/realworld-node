import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";
import db from "../global/db";
import env from "../global/env";
import { UnauthorizedError } from "../global/errors";

const getTokenFromHeader = (req: Request): string | Error => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return new UnauthorizedError("No authorization token was found");
    }

    const validFormat = /Token ([\w-]+\.[\w-]+\.[\w-]+)/.exec(authHeader);

    if (!validFormat) {
        return new UnauthorizedError("Invalid token format");
    }

    return validFormat[1];
}

function extractPayload(token: string): { id: number } | Error {
    const isValidPayload = (payload: any): payload is { id: number } => {
        return typeof payload === "object" && 
            typeof payload !== null &&
            typeof payload.id === "number";
    };

    const payload = jwt.verify(token, env.JWT_SECRET);

    if (!isValidPayload(payload)) {
        return new UnauthorizedError("Token payload is invalid");
    }

    return payload; 
}

export async function authRequired(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = getTokenFromHeader(req);
    if (token instanceof Error) {
        return next(token);
    }

    const payload = extractPayload(token);
    if (payload instanceof Error) {
        return next(payload);
    }

    const userRepository = db.getRepository(User);
    const user = await userRepository.findOneBy({ id: payload.id });
    if (!user) {
        return next(new UnauthorizedError("User not found"));
    }

    user.password = "";
    res.locals.user = user;

    next();
};
