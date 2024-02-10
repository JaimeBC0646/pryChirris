
export function Navbar() {
    return (

        <div>
            <nav className="navbarMain">
                <div className="funcionesPublicas">
                    <div className="logoDiv">
                        <a href="/"><img src="/images/logoChirris1.png" alt="logoChirris" className="logoChirris" /></a>
                    </div>
                    <div className="enlaces">
                        <a href="/">INICIO</a>
                        <a href="/Listado">PRODUCTOS</a>
                        <a href="/promos">PROMOCIONES</a>
                        <a href="/ayuda">AYUDA</a>

                    </div>
                </div>

                <div className="funcionesUsuario">
                    <h3>¡Disfruta de la experiencia que comparte Chirris House!</h3>

                    <div className="login-Registro">
                        <a href="/login-registro/Login">Iniciar Sesión</a>
                        <a href="/login-registro/Registro">Crear cuenta</a>
                    </div>
                </div>

            </nav>
        </div>

    )
}