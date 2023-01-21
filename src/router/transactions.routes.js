import {Router} from "express"
import { transactionsController } from "../controllers/transactionsController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { validateToken } from "../middleware/validateToken.js";
import { transactionsSchema } from "../schema/transactionsSchema.js";

const transactionsRouter = Router()

transactionsRouter.post("/transactions",validateToken, validateSchema(transactionsSchema), transactionsController.createTransactions)
transactionsRouter.get("/transactions", validateToken, transactionsController.getTransactions)

export {transactionsRouter};