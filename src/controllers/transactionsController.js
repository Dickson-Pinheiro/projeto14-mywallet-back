import { walletDb } from "../database/db.js"
import { ObjectID } from "bson";

export const transactionsController = {

    async createTransaction(req, res) {
        const { value, text, type } = req.body;
        const { userId } = req;

        try {

            const user = await walletDb.collection("user").findOne({ _id: ObjectID(userId) })
            if (!user) {
                return res.status(404).send({ message: "user not found" })
            }

            await walletDb.collection("transactions").insertOne({ text, value, type, userId, date: Date.now() })

            return res.status(201).send()
        } catch (error) {
            console.log(error)
            return res.status(500)
        }

    },

    async getTransactions(req, res) {

        const { userId } = req

        try {
            const transactions = await walletDb.collection("transactions").find({ userId }).toArray()
            res.send(transactions)
        } catch (error) {
            res.status(500).send()
        }

    },

    async getTransactionById(req, res){
        const {userId} = req
        const {id} = req.params

        try {
            const transaction = await walletDb.collection("transactions").findOne({_id: ObjectID(id)})
            if(transaction.userId !== userId){
                return res.status(403).send({message: "forbiden"})
            }

            return res.send({text: transaction.text, value: transaction.value})
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    },

    async deleteTransaction(req, res) {
        const { id } = req.params
        const { userId } = req

        try {
            const transaction = await walletDb.collection("transactions").findOne({ _id: ObjectID(id) });

            if (!transaction) {
                return res.status(404).send({ message: "transaction not found" })
            }

            if (userId !== transaction.userId) {
                return res.status(403).send({ message: "forbiden" })
            }

            await walletDb.collection("transactions").deleteOne({ _id: ObjectID(id) })
            return res.status(204).send()

        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }

    },

    async updateTransaction(req, res) {
        const { id } = req.params;
        const { text, value } = req.body;
        const { userId } = req;


        try {

            const transaction = await walletDb.collection("transactions").findOne({ _id: ObjectID(id) });

            if (!transaction) {
                return res.status(404).send({ message: "transaction not found" });
            }

            if (transaction.userId !== userId) {
                return res.status(403).send({ message: "unauthorized" });
            }

            await walletDb.collection("transactions").updateOne({ _id: ObjectID(id) }, { $set: { text, value, date: Date.now() } })
            
            return res.send()
        } catch (error) {
            console.log(error)
            res.status(500).send()
        }

    }
}