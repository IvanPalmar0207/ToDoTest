//Styles
import './styles/footer.css'
//Icons
import { FaGithub } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";

function Footer(){
    return(
        <footer>
            <div className='aboutNet'>
                <div className='containerAbout'>
                    <h2>
                        Soy Iván David Palmar Martinez
                    </h2>
                    <p>
                        Soy un desarrollador FullStack principalmente enfocado a desarrollar
                        aplicativos web de todo indole, me gusta trabajar bastante por el 
                        apartado del FrontEnd pudiendo manejar todas las diferentes interfaces
                        y el BackEnd es lo que mejor domino teniendo amplio conocimiento en 
                        el manejo logico de los diferentes datos con frameworks para una correcta implementación.
                    </p>
                </div>
                <div className='containerNetW'>
                    <h2>
                        Redes Sociales
                    </h2>
                    <div className='containerInfoFoot'>
                        <a href="https://github.com/IvanPalmar0207" target="_blank" rel="noopener noreferrer">
                            <FaGithub className='iconFoot'/>
                        </a>
                        <a href="https://www.linkedin.com/in/ivan-david-palmar-martinez-b04852256/" target="_blank" rel="noopener noreferrer">
                            <CiLinkedin className='iconFoot'/>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100011862030244" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className='iconFoot'/>
                        </a>
                    </div>
                </div>
            </div>
            <div className='containerCopy'>
                &#169; Creado por Ivan David Palmar Martinez
            </div>
        </footer>
    )
}

export default Footer