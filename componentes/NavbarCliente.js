
export function NavbarCliente() {
    return (

        <div>
            <nav className="navbarMain">
                <div className="funcionesPublicas">
                    <div className="logoDiv">
                        <a href="/"><img src="/images/logoChirris1.png" alt="logoChirris" className="logoChirris" /></a>
                    </div>
                    <div className="enlaces">
                        <a href="/cliente">INICIO</a>
                        <a href="/cliente/Productos">PRODUCTOS</a>

                    </div>
                </div>

                <div className="funcionesUsuario">
                    <h3>Bienvenido : [usuario]</h3>

                    <div className="login-Registro">
                        <a href="./perfil">Perfil</a>
                        <a href="./canasta">Canasta</a>
                        <a href="/">Cerrar Sesion</a>
                    </div>
                </div>

            </nav>
        </div>

    )
}