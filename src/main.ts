import express from "express";
import { userRoute } from "./routes/user.routes";

const app = express();
const PORT: number = 3333;

app.use(express.json());
app.use('/', userRoute);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

