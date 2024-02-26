import Link from "next/link"

export function NavbarCliente() {
    return (

        <div>
            <nav className="navbarMain">
                <div className="funcionesPublicas">
                    <div className="logoDiv">
                        <Link href="/"><img src="/images/logoChirris1.png" alt="logoChirris" className="logoChirris" /></Link>
                    </div>
                    <div className="enlaces">
                        <Link href="/cliente">INICIO</Link>
                        <Link href="/cliente/Productos">PRODUCTOS</Link>

                    </div>
                </div>

                <div className="funcionesUsuario">
                    <h3>Bienvenido : [usuario]</h3>

                    <div className="login-Registro">
                        <Link href="./perfil">Perfil</Link>
                        <Link href="./canasta">Canasta</Link>
                        <Link href="/">Cerrar Sesion</Link>
                    </div>
                </div>

            </nav>
        </div>

    )
}