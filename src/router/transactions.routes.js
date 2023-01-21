import {Router} from "express"
import { transactionsController } from "../controllers/transactionsController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { validateToken } from "../middleware/validateToken.js";
import { transactionsSchema } from "../schema/transactionsSchema.js";
import { updateTransactionSchema } from "../schema/updateTransactionSchema.js";

const transactionsRouter = Router()


transactionsRouter.use(validateToken)
transactionsRouter.post("/transactions", validateSchema(transactionsSchema), transactionsController.createTransaction)
transactionsRouter.get("/transactions", transactionsController.getTransactions)
transactionsRouter.delete("/transactions/:id", transactionsController.deleteTransaction)
transactionsRouter.put("/transactions/:id", validateSchema(updateTransactionSchema), transactionsController.updateTransaction )

export {transactionsRouter};