//TaskModel
import taskModel from "../models/taks.model.js";

//Add Task
export const addTask = async(req, res) => {
    const {nameTask, descriptionTask, dateSuccess, idStatus, idPriority} = req.body

    try{

        //New Task
        const newTask = new taskModel({
            nameTask,
            descriptionTask,
            dateSuccess,
            idStatus : idStatus,
            idPriority : idPriority,
            idUser : req.user.id
        })

        const saveUser = await newTask.save()

        res.status(200).json(saveUser)

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}
//UpdateTask
export const updateTask = async(req, res) => {
    const {id} = req.params
    const {nameTask, descriptionTask, dateSuccess, idStatus, idPriority} = req.body

    try{

        //New TaskTaskFound
        const taskFound = await taskModel.findByPk(id)
        if(!taskFound) return res.status(404).json({message : 'Tarea no encontrada.'})
        
        taskFound.nameTask = nameTask
        taskFound.descriptionTask = descriptionTask
        taskFound.dateSuccess = dateSuccess
        taskFound.idStatus = idStatus
        taskFound.idPriority = idPriority

        await taskFound.save()

        res.status(200).json(taskFound)

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}
//Update Status
export const updateStatus = async(req, res) => {
    const {id} = req.params
    const {idStatus} = req.body

    try{

        //TaskFound
        const taskFound = await taskModel.findByPk(id)

        if(!taskFound) return res.status(404).json({message : 'La tarea no ha sido encontrada.'})

        taskFound.idStatus = idStatus

        await taskFound.save()

        res.status(200)

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}
//DeleteTask
export const deleteTask = async(req, res) => {
    const {id} = req.params
    
    try{
        //TaskFound
        const taskFound = await taskModel.findByPk(id)

        if(!taskFound) return res.status(404).json({message : 'La tarea no ha sido encontrada.'})
        
        await taskFound.destroy()

        res.status(201).json({message : 'La tarea ha sido eliminada correctamente.'})
        
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}
//Get One Task
export const getOneTask = async(req, res) => {
    const {id} = req.params

    try{
        //TaskFound
        const taskFound = await taskModel.findByPk(id)

        if(!taskFound) return res.status(404).json({message : 'La tarea no ha sido encontrada.'})

        res.status(200).json(taskFound)

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}
//Get All Tasks
export const allTasks = async(req, res) => {
    try{

        const allTask = await taskModel.findAll({
            where : {
                idUser : req.user.id
            }
        })

        res.status(200).json(allTask)

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}