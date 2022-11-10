import { query, Request, Response } from "express";
import { userArray } from "../data/userList";
import { dbConnection } from "../database/pg.database";
import { User } from "../models/User";

export class UserController {

    // POST
    public async createUser(request: Request, response: Response) {
        
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
            // userArray.push(users)

            const query = `insert into transactions."user" (id_user, "name", cpf, email, age) values ('${users.id}', '${users.name}', ${users.cpf}, '${users.email}', ${users.age})`;

            const result = await dbConnection.query(query);

            const volta = await dbConnection.query(`select * from transactions."user" where id_user = '${users.id}'`)

            return response.status(200).send({
                ok: true,
                message: 'User registered successfully!!',
                data: volta.rows
            })
            
        } catch (error: any) {
            return response.status(500).send({
                ok: false,
                error: error.toString()
            })
        }

        }

    public async listAllUsers(request: Request, response: Response) {

        try {

            // let userList = userArray;

            // let userListReturn = userList.map(user => {
            //     return user.getUsers();
            // })

            // const result = await dbConnection.query(`select * from transactions."user"`)            

            return response.status(200).send({
                ok: true,
                message: 'List off all users!'
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

    public async editUser(request: Request, response: Response) {

        try {
            
            const {id} = request.params;
            const {name, email, cpf, age} = request.body;

            const query = await dbConnection.query(`select * from transactions."user" where id_user = '${id}'`);

            if(query.rowCount <= 0) {
                return response.status(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            const result = await dbConnection.query(`update transactions."user" set name = '${name}', email = '${email}', cpf = ${cpf}, age = ${age} where id_user = '${id}'`);

            // const idUser = userArray.find(user => user.id == id)

            // if(!idUser) {
            //     return undefined
            // }

            // idUser.name = name;
            // idUser.cpf = cpf;
            // idUser.email = email;
            // idUser.age = age;      

            const user = query.rows[0];

            user.name = name;
            user.email = email;
            user.cpf = cpf;
            user.age = age;
            
            return response.status(200).send({
                ok: true,
                message: 'User successfully updated!',
                data: user
            })
            
        } catch (error: any) {

            return response.status(500).send({
                ok: false,
                error: error.toString()
            })

        }
    }

    public async deleteUser(request: Request, response: Response) {

        try {

            const {id} = request.params;

            const query = await dbConnection.query(`select * from transactions."user" where id_user = '${id}'`);

            if(query.rowCount <= 0) {
                return response.status(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            const result = await dbConnection.query(`delete from transactions."user" where id_user = '${id}'`);

            // let userList = userArray.findIndex(user => user.id == id)

            // if(!userList) {
            //     return response.status(404).send({
            //         ok: false,
            //         message: 'User not found!'
            //     })
            // }

            // userArray.splice(userList, 1)

            

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

    public async list(request: Request, response: Response) {

        try {

            // let userList = userArray;

            // let userListReturn = userList.map(user => {
            //     return user.getUsers();
            // })

            const result = await dbConnection.query(`select * from transactions."user"`)

            return response.status(200).send({
                ok: true,
                message: 'List off all users!',
                data: result
            })
            
            
        } catch (error: any) {
            
            return response.status(500).send({
                ok: false,
                error: error.toString()
            })

        }

    }


}