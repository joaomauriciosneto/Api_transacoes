import { NextFunction, Request, Response } from "express";
import { UserController } from "../controller/user.controller";

export const cpfExistsMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const {cpf} = request.body;

    const userList = new UserController().getByCpf(cpf);

    if(userList) {
        return response.status(400).send({
            ok: false,
            message: 'Cpf already exists!'
        })
    }
    next();
}