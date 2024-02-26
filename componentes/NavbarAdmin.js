import Link from "next/link"

export function NavbarAdmin() {
    return (

        <div>
            <nav className="navbarMain">
                <div className="funcionesPublicas">
                    <div className="logoDiv">
                        <Link href="/"><img src="/images/logoChirris1.png" alt="logoChirris" className="logoChirris" /></Link>
                    </div>
                    <div className="enlaces">
                        <Link href="/admin">INICIO</Link>
                        <Link href="/admin/gestionProductos">PRODUCTOS</Link>
                        <Link href="/admin/gestionVentas">VENTAS</Link>
                        <Link href="/admin/gestionEmpleados">EMPLEADOS</Link>

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