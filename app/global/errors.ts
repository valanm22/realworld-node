export abstract class MiddlewareError extends Error {
    protected abstract status: number;

    public abstract name: string;

    public abstract message: string;

    public getStatus(): number {
        return this.status;
    }
}

export class NotFoundError extends MiddlewareError {
    protected status: number = 404;

    public name: string = "Not Found Error";

    public message: string = "The requested resource was not found";
}

export class ValidationError extends MiddlewareError {
    protected status: number = 422;

    public name: string = "Validation Error";

    public message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }
}

export class UnauthorizedError extends MiddlewareError {
    protected status: number = 401;

    public name: string = "Unauthorized Error";

    public message: string = "Authentication required to access this resource";
}

export class ForbiddenError extends MiddlewareError {
    protected status: number = 403;

    public name: string = "Forbidden Error";

    public message: string = "You do not have permission to access this resource";
}

export class InternalServerError extends MiddlewareError {
    protected status: number = 500;

    public name: string = "Internal Server Error";

    public message: string = "An internal server error occurred";
}

export class BadRequestError extends MiddlewareError {
    protected status: number = 400;

    public name: string = "Bad Request Error";

    public message: string = "The request was malformed or invalid";
}
