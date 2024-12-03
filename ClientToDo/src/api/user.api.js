//Axios Client
import apiClient from "./axios";

//Register User Method
export const registerUser = (user) => {
    return apiClient.post('http://localhost:3000/api/register', user)
}

//Login User Method
export const loginUser = (user) => {
    return apiClient.post('http://localhost:3000/api/loginUser', user)
}

//Logout User Method
export const logoutUser = () => {
    return apiClient.post('http://localhost:3000/api/logout')
}

//Update User Method
export const updateUser = (id, user) => {
    return apiClient.put(`http://localhost:3000/api/updateUser/${id}`, user)
}

//Delete User Method
export const deleteUser = (id) => {
    return apiClient.delete(`http://localhost:3000/api/deleteUser/${id}`)
}

//VerifyToken Method
export const verifyToken = () => {
    return apiClient.get('http://localhost:3000/api/verifyToken')
}