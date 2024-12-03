//React-hooks
import { useEffect, useState } from "react";
//React-context
import { createContext, useContext } from "react";
//Task Methods
import { addTask } from "../api/task.api";
import { updateTask } from "../api/task.api";
import { updateStatus } from "../api/task.api";
import { deleteTask } from "../api/task.api";
import { getOneTask } from "../api/task.api";
import { allTasks } from "../api/task.api";
import { allPriorities } from "../api/task.api";
import { allStatus } from "../api/task.api";
//Task Context
export const TaskContext = createContext()

//Use Task Context
export const useTask = () => {
    const context = useContext(TaskContext)

    if(!context){
        throw new Error('Context must within a provider')
    }

    return context
}

//Task Provider
export const TaskProvider = ({children}) => {

    //TaskList
    const [tasksList, setTaskList] = useState([])
    //Priorities List
    const [prioritiesList, setPriorities] = useState([])
    //Status List
    const [statusList, setStatus] = useState([])

    const addTaskApi = async(task) => {
        try{
            const res = await addTask(task)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }

    const updateTaskApi = async(id, task) => {
        try{
            const res = await updateTask(id, task)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }

    const updateStatusApi = async(id, status) => {
        try{
            const res = await updateStatus(id, status)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }

    const deleteTaskApi = async(id) => {
        try{
            const res = await deleteTask(id)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }

    const getOneTaskApi = async(id) => {
        try{
            const res = await getOneTask(id)
            return res.data
        }catch(err){
            console.log(err)
        }
    }

    const allTaskApi = async () => {
        try{
            const res = await allTasks()
            setTaskList(res.data)
        }catch(err){
            console.log(err)
        }
    }

    const allPrioritiesApi = async () => {
        try{
            const res = await allPriorities()
            setPriorities(res.data)
        }catch(err){
            console.log(err)
        }
    }

    const allStatusApi = async () => {
        try{
            const res = await allStatus()
            setStatus(res.data)
        }catch(err){
            console.log(err)
        }
    }

    return(
        <TaskContext.Provider value={{
            addTaskApi,
            updateTaskApi,
            updateStatusApi,
            deleteTaskApi,
            getOneTaskApi,
            allTaskApi,
            allPrioritiesApi,
            allStatusApi,

            tasksList,
            prioritiesList,
            statusList
        }}>
            {children}
        </TaskContext.Provider>
    )
}