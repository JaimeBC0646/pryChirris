/*HOJA DE ESTILOS: navbar.css */
import Link from "next/link"
import { useState } from "react";
import Image from "next/image"

export function NavbarEmpleado() {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    return (
        <nav className="navbarMain">
            <ul className="contentNavbar">
                <div className="login-Registro">
                    <Link href="#">INICIO</Link>
                </div>
                <li>
                    <div onClick={toggleDropdown} className="dropdown-toggle">
                        GESTIONAR
                        {showDropdown && (
                            <ul className="dropdown-menu">
                                <li><Link href="/empleado/Productos">PRODUCTOS</Link></li>
                                <li><Link href="/empleado/Almacen">ALMACEN</Link></li>
                            </ul>
                        )}
                    </div>
                </li>
                <div className="login-Registro">
                    <li><Link href="/empleado/Ordenes">ORDENES EN ESPERA</Link></li>
                    <li><Link href="/empleado/VentasDelDia">VENTAS DEL DIA</Link></li>
                </div>

            </ul>

            <div className="funcionesUsuario">
                <h3>Sesion Activa : [usuario] (rol)</h3>

                <div className="divFunciones">
                    <Link href="./perfil"><Image src={"/images/icos/perfil.png"} title="Perfil" width={100} height={100} /></Link>
                    <Link href="/"><Image src={"/images/icos/cerrarSesion.png"} title="Cerrar Sesion" width={100} height={100} /></Link>
                </div>
            </div>

        </nav>
    )
}