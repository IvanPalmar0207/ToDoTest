//AuthContext
import { useAuth } from "../context/userContext"
//React-hooks
import { useEffect } from "react"
//React-router-dom
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
//React-hooks-forms
import { useForm } from "react-hook-form"
//Styles
import './styles/formStyle.css'
//Material UI
import {Alert, Button} from '@mui/material'

function MainLogin(){

    useEffect(() => {
        document.title = 'Iniciar Sesión'
    })

    const {isAuthenticated, loginUserApi, errorAuth } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if(isAuthenticated){
            navigate('/manageTasks')
        }
    },[isAuthenticated])

    const { register ,handleSubmit, formState : {errors}} = useForm()


    const onSubmit = (handleSubmit(async(data) => {
        loginUserApi(data)
    }))

    return(
        <div className="containerForm">
            <div className="containerFormLG">
                <h1>
                    INICIAR SESIÓN
                </h1>
                <p>
                    Bienvenido de nuevo, ingresa tu información.
                </p>            

                <form className="formTecnic" onSubmit={onSubmit}>
                    {
                        errorAuth.map((error, i) => {
                            return (
                                <Alert className="errorSubmit" severity="error" key={i}>{error.message}</Alert>
                            )
                        })
                    }
                    <input type="email"
                        {...register('emailUser',{
                            required : true,
                            pattern : {
                                value : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message : 'Ingresa un correo valido, intenta nuevamente.'
                            }
                        })}
                        autoFocus = {true}
                        placeholder="Correo Electrónico"
                    />
                    {
                        errors.emailUser && <Alert severity="error">Ingresa un correo valido, intenta nuevamente.</Alert>
                    }

                    <br />

                    <input type="password" 
                        {...register('passwordUser',{
                            required : true,
                            minLength : 8
                        })}
                        placeholder="Contraseña"
                    /> 
                    {
                        errors.passwordUser && <Alert severity="error">La contraseña debe de tener almenos 8 caracteres.</Alert>
                    }

                    <div className="containerButtonSubmit">
                        <Button 
                            type="submit"
                            variant="contained"
                            className="confirmButtonLG"
                        >
                            Ingresar
                        </Button>
                    </div>

                    <div className="containerGoLG">
                        <Link 
                            to='/registerUser'
                            className="formLink"
                        >
                            No Tienes Cuenta?
                        </Link> 
                    </div>

                </form>
            </div>
        </div>
    )
}

export default MainLogin