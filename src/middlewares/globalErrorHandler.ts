import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import logger from "../config/logger";
import { v4 as uuidv4 } from "uuid";

export const globalErrorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) => {
    const errorId = uuidv4();
    const statusCode = err.statusCode || err.status || 500;

    const isProduction = process.env.NODE_ENV === "production";
    const message = isProduction ? "Internal server error" : err.message;

    logger.error(err.message, {
        id: errorId,
        statusCode,
        error: err.stack,
        path: req.path,
        method: req.method,
    });

    res.status(statusCode).json({
        errors: [
            {
                ref: errorId,
                type: err.name,
                msg: message,
                path: req.path,
                method: req.method,
                location: "server",
                stack: isProduction ? null : err.stack,
            },
        ],
    });
};
