import Link from "next/link"

export function Navbar() {
    return (

        <div>
            <nav className="navbarMain">
                <div className="funcionesPublicas">
                    <div className="logoDiv">
                        <Link href="/"><img src="/images/logoChirris1.png" alt="logoChirris" className="logoChirris" /></Link>
                    </div>
                    <div className="enlaces">
                        <Link href="/">INICIO</Link>
                        <Link href="/Listado">PRODUCTOS</Link>
                        <Link href="/promos">PROMOCIONES</Link>
                        <Link href="/ayuda">AYUDA</Link>

                    </div>
                </div>

                <div className="funcionesUsuario">
                    <h3>¡Disfruta de la experiencia que comparte Chirris House!</h3>

                    <div className="login-Registro">
                        <Link href="/login-registro/Login">Iniciar Sesión</Link>
                        <Link href="/login-registro/Registro">Crear cuenta</Link>
                    </div>
                </div>

            </nav>
        </div>

    )
}