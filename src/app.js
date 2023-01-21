import express from "express"
import cors from "cors"
import { userRouter } from "./router/user.routes.js"
import { transactionsRouter } from "./router/transactions.routes.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use([userRouter, transactionsRouter])


app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000")
})