import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export function validateToken(req, res, next){
    let {authorization: token} = req.headers
    
    if(!token){
        res.status(401).send({message: "Unauthorized"})
    }
    token = token.replace("Bearer ","")
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
            res.status(401).send({message: "Unauthorized"})
        }
        req.userId = decoded.id
    })
    next()
}