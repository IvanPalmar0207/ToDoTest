//User Model
import userModel from "../models/user.model.js";
//Hash Bcryptjs
import bcryptjs from 'bcryptjs'
//JsonWebToken
import createAccessToken from "../libs/jwt.js";
import jwt from 'jsonwebtoken'
import TOKEN_SECRET from "../config.js";

//Register User
export const registerUser = async(req, res) => {
    const {fullName, cellPhone, emailUser, passwordUser} = req.body

    try{

        //Email Found
        const emailFound = await userModel.findOne({
            where : {
                emailUser : emailUser
            }
        })

        if(emailFound) return res.status(400).json({message : 'El correo electrónico ya existe, intenta nuevamente.'})

        //CellPhone Found
        const cellPhoneFound = await userModel.findOne({
            where : {
                cellPhone : cellPhone
            }
        })

        if(cellPhoneFound) return res.status(400).json({message : 'El número de telefono ya existe, intenta nuevamente.'})

        //Has Password
        const passwordHash = await bcryptjs.hash(passwordUser, 8)

        //New User
        const newUser = new userModel({
            fullName : fullName,
            cellPhone : cellPhone,
            emailUser : emailUser,
            passwordUser : passwordHash
        })

        const saveUser = await newUser.save()

        const token = await createAccessToken({
            id : saveUser.id,
            fullName : saveUser.fullName,
            cellPhone : saveUser.cellPhone,
            emailUser : saveUser.emailUser
        })

        res.cookie('token', token, {sameSite : 'none', secure : true})

        res.json(saveUser)


    }catch(err){
        return res.status(500).json({message : err.message});
    }
}
//Login User
export const loginUser = async(req, res) => {
    const {emailUser, passwordUser} = req.body
    try{
        
        //EmailFound
        const userFound = await userModel.findOne({
            where : {
                emailUser : emailUser
            }
        })

        if (!userFound) return res.status(404).json({message : 'El correo electrónico no fue encontrado.'})

        //Password Match
        const passwordMatch = await bcryptjs.compare(passwordUser, userFound.passwordUser)

        if(!passwordMatch) return res.status(404).json({message : 'La contraseña es incorrecta, intenta nuevamente.'})

        //Access Token
        const token = await createAccessToken({
            id : userFound.id,
            fullName : userFound.fullName,
            emailUser : userFound.emailUser,
            cellPhone : userFound.cellPhone
        })

        res.cookie('token', token, {sameSite : 'none', secure : true})

        res.json(userFound)

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}
//Update User
export const updateUser = async (req, res) => {
    const {id} = req.params
    const {fullName, cellPhone, emailUser, passwordUser} = req.body

    try{

        //UserFound
        const userFound = await userModel.findByPk(id)

        if(!userFound) return res.status(404).json({message : 'El usuario no fue encontrado.'})

        //PasswordHash
        const passwordHash = await bcryptjs.hash(passwordUser, 8)

        userFound.fullName = fullName
        userFound.cellPhone = cellPhone
        userFound.emailUser = emailUser
        userFound.passwordUser = passwordHash

        await userFound.save()

        res.status(200).json(userFound)

    }catch(err){
        return res.status(500).json({message : err.message})
    }

}
//Delete User
export const deleteUser = async(req, res) => {
    const {id} = req.params
    try{

        //UserFound
        const userFound = await userModel.findByPk(id)

        if(!userFound) return res.status(404).json({message : 'El usuario no fue encontrado.'})

        await userFound.destroy()

        res.status(201).json({message : 'El usuario fue eliminado correctamente.'})

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

//LogOut User
export const logOutUser = (req, res) => {    
    res.cookie('token','',{
        expires : new Date(0)
    })
    
    res.status(200).json({message : 'Has cerrado la sesión correctamente'})
}

//Verify Token User
export const verifyToken = (req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message : 'El token no fue encontrado.'})

    jwt.verify(token, TOKEN_SECRET, async(err, user1) => {
        
        if(err) return res.status(401).json({message : 'Token Not Valid'})

        //UserFound
        const userFound = await userModel.findOne({
            where : {
                emailUser : user1.emailUser
            }
        })

        if(!userFound) return res.status(401).json({message : 'Unauthorized'})

        return res.json({
            id : userFound.id,
            fullName : userFound.fullName,
            cellPhone : userFound.cellPhone,
            emailUser : userFound.emailUser
        })

    })
}