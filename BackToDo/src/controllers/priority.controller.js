//Priority Model
import priorityModel from "../models/priority.model.js";

//Add Priority
export const addPriority = async (req, res) => {

    const {namePriority} = req.body

    try{

        //Found Priority
        const foundPriority = await priorityModel.findOne({
            namePriority : namePriority
        })

        if(foundPriority) return res.status(400).json({message : 'La prioridad de la tarea ya existe.'})

        //New Priority
        const newPriority = new priorityModel({
            namePriority : namePriority
        })

        const saveNewPriority = await newPriority.save()

        res.status(200).json({
            saveNewPriority
        })

    }catch(err){
        return res.status(500).json({message : err.message});
    }

}

//Update Priority
export const updatePriority = async (req, res) => {
    const {id} = req.params
    const {namePriority} = req.body

    try{

        //Priority Found
        const priorityFound = await priorityModel.findByPk(id)

        if(!priorityFound) return res.status(404).json({message : 'La prioridad no fue encontrada.'})

        //Priority Name Found
        const priorityNameFound = await priorityModel.findOne({
            namePriority : namePriority
        })

        if(priorityNameFound) return res.status(400).json({message : 'Ya hay una prioridad con ese nombre, intenta un nuevo nombre.'})                
        

        priorityFound.namePriority = namePriority

        await priorityFound.save()

        res.status(200).json({
            priorityFound
        })

    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

//Delete Priority
export const deletePriority = async (req, res) => {
    const {id} = req.params

    try{
        //Priority Found
        const priorityFound = await priorityModel.findByPk(id)

        if(!priorityFound) return res.status(404).json({message : 'La prioridad de la tarea no fue encontrada.'})

        await priorityFound.destroy()

        res.status(201).json({message : 'La prioridad de la tarea fue eliminada correctamente.'})

    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

//Get One Priority
export const getOnePriority = async (req, res) => {
    const {id} = req.params
    
    try{
        //Priority Found
        const priorityFound = await priorityModel.findByPk(id)

        if(!priorityFound) return res.status(404).json({message : 'La prioridad de la tarea no fue encontrada.'})

        res.status(200).json(priorityFound)

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

//Get All Priorities
export const allPriorities = async (req, res) => {

}