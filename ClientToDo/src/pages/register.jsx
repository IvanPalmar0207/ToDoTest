//Auth Context
import { useAuth } from "../context/userContext"
//React-hooks
import { useEffect } from "react"
//React-router-dom
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
//React-hook-form
import { useForm } from "react-hook-form"
//Styles
import './styles/formStyle.css'
//Material Ui
import { Alert, Button } from "@mui/material"

function RegisterForm(){

    useEffect(() => {
        document.title = 'Registrarse'
    })

    const {isAuthenticated, errorAuth, registerUserApi} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if(isAuthenticated){
            navigate('/manageTasks')
        }
    },[isAuthenticated])

    const {handleSubmit, register, formState : {errors}} = useForm()

    const onSubmit = handleSubmit(async (data) => {
        registerUserApi(data)
    })

    return(
        <div className="containerFormRegister">
            <div className="containerFormLG">
                <h1>
                    Registrate
                </h1>
                <p>
                    Bienvenido nuevo usuario, ingresa tus datos.
                </p>

                <form className="formTecnic" onSubmit={onSubmit}>
                    {
                        errorAuth.map((error, i) => {
                            return(
                                <Alert className="errorSubmit" key={i} severity="error">{error.message}</Alert>
                            )
                        })
                    }

                    <input type="text" 
                    {...register('fullName',{
                        required : true,
                        minLength : 8
                    })}
                    placeholder = "Nombre Completo"
                    autoFocus = {true}
                    />
                    {
                        errors.fullName && <Alert severity="error">El nombre completo debe de tener almenos 8 caracteres.</Alert>
                    }

                    <br />

                    <input type="text"
                    {...register('cellPhone',{
                        required : true,
                        minLength : 10,
                        maxLength : 10
                    })}
                    placeholder="Número de Telefono"
                    />
                    {
                        errors.cellPhone && <Alert severity="error">El número de telefono debe de tener 10 caracteres.</Alert>
                    }

                    <br />

                    <input type="email"
                    {...register('emailUser',{
                        required : true,
                        pattern : {
                            value : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message : 'Ingresa un correo valido, intenta nuevamente.'
                        }
                    })}
                    placeholder="Correo Electrónico"
                    />
                    {
                        errors.emailUser && <Alert severity="error">Ingresa un correo valido, intenta nuevamente.</Alert>
                    }

                    <br />

                    <input type="password"
                        {...register('passwordUser',{
                            required: true,
                            minLength : 8
                        })}
                        placeholder="Contraseña"
                    />
                    {
                        errors.passwordUser && <Alert severity="error">La contraseña debe tener minimo 8 caracteres.</Alert>
                    }

                    <div className="containerButtonSubmit">
                        <Button
                            type="submit"
                            variant="contained"
                            className="confirmButtonLG"
                        >
                            Registrarse
                        </Button>
                    </div>

                    <div className="containerGoLG">
                        <Link 
                            to='/'
                            className="formLink"
                        >
                            Ya tienes cuenta?
                        </Link>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default RegisterForm