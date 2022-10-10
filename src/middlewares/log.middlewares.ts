import { NextFunction, Request, Response } from "express";

export const logMiddleware = (request: Request, reponse: Response, next: NextFunction) => {
    console.log('Passou no middleware!');
    next();
}
