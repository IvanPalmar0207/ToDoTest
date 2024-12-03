//Task Context
import { useTask } from "../../context/taskContext"
//React-hooks
import { useEffect, useState} from "react"
//React-router-dom
import {Link} from 'react-router-dom'
//Styles
import './styles/manageTask.css'
//Components
import CardTask from "../../components/cardTask"
import { ButtonReport } from "../../components/ButtonReport"
//Material Ui
import {Button} from '@mui/material'

function ManageTask(){

    useEffect(() => {
        document.title = 'Gestionar Tareas'
    })

    const {
        allTaskApi, 
        tasksList,
        allPrioritiesApi,
        prioritiesList,
        allStatusApi,
        statusList} = useTask()

    useEffect(() => {
        allTaskApi()
        allPrioritiesApi()
        allStatusApi()
    },[tasksList,prioritiesList,statusList])    

    const filterStatus = (idStatus) => {
        const findStatus = statusList.find(status => status.id === idStatus)
        return findStatus ? findStatus.nameStatus : ''
    }

    const filterPriority = (idPriority) => {
        const findPriority = prioritiesList.find(priority => priority.id === idPriority)
        return findPriority ? findPriority.namePriority : ''
    }

    const [pendantList, setPendantList] = useState([])
    const [completedList, setCompletedList] = useState([])
    const [allTaskList, setAllTasks] = useState([])

    const pendatTasks = () => {
        const pendantTask = tasksList.filter(task => task.idStatus == 1)
        setPendantList(pendantTask)        
        setCompletedList([])       
        setAllTasks([])
    }

    const completedTasks = () => {
        const filterCompletedTask = tasksList.filter(task => task.idStatus == 2)
        setCompletedList(filterCompletedTask)        
        console.log(filterCompletedTask)
        setPendantList([])
        setAllTasks([])
    }

    const allTasks = () => {
        setAllTasks(tasksList)
        setPendantList([])
        setCompletedList([])       
    }

    return(
        <section className="sectionManageTask">
            <div className="containerDescriptionTask">
                <h2>
                    Bienvenido, gestiona todas tus tareas y compromisos.
                </h2>
                <p>
                    En este apartado podras ver todas tus tareas, agregar nuevas tareas, actualizar las tareas existentes,
                    eliminar tareas especificas, y por ultimo filtrar las tareas por su estado o prioridad. Como usuario tendras un monton 
                    de posibilidades para gestionar tus tareas dentro de este aplicativo.
                </p>
                <div className="containerAddTask">
                    <Link to='/addTask' className="addTaskButton">
                        Añadir Nueva Tarea
                    </Link>
                </div>
            </div>

            <div className="containerFilter">
                <h2>
                    Filtra y Visualiza Tareas
                </h2>

                <div className="containerCategories">
                    <div className="containerButtonCat" onClick={allTasks}>
                        <Button className="buttonCat">
                            Todas las tareas
                        </Button>
                    </div>
                    <div className="containerButtonCat" onClick={pendatTasks}>
                        <Button className="buttonCat">
                            Tareas Pendientes
                        </Button>
                    </div>
                    <div className="containerButtonCat" onClick={completedTasks}>
                        <Button className="buttonCat">
                            Tareas Completadas
                        </Button>
                    </div>
                    <div className="containerButtonReport">
                        <ButtonReport tasks={tasksList}/>
                    </div>
                </div>

                <div className="containerAllTask">                    

                    {
                        pendantList.length <= 0 && completedList.length <= 0 && allTaskList.length <= 0 ?
                        tasksList.map(task => {
                            return(
                                <CardTask
                                    key={task.id}
                                    id={task.id}
                                    nameTask={task.nameTask}
                                    descriptionTask={task.descriptionTask}
                                    dateSuccess={task.dateSuccess}
                                    idStatus={filterStatus(task.idStatus)}
                                    idStatusId = {task.idStatus}
                                    idPriority={filterPriority(task.idPriority)}
                                />
                        )})
                        : null
                    }

                    {                        
                        allTaskList.length > 0 ?
                        allTaskList.map(task => {
                            return(
                                <CardTask
                                    key={task.id}
                                    id={task.id}
                                    nameTask={task.nameTask}
                                    descriptionTask={task.descriptionTask}
                                    dateSuccess={task.dateSuccess}
                                    idStatus={filterStatus(task.idStatus)}
                                    idStatusId = {task.idStatus}
                                    idPriority={filterPriority(task.idPriority)}
                                />
                        )})
                        : null
                    }

                    {                        
                        pendantList.length > 0 ?
                        pendantList.map(task => {
                            return(
                                <CardTask
                                    key={task.id}
                                    id={task.id}
                                    nameTask={task.nameTask}
                                    descriptionTask={task.descriptionTask}
                                    dateSuccess={task.dateSuccess}
                                    idStatus={filterStatus(task.idStatus)}
                                    idStatusId = {task.idStatus}
                                    idPriority={filterPriority(task.idPriority)}
                                />
                        )})
                        : null
                    }
                    {
                        completedList.length > 0 ?
                        completedList.map(task => {
                            return(
                                <CardTask
                                    key={task.id}
                                    id={task.id}
                                    nameTask={task.nameTask}
                                    descriptionTask={task.descriptionTask}
                                    dateSuccess={task.dateSuccess}
                                    idStatus={filterStatus(task.idStatus)}
                                    idStatusId = {task.idStatus}
                                    idPriority={filterPriority(task.idPriority)}
                                />
                        )})
                        : null
                    }
                    
                    
                </div>

            </div>

        </section>
    )
}

export default ManageTask