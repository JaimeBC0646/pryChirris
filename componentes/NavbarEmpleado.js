/*HOJA DE ESTILOS: cliente_Index.css */
export function NavbarEmpleado() {
    return (

        <div>
            <nav className="navbarMain">
                <div className="funcionesPublicas">
                    <div className="logoDiv">
                        <a href="/"><img src="/images/logoChirris1.png" alt="logoChirris" className="logoChirris" /></a>
                    </div>
                    <div className="enlaces">
                        {/* <a href="/empleado">INICIO</a> */}
                        <a href="/empleado/Ordenes">ORDENES EN ESPERA</a>
                        <a href="/empleado/VentasDelDia">VENTAS DEL DIA</a>
                        <a href="/empleado/Productos">PRODUCTOS</a>
                        <a href="/empleado/Almacen">ALMACEN</a>
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