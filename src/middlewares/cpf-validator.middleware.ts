import { NextFunction, Request, Response } from "express";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export const cpfValidateMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const {cpf} = request.body;

    if(!cpf) {
        return response.status(400).send({
            ok: false,
            message: 'Cpf not provided! (middleware)'
        })
    }

    let cpfFormat = cpf.toString().padStart(11, "0");

    console.log(cpfValidator.format(cpf.toString()))

    if(cpfValidator.isValid(cpfFormat)) {
        return next();
    }

    return response.status(400).send({
        ok: false,
        message: 'CPF is invalid!'
    })
}