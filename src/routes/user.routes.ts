import { Router } from "express";
import { TransactionsController } from "../controller/transactions.controller";
import { UserController } from "../controller/user.controller";
import { cpfExistsMiddleware } from "../middlewares/cpf-exits-validate";
import { cpfValidateMiddleware } from "../middlewares/cpf-validator.middleware";
import { userValidator } from "../middlewares/user-validator";

const userRoute = Router();

// dessa forma, todas as rotas vão ter o middleaware
//userRoute.use(logMiddleware);

// API REST - PADRAO - SEMÂNTICA

//******************** ROTAS DO USUÁRIO *******************************

userRoute.post('/users', [cpfValidateMiddleware, cpfExistsMiddleware], new UserController().createUser);

userRoute.get('/users', new UserController().listUserByAtributes);

userRoute.get('/users/:id', new UserController().listUsertById);

// userRoute.get('/users/all', new UserController().listAllUsers);
userRoute.get('/users/all', new UserController().list);

userRoute.put('/users/:id', new UserController().editUser);

userRoute.delete('/users/:id', new UserController().deleteUser)

// *********************** ROTAS DAS TRANSAÇÕES ************************

userRoute.post('/users/:userId/transactions', [userValidator],new TransactionsController().createTransactions);

userRoute.get('/users/:userId/transactions/:id', [userValidator], new TransactionsController().getIdandTransactions);

userRoute.get('/users/:userId/transactions', [userValidator], new TransactionsController().resultAllTransactionsByUser);

userRoute.put('/users/:userId/transactions/:id', [userValidator], new TransactionsController().editTransactions);

userRoute.delete('/users/:userId/transactions/:id', [userValidator], new TransactionsController().deleteTransactions)

export {userRoute};