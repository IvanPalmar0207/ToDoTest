//Json Web Token
import jwt from 'jsonwebtoken'
//Token Secret
import TOKEN_SECRET from '../config.js'

//Auth Required Middleware
const authRequired = (req, res, next) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message : 'Token Not Found'})

    jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
        if(error) return res.status(403).json({message : 'You don"t have the rights'})
        
        req.user = decoded

        next()
    })
}

export default authRequired