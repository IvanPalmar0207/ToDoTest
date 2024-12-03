//React-hooks
import { useEffect } from "react"
//React-router-dom
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
//Task Context
import { useTask } from "../../context/taskContext"
//React-hooks-form
import { useForm } from "react-hook-form"
//Style
import '../styles/formStyle.css'
//Material UI
import { Alert, Button } from "@mui/material"
//Use Params
import { useParams } from "react-router-dom"
//SweetAlert
import Swal from 'sweetalert2'
//Day Format
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function FormTask(){    

    //Form Hooks
    const {register, handleSubmit, setValue, formState : {errors}} = useForm()
    //Params
    const params = useParams()
    //Navigate Hook
    const navigate = useNavigate()
    //Task Context
    const {
        addTaskApi, 
        updateTaskApi, 
        getOneTaskApi,
        allPrioritiesApi,
        prioritiesList,
        allStatusApi,
        statusList
    } = useTask()

    const onSubmit = handleSubmit(async(data) => {
        if(params.id){
            Swal.fire({
                title : 'Tarea Actualizada',
                text : 'La tarea ha sido actualizada correctamente',
                icon : 'success',
                confirmButtonColor : '#3ed634',
                confirmButtonText : 'Siguiente'
            })
            updateTaskApi(params.id, data)
            navigate('/manageTasks')
        }else{
            Swal.fire({
                title : 'Tarea Agregada',
                text : 'La tarea ha sido agregada correctamente.',
                icon : 'success',
                confirmButtonColor : '#3ed634',
                confirmButtonText : 'Siguiente'
            })
            addTaskApi(data)
            navigate('/manageTasks')
        }
    })

    useEffect(() => {
        allPrioritiesApi()
    },[prioritiesList])

    useEffect(() => {
        allStatusApi()
    },[statusList])

    const statusFilter = (idStatus) => {
        const statusFind = statusList.find(status => status.id === idStatus)
        return statusFind ? statusFind.nameStatus : ''
    }

    const priorityFilter = (idPriority) => {
        const priorityFind = prioritiesList.find(prior => prior.id === idPriority)
        return priorityFind ? priorityFind.namePriority : ''
    }

    useEffect(() => {
        async function loadData(){
            if(params.id){

                document.title = 'Actualizar Tarea'

                const res = await getOneTaskApi(params.id)

                setValue('nameTask', res.nameTask)
                setValue('descriptionTask', res.descriptionTask)

                const titleForm = document.getElementById('titleForm')
                titleForm.innerHTML = 'Actualizar Tarea'

                const textForm = document.getElementById('textForm')
                textForm.innerHTML = 'Bienvenido usuario, ingresa la información de la tarea que vas a actualizar.'

                const buttonTask = document.getElementById('buttonTask')       
                buttonTask.innerHTML = 'Actualizar'
                
                const dateSuccessId = document.getElementById('dateSuccessId')
                dateSuccessId.innerHTML = `Fecha Limite: ${dayjs(res.dateSuccess).utc().format('DD/MM/YYYY hh:mm:ss')}*`

                const taskStatusId = document.getElementById('taskStatusId')
                taskStatusId.innerHTML = `Estado: ${statusFilter(res.idStatus)}*`

                const priorityId = document.getElementById('priorityId')
                priorityId.innerHTML = `Prioridad: ${priorityFilter(res.idPriority)}*`

            }else{
                document.title = 'Añadir Tarea'
            }
        }

        loadData()

    },[])

    return(
        <div className="containerFormTask">
            <div className="containerFormLG">
                <h1 id="titleForm">
                    Nueva Tarea
                </h1>
                <p id="textForm">
                    Bienvenido usuario, ingresa la información de la nueva tarea.
                </p>

                <form className="formTecnic" onSubmit={onSubmit}>
                    <input type="text"
                        {...register('nameTask',{
                            required: true,
                            minLength : 5
                        })}
                        placeholder="Nombre de la tarea"
                    />
                    {
                        errors.nameTask && <Alert severity="error">El nombre de la tarea debe de tener almenos 5 caracteres.</Alert>
                    }

                    <br />

                    <textarea 
                    rows={8}                    
                    {...register('descriptionTask',{
                        required : true,
                        minLength : 20
                    })}
                    placeholder="Descripción de la tarea"
                    ></textarea>
                    {
                        errors.descriptionTask && <Alert severity="error">La descripción debe de tener almenos 20 caracteres.</Alert>
                    }

                    <div className="containerLabel">
                        <label className="label" htmlFor="dateSuccess">
                            Fecha limite:
                        </label>
                    </div>

                    <p id="dateSuccessId" className="updateInfo"></p>

                    <input type="datetime-local"
                    {...register('dateSuccess',{
                        required : true
                    })}
                    />
                    {
                        errors.dateSucces && <Alert severity="error">La fecha limite es un campo obligatorio</Alert>
                    }

                    <div className="containerLabel">
                        <label className="label" htmlFor="idStatus">
                            Estado de la tarea:
                        </label>
                    </div>

                    <p id="taskStatusId" className="updateInfo"></p>
                    
                    <select
                    {...register('idStatus',{
                        required : true
                    })}
                    >
                    {
                        statusList.map(status => {
                            return(
                                <option key={status.id} value={status.id}>{status.nameStatus}</option>
                            )
                        })
                    }
                    </select>        

                    <br />

                    <div className="containerLabel">
                        <label className="label" htmlFor="idPriority">
                            Prioridad de la tarea:
                        </label>
                    </div>

                    <p id="priorityId" className="updateInfo"></p>

                    <select
                    {...register('idPriority',{
                        required : true
                    })}
                    >
                        {
                            prioritiesList.map(priority => {
                                return(
                                    <option key={priority.id} value={priority.id}>{priority.namePriority}</option>
                                )
                            })
                        }
                    </select>

                    <div className="containerButtonSubmit">
                        <Button
                            type="submit"
                            variant="contained"
                            className="confirmButtonLG"
                            id="buttonTask"
                        >
                            Agregar
                        </Button>
                    </div>

                    <div className="containerGoLG">
                        <Link to='/manageTasks' className="formLink">
                            Volver Atrás
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default FormTask