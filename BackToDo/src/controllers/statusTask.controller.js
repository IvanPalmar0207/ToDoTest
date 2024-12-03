//Model Status
import statusTask from "../models/statusTask.model.js";

//Add Status
export const addTask = async (req, res) => {
    
    const {nameStatus} = req.body

    try{

        const newStatus = new statusTask(
            nameStatus
        )

        const saveTask = await newStatus.save()

        res.status(200).json(saveTask)

    }catch(err){
        return res.status(500).json({message : err.message});
    }

}

//Get One Status
export const getOneStatus = async(req, res) => {
    
    const {id} = req.body

    try{

        const statusFound = await statusTask.findByPk(id)

        if(!statusFound) return res.status(404).json({message : 'La tarea no ha podido ser encontrada correctamente.'})

        res.status(200).json(
            statusFound
        )

    }catch(err){
        return res.status(500).json({message : err.message});
    }

}

//Get All Status
export const allStatus = async (req, res) => {
    try{

        const getAllStatus = await statusTask.findAll()

        res.status(200).json(getAllStatus)

    }catch(err){    
        return res.status(500).json({message : err.message});
    }
}