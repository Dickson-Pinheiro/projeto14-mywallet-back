import {walletDb} from "../database/db.js"
import { ObjectID } from "bson";

export const transactionsController = {

    async createTransactions(req, res){
        const {value, text, type} = req.body;
        const {userId} = req;

        try {

        const user = await walletDb.collection("user").findOne({_id: ObjectID(userId)})
        if(!user){
           return res.status(404).send({message: "user not found"})
        }

        await walletDb.collection("transactions").insertOne({text, value, type, userId, date: Date.now()})        

        return res.status(201).send()
        } catch (error) {
            console.log(error)
            return res.status(500)
        }
        
    },

    async getTransactions(req, res){

        const {userId} = req

        try {
            const transactions = await walletDb.collection("transactions").find({userId}).toArray()
            res.send(transactions)
        } catch (error) {
            res.status(500).send()
        }

    }
}