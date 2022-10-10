import { NextFunction, Request, Response } from "express";
import { userArray } from "../data/userList";

export const userValidator = (request: Request, response: Response, next: NextFunction) => {
    const {id} = request.params;

    const user = userArray.some(user => user.id == id)

    if(!user) {
        return response.status(400).send({
            ok: false,
            message: 'User not found!'
        })
    }
    next();
}