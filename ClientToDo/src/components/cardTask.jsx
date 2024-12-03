//Style
import './styles/cardStyle.css'
//Icons
import { MdOutlineUpdate } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
//Task Context
import { useTask } from '../context/taskContext';
//React-router-dom
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//DayJs
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
//React-hook-forms
import {useForm} from 'react-hook-form'
//Material Ui
import {Button} from '@mui/material'
//SweetAlert
import Swal from 'sweetalert2';

function CardTask({id, nameTask, descriptionTask, dateSuccess, idStatus, idStatusId, idPriority}){
    
    const {deleteTaskApi, updateStatusApi} = useTask()
    const navigate = useNavigate()

    const {handleSubmit, register} = useForm()

    const onSubmit = handleSubmit(async(data) => {
        updateStatusApi(id, data)  
        Swal.fire({
            title : 'Estado Actualizado',
            text : 'El estado ha sido actualizado correctamente.',
            icon : 'success',
            confirmButtonColor : '#3ed634',
            confirmButtonText : 'Siguiente'
        })
    })

    return(
        <div className='containerCard'>
            <div className='containerInfoCard'>
                <h2>
                    {nameTask}
                </h2>
                <p>
                    {descriptionTask}
                </p>
                <div className='containerStatus'>
                    <h4 className='statusChange'>
                        <span className='changeColour'>Estado: </span> {idStatus} {     
                            idStatusId === 1 ?
                            (                                
                                <span>                                                                        
                                    <MdOutlineUpdate className='iconStatus'/>                                        
                                </span>
                            )
                            :                            
                            (
                                <span>                                    
                                    <FaCircleCheck className='iconStatus' />                                    
                                </span>
                            )                       
                        }
                    </h4>
                    <h4>
                        <span className='changeColour'>Prioridad:</span> {idPriority}
                    </h4>
                </div>
                <div className='containerDateSuccess'>
                    <h4>
                        <span className='changeColour'>Fecha limite:</span> {dayjs(dateSuccess).utc().format('DD/MM/YYYY hh:mm:ss')}
                    </h4>
                </div>
            </div>
            <div className='containerOptions'>
                <div>
                    <Link to={`/updateTask/${id}`} className='optionsTask updateCon'>
                        <MdOutlineUpdate />
                    </Link>
                </div>
                <div>
                    <Link className='optionsTask deleteCon' onClick={() => {
                        const deleteTask = Swal.mixin({

                        })

                        deleteTask.fire({
                            title : 'Eliminar Tarea',
                            text : 'Estas seguro de eliminar la tarea seleccionada?',
                            icon : 'info',
                            showCancelButton : true,
                            confirmButtonText : 'Si, eliminar',
                            confirmButtonColor : '#3ed634',
                            cancelButtonColor : '#ff2d2d',
                            cancelButtonText : 'Cancelar'
                        }).then((result) => {
                            if(result.isConfirmed){
                                deleteTask.fire({
                                    title : 'Tarea Eliminada',
                                    text : 'La tarea ha sido eliminada correctamente.',
                                    icon : 'success',
                                    confirmButtonColor : '#3ed634',
                                    confirmButtonText : 'Siguiente'
                                })
                                deleteTaskApi(id)
                                navigate('/manageTasks')
                            }else if(result.dismiss === Swal.DismissReason.cancel){
                                deleteTask.fire({
                                    title : 'Operación Cancelada',
                                    text : 'No se eliminara la tarea seleccionada.',
                                    icon : 'info',
                                    confirmButtonColor : '#3ed634',
                                    confirmButtonText : 'Volver'
                                })
                            }
                        })

                    }}>
                        <FaTrashAlt />
                    </Link>
                </div>
            </div>
        </div>  
    )
}

export default CardTask