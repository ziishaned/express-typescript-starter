import {Request, Response} from "express";

/**
 * Validate user credentials and send JWT token.
 * @param {Request} req
 * @param {Response} res
 */
export const authenticate = (req: Request, res: Response) => {
    return res.json("Login user");
};

/**
 * Register a new user
 * @param {Request} req
 * @param {Response} res
 */
export const register = (req: Request, res: Response) => {
    return res.json("Register a new user");
};
