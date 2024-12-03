//Axios Client 
import apiClient from "./axios";

//Add Task Method
export const addTask = (task) => {
    return apiClient.post('http://localhost:3000/api/addTask', task)
}

//Update Task Method
export const updateTask = (id, task) => {
    return apiClient.put(`http://localhost:3000/api/updateTask/${id}`, task)
}

//Update Status Method
export const updateStatus = (id, task) => {
    return apiClient.patch(`http://localhost:3000/api/updateStatus/${id}`, task)
}

//Delete Task Method
export const deleteTask = (id) => {
    return apiClient.delete(`http://localhost:3000/api/deleteTask/${id}`)
}

//Get One Task Method
export const getOneTask = (id) => {
    return apiClient.get(`http://localhost:3000/api/getOneTask/${id}`)
}

//All Task Method
export const allTasks = () => {
    return apiClient.get('http://localhost:3000/api/allTasks')
}

//All Priorities
export const allPriorities = () => {
    return apiClient.get('http://localhost:3000/api/allPriorities')
}

//All Status
export const allStatus = () => {
    return apiClient.get('http://localhost:3000/api/allStatus')
}