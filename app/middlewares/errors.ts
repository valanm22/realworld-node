import { ErrorRequestHandler } from "express";
import { MiddlewareError } from "../global/errors";

interface ErrorResponseBody {
    error: string;
    message: string;
}

const errors: ErrorRequestHandler = (err: MiddlewareError, req, res, next) => {
    res.status(err.getStatus());
    res.send({
        error: err.name,
        message: err.message
    } as ErrorResponseBody);
};

export default errors;
