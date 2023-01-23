import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { walletDb } from "../database/db.js"


export const userController = {

    async createUser(req, res) {
        const { name, password, email } = req.body

        const passwordHashed = bcrypt.hashSync(password, 10)
        try {
            const userExists = await walletDb.collection("user").findOne({ email })
            if (userExists) {
                return res.status(409).send()
            }
            await walletDb.collection("user").insertOne({ name, email, password: passwordHashed })
            return res.sendStatus(201)
        } catch (error) {
            return res.sendStatus(500)
        }

    },

    async userLogin(req, res) {
        const { email, password } = req.body

        try {
            const user = await walletDb.collection("user").findOne({email})
            if(!user){
                res.status(404).send({message: "user not found"})
            }

            const passwordCompare = bcrypt.compareSync(password, user.password)
            
            if(!passwordCompare){
                return res.status(400).send({message: "incorret login or password"})
            }

            const token = jwt.sign({name: user.name, id: user._id}, process.env.SECRET, {expiresIn: "3h"})
            res.send({token, name: user.name, id: user._id})
        } catch (error) {
            console.log(error)
            res.status(500).send()
        }
    }

}