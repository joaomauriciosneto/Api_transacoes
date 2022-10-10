import { v4 as idTransactions } from "uuid";

export class Transactions {
    private _id: string;
    constructor(
        private _title: string,
        private _value: number,
        private _type: string
    ) {
        this._id = idTransactions();
    }

    public get title() {
        return this._title;
    }

    public set title(title: string) {
        this._title = title
    }

    public get value() {
        return this._value;
    }

    public set value(value: number) {
        this._value = value;
    }

    public get type() {
        return this._type;
    }

    public set type(type: string) {
        this._type = type;
    }

    public get id() {
        return this._id;
    }

    public getTransactions() {
        return {
            title: this._title,
            type: this._type,
            value: this._value,
            id: this._id
        }
    }
}