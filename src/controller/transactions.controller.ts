import { Request, Response } from "express";
import { Transactions } from "../models/Transactions";
import { userArray } from "../data/userList";

export class TransactionsController {

    public createTransactions(request: Request, response: Response) {

        try {

            const {title, type, value} = request.body;
            const {userId} = request.params;

            if(!title) {
                return response.status(400).send({
                    ok: false,
                    message: 'Title not provided!'
                })
            }

            if(!type) {
                return response.status(400).send({
                    ok: false,
                    message: 'Title not provided!'
                })
            }

            if(!value) {
                return response.status(400).send({
                    ok: false,
                    message: 'Title not provided!'
                })
            }

            if(type !== 'income' && type !== 'outcome') {
                return response.status(400).send({
                    ok: false,
                    message: 'Type value is invalid!'
                })
            }

            const transactions = new Transactions(title, value, type);
            const user = userArray.find(user => user.id == userId );

            if(!user) {
                return response.status(400).send({
                    ok: false,
                    message: 'User not found!'
                })
            }
            
            user.transactions?.push(transactions)

            return response.status(201).send({
                ok: true,
                message: 'Transaction registered successfully!',
                data: {
                    ok: true,
                    id: user.id
                }
            })

        } catch (error: any) {

            return response.status(500).send({
                ok: false,
                error: error.toString()
            })

        }

    }

    public getIdandTransactions(request: Request, response: Response){
        try {

            const {userId, id} = request.params;
            const user = userArray.find(user => user.id == userId)

            if(!user) {
                return response.status(400).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            const transactions = user.transactions?.find(transaction => transaction.id == id)

            if(!transactions) {
                return response.status(400).send({
                    ok: false,
                    message: 'Transactions not found!'
                })
            }

            return response.status(200).send({
                id: transactions.id,
                title: transactions.title,
                value: transactions.value,
                type: transactions.type
            })

        } catch (error: any) {

            return response.status(500).send({
                ok: false,
                error: error.toString()
            })

        }
    }

    public resultAllTransactionsByUser(request: Request, response: Response) {

        try {

            const {userId} = request.params;
            const {type, title} = request.query;

            let user = userArray.find(user => user.id == userId)

            if(!user) {
                return response.status(400).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            let listTransactionsUser = user.transactions || [];

            if(type) {
                listTransactionsUser = listTransactionsUser.filter(transactions => transactions.type == type)
            }

            if(title) {
                listTransactionsUser = listTransactionsUser.filter(transactions => transactions.title == title)
            }

            let incomes = user.transactions
            ?.filter(transaction => transaction.type === 'income')
            .reduce((acc, cur) => {
                return acc + cur.value
            }, 0)

            let outcomes = user.transactions
            ?.filter(transaction => transaction.type === 'outcome')
            .reduce((acc, cur) => {
                return acc + cur.value
            }, 0)

            if(!incomes || !outcomes){
                return response.status(404).send({
                    ok: false,
                    message: 'Type not found!'
                })
            }

            let resultTypes = incomes - outcomes

            return response.status(200).send({
                transactions : listTransactionsUser.map(item => {
                    return {
                        id: item.id,
                        title: item.title,
                        value: item.value,
                        type: item.type
                    }                    
                }),
                balance: {
                    income: incomes,
                    outcome: outcomes,
                    balance: resultTypes
                }
            })

        } catch (error: any) {

            return response.status(500).send({
                ok: false,
                error: error.toString()
            })

        }

    }

    public editTransactions(request: Request, response: Response) {

        try {

            const {userId, id} = request.params;
            const {title, type, value} = request.body;

            const user = userArray.find(user => user.id == userId)

            if(!user) {
                return response.status(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            const transacitons = user.transactions?.find(transaction => transaction.id == id)

            if(!transacitons) {
                return response.status(404).send({
                    ok: false,
                    message: 'Transactions not found!'
                })
            }
            
            transacitons.title = title;
            transacitons.type = type;
            transacitons.value = value;

            return response.status(200).send({
                ok: true,
                message: 'Transactions aleready!',
                data: {
                    id,
                    title,
                    type,
                    value
                }
            })
            
        } catch (error: any) {
            
            return response.status(500).send({
                ok: false,
                error: error.toString()
            })

        }

    }

    public deleteTransactions(request: Request, response: Response) {
        
        try {

            const {id, userId} = request.params;

            let user = userArray.find(user => user.id == userId)

            if(!user) {
                return response.status(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            const transacitons = user.transactions
            ? user.transactions.findIndex(user => user.id == id)
            : -1;

            if(transacitons < 0) {
                return response.status(404).send({
                    ok: false,
                    message: 'Tranasactions not found!'
                })
            }

            user.transactions?.splice(transacitons, 1)
            
        } catch (error: any) {
            
            return response.status(500).send({
                ok: false,
                error: error.toString()
            })

        }
        
    }

}
