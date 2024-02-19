
export function NavbarAdmin() {
    return (

        <div>
            <nav className="navbarMain">
                <div className="funcionesPublicas">
                    <div className="logoDiv">
                        <a href="/"><img src="/images/logoChirris1.png" alt="logoChirris" className="logoChirris" /></a>
                    </div>
                    <div className="enlaces">
                        <a href="/admin">INICIO</a>
                        <a href="/admin/gestionProductos">PRODUCTOS</a>
                        <a href="/admin/gestionVentas">VENTAS</a>
                        <a href="/admin/gestionEmpleados">EMPLEADOS</a>

                    </div>
                </div>

                <div className="funcionesUsuario">
                <h3>Sesion Activa : [usuario] (rol)</h3>

                    <div className="login-Registro">
                        <a href="./perfil">Perfil</a>
                        <a href="/">Cerrar Sesion</a>
                    </div>
                </div>

            </nav>
        </div>

    )
}