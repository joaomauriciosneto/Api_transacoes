import { Request, Response } from "express";
import { userArray } from "../data/userList";
import { User } from "../models/User";

export class UserController {

    // POST
    public createUser(request: Request, response: Response) {
        
        try {

            const {name, cpf, email, age} = request.body;

            if(!name) {
                return response.status(400).send({
                    ok: false,
                    error: 'Name not provided!'
                })
            }

            if(!cpf) {
                return response.status(400).send({
                    ok: false,
                    error: 'CPF not provided!'
                })
            }

            if(!email) {
                return response.status(400).send({
                    ok: false,
                    error: 'Email not provided!'
                })
            }

            if(!age) {
                return response.status(400).send({
                    ok: false,
                    error: 'Age not provided!'
                })
            }

            const users = new User(name, cpf, email, age)
            userArray.push(users)

            console.log(userArray)

            return response.status(200).send({
                ok: true,
                message: 'User registered successfully!!',
                data: users
            })
            
        } catch (error: any) {
            return response.status(500).send({
                ok: false,
                error: error.toString()
            })
        }

        }

    public listAllUsers(request: Request, response: Response) {

        try {

            let userList = userArray;

            let userListReturn = userList.map(user => {
                return user.getUsers();
            })

            return response.status(200).send({
                ok: true,
                message: 'List off all users!',
                data: userListReturn
            })
            
            
        } catch (error: any) {
            
            return response.status(500).send({
                ok: false,
                error: error.toString()
            })

        }

    }

    // ESTÁ LISTANDO TODOS INDEPENDENTE DO ID INFORMADO
    public listUsertById(request: Request, response: Response) {

        try {      
            
            const {id} = request.params;

            let userListId = userArray.find(user => user.id == id);

            if(!userListId) {
                return response.send(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            //console.log(userListId);

            return response.status(200).send({
                id: userListId.id,
                name: userListId.name,
                cpf: userListId.cpf,
                email: userListId.email,
                age: userListId.age 
            })
            
        } catch (error: any) {
            
            return response.status(500).send({
                ok: false,
                error: error.toString()
            })

        }

    }

    public listUserByAtributes(request: Request, response: Response) {

        try {

            const {name, email, cpf} = request.query;

            let userList = userArray;

            if(name) {
                userList = userList.filter(userName => userName.name == name)
            }

            if(email) {
                userList = userList.filter(userEmail => userEmail.email == email)
            }

            if(cpf) {
                userList = userList.filter(userCpf => userCpf.cpf == Number(cpf)) 
            }

            let userReturn = userList.map(user => {
                return user.getUsers()
            })

            console.table(userReturn)

            if(userReturn.length > 0) {
                return response.status(200).send({
                    ok: true,
                    message: 'User found!',
                    data: userReturn
                })
            }else {
                return response.status(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }
            
        } catch (error: any) {

            return response.status(500).send({
                ok: false,
                error: error.toString()
            })

        }
        
    }

    public editUser(request: Request, response: Response) {

        try {
            
            const {id} = request.params;
            const {name, email, cpf, age} = request.body;

            const idUser = userArray.find(user => user.id == id)

            if(!idUser) {
                return undefined
            }

            idUser.name = name;
            idUser.cpf = cpf;
            idUser.email = email;
            idUser.age = age;      
            
            return response.status(200).send({
                ok: true,
                message: 'User successfully updated!'
            })
            
        } catch (error: any) {

            return response.status(500).send({
                ok: false,
                error: error.toString()
            })

        }
    }

    public deleteUser(request: Request, response: Response) {

        try {

            const {id} = request.params;

            let userList = userArray.findIndex(user => user.id == id)

            if(!userList) {
                return response.status(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            userArray.splice(userList, 1)

            return response.status(200).send({
                ok: true,
                message: 'User successfully deleted!'
            })
            
        } catch (error: any) {
            
            return response.status(500).send({
                ok: false,
                error: error.toString()
            })

        }
    }

    public getByCpf(cpf: number) {
        return userArray.find(item => item.cpf == cpf)
    }

    public list(request: Request, response: Response) {

        try {

            let userList = userArray;

            let userListReturn = userList.map(user => {
                return user.getUsers();
            })

            return response.status(200).send({
                ok: true,
                message: 'List off all users!',
                data: userListReturn
            })
            
            
        } catch (error: any) {
            
            return response.status(500).send({
                ok: false,
                error: error.toString()
            })

        }

    }


}