import {Router} from "express"
import { transactionsController } from "../controllers/transactionsController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { validateToken } from "../middleware/validateToken.js";
import { transactionsSchema } from "../schema/transactionsSchema.js";

const transactionsRouter = Router()


transactionsRouter.use(validateToken)
transactionsRouter.post("/transactions", validateSchema(transactionsSchema), transactionsController.createTransactions)
transactionsRouter.get("/transactions", transactionsController.getTransactions)
transactionsRouter.delete("/transactions/:id", transactionsController.deleteTransaction)

export {transactionsRouter};