import {MongoClient} from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)
let walletDb;
try {
    await mongoClient.connect()
    walletDb = mongoClient.db()
} catch (error) {
    console.log('Deu errro no server')
}

export {walletDb}
