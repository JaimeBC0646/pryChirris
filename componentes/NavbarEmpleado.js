/*HOJA DE ESTILOS: cliente_Index.css */
import Link from "next/link"
export function NavbarEmpleado() {
    return (

        <div>
            <nav className="navbarMain">
                <div className="funcionesPublicas">
                    <div className="logoDiv">
                        <Link href="/"><img src="/images/logoChirris1.png" alt="logoChirris" className="logoChirris" /></Link>
                    </div>
                    <div className="enlaces">
                        {/* <Link href="/empleado">INICIO</Link> */}
                        <Link href="/empleado/Ordenes">ORDENES EN ESPERA</Link>
                        <Link href="/empleado/VentasDelDia">VENTAS DEL DIA</Link>
                        <Link href="/empleado/Productos">PRODUCTOS</Link>
                        <Link href="/empleado/Almacen">ALMACEN</Link>
                    </div>
                </div>

                <div className="funcionesUsuario">
                    <h3>Sesion Activa : [usuario] (rol)</h3>

                    <div className="login-Registro">
                        <Link href="./perfil">Perfil</Link>
                        <Link href="/">Cerrar Sesion</Link>
                    </div>
                </div>

            </nav>
        </div>

    )
}