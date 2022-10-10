import { NextFunction, Request, Response } from "express";

export const getLogMiddleware = (request: Request, reponse: Response, next: NextFunction) => {
    console.log('LISTANDO....!');
    next();
}