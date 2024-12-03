//Material Ui
import { Button } from "@mui/material"
import { useEffect, useState } from "react"
//Excel Report
import * as XLSX from 'xlsx'
//User Context
import { useAuth } from "../context/userContext"
//Task Context
import { useTask } from "../context/taskContext"
//Reactstrap
import {Spinner} from 'reactstrap'
//Format Dates
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function ButtonReport({tasks}){

    //Download State
    const [loading, setLoading] = useState(false)
    
    //User Context
    const {user} = useAuth()
    
    //Task Context
    const {allPrioritiesApi, allStatusApi, prioritiesList, statusList} = useTask()
    
    //Load Status and Priorities data
    useEffect(() => {
        allPrioritiesApi()
        allStatusApi()
    },[prioritiesList, statusList])

    //Filter Priority
    const filterPriority = (idPriority) => {
        const priorityFound = prioritiesList.find(priority => priority.id === idPriority)
        return priorityFound ? priorityFound.namePriority : ''
    }   

    //Filter Status
    const filterStatus = (idStatus) => {
        const statusFound = statusList.find(status => status.id === idStatus)
        return statusFound ? statusFound.nameStatus : ''
    }

    //Download Task
    const handleDownload = () => {
        setLoading(true)

        const book = XLSX.utils.book_new()

        const table = [{}]

        tasks.map((task) => {
            table.push({
                'Identificador' : task.id,
                'Nombre de la tarea' : task.nameTask,
                'Descripción de la tarea' : task.descriptionTask,
                'Fecha Limite' : dayjs(task.dateSuccess).utc().format('DD/MM/YYYY hh:mm:ss'),
                'Prioridad' : filterPriority(task.idPriority),
                'Estado' : filterStatus(task.idStatus)
            })
        })

        const sheet = XLSX.utils.json_to_sheet(table)

        XLSX.utils.book_append_sheet(book, sheet, 'Tareas')

        setTimeout(() => {
            XLSX.writeFile(book, `${user.fullName} - ReporteTareas.xlsx`)
            setLoading(false)
        }, 1000)
    }

    return(
        <>
        {!loading ? (
            <Button className="buttonReport" onClick={handleDownload}>
                Generar Reporte
            </Button>
        ): (
            <Button color="success" disabled={true}>
                <Spinner size="sm">Cargando...</Spinner>
            </Button>
        )}
        </>
    )
}