import express from "express";
import { userRoute } from "./routes/user.routes";
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const DOOR = process.env.PORT

app.use(express.json());
app.use('/', userRoute);

app.listen(DOOR, () => {
    console.log(`Server started on port ${DOOR}`)
})

