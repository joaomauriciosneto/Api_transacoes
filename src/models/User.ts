import { v4 as idUser } from "uuid";
import { Transactions } from "./Transactions";

export class User {
    private _idUser: string;
    constructor (
        private _name: string,
        private _cpf: number,
        private _email: string,
        private _age: number,
        private _transactions?: Transactions[]
    ) {
        this._idUser = idUser();
        this._transactions =  this._transactions ?? [];
    }

    public get name() {
        return this._name;
    }

    public set name(name: string) {
        this._name = name
    }

    public get cpf() {
        return this._cpf;
    }

    public set cpf(cpf: number) {
        this._cpf = cpf
    }

    public get email() {
        return this._email;
    }

    public set email(email: string) {
        this._email = email
    }

    public get age() {
        return this._age;
    }

    public set age(age: number) {
        this._age = age;
    }

    public get id() {
        return this._idUser;
    }

    public get transactions() {
        return this._transactions;
    }

    public getUsers() {
        return {
            name: this._name,
            cpf: this._cpf,
            email: this._email,
            age: this._age,
            transactions: this._transactions,
            id: this._idUser
        }
    }

}

