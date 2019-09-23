import {isCelebrate} from "celebrate";
import {NextFunction, Request, Response} from "express";

import HttpException from "../exceptions/HttpException";

/**
 * Make first letter of string uppercase.
 * @param {string} string
 * @returns {string}
 */
const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Transform API errors.
 * @param {any} joiError
 * @return {object}
 */
const transformErrors = (joiError: any) => {
    const errors: any = {};
    const errorFields: any[] = [];

    joiError.joi.details.forEach((joiErrorItem: any) => {
        const field = joiErrorItem.path.join(".");
        let errorMsg = joiErrorItem.context.label;

        errorMsg = field.includes(".") || errorMsg === field ? joiErrorItem.message : errorMsg;

        // Format error message
        errorMsg = errorMsg.replace(/^"([a-zA-Z0-9]+)"/gm, "$1");

        // To avoid duplicate errors
        if (!errorFields.includes(field)) {
            errors[field] = `${capitalizeFirstLetter(errorMsg)}.`;
            errorFields.push(field);
        }
    });
    return errors;
};

export const transformApiErrors = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    if (!isCelebrate(err)) next();

    return res.status(400).json(transformErrors(err));
};

/**
 * Error handler. Send stacktrace only during development
 *
 * @param {HttpException} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const response = {
        code: err.status,
        stack: err.stack,
        errors: err.errors,
        message: err.message || err.status,
    };

    if (process.env.NODE_ENV !== "development") {
        delete response.stack;
    }

    return res.status(err.status).json(response);
};

/**
 * Route not found middleware.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({message: `Route ${req.url} not found.`});
};
