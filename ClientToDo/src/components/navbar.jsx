//Styles
import './styles/navbar.css'
//AuthContext
import { useAuth } from '../context/userContext'
//Images
import logoTD from './img/logoTD.png'
//React-router-dom
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
//SweetAlert
import Swal from 'sweetalert2'

function NavBar(){

    const {isAuthenticated, user, logoutUserApi} = useAuth()

    const navigate = useNavigate()

    return(
        <header>
            <div className='containerLogo'>
                <img src={logoTD} alt="Logo ToDo" />
            </div>
            {isAuthenticated ? 
            <nav className='containerNav'>
                <ul>
                    <li>
                        <Link className='firstOption'>
                           {user.fullName.split(' ')[0]}
                        </Link>
                    </li>
                    <li>
                        <Link className='exitOption' onClick={() => {
                            const logUser = Swal.mixin({

                            })

                            logUser.fire({
                                title : 'Cerrar Sesión',
                                text : 'Estas seguro que deseas cerrar sesión?',
                                icon : 'info',
                                showCancelButton : true,
                                confirmButtonText : 'Si, cerrar',
                                confirmButtonColor : '#3ed634',
                                cancelButtonText : 'Cancelar',
                                cancelButtonColor : '#ff2d2d'
                            }).then((result) => {
                                if(result.isConfirmed){
                                    logoutUserApi()
                                    navigate('/')
                                }
                                else if(result.dismiss === Swal.DismissReason.cancel){
                                    logUser.fire({
                                        title : 'Operación Cancelada',
                                        text : 'No se cerrar la sesión, gracias.',
                                        icon : 'info',
                                        confirmButtonColor : '#3ed634',
                                        confirmButtonText : 'Volver'
                                    })
                                }
                            })

                        }}  >
                            Salir
                        </Link>
                    </li>
                </ul>
            </nav>
            :
            <nav className='containerNav'>
                <ul>
                    <li>
                        <Link to="/" className='firstOption'>
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/registerUser" className='optionMain'>
                            Empezar
                        </Link>
                    </li>
                </ul>
            </nav>
            }
        </header>
    )
}

export default NavBar