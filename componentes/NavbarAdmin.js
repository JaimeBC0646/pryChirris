import Link from "next/link"
import { useState } from "react";
import Image from "next/image"

export function NavbarAdmin() {
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
                                <li><Link href="/admin/empleados">EMPLEADOS</Link></li>
                                <li><Link href="/admin/info">INFORMACION</Link></li>
                                <li><Link href="/admin/ventas">VENTAS</Link></li>
                            </ul>
                        )}
                    </div>
                </li>

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