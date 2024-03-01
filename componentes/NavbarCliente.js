import Link from "next/link"
import { useState } from "react";
import Image from "next/image";

export function NavbarCliente() {
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
                        PRODUCTOS
                        {showDropdown && (
                            <ul className="dropdown-menu">
                                <li><Link href="#">TODO</Link></li>
                                <li><Link href="#">BEBIDAS</Link></li>
                                <li><Link href="#">POSTRES</Link></li>
                            </ul>
                        )}
                    </div>
                </li>

            </ul>

            <div className="funcionesUsuario">
                <h3>Bienvenido : [usuario]</h3>

                <div className="divFunciones">
                    <Link href="./perfil"><Image src={"/images/icos/perfil.png"} title="Ir a perfil" width={100} height={100} /></Link>
                </div>
                <div className="divFunciones">
                    <Link href="./canasta"><Image src={"/images/icos/canasta.png"} title="Ir a canasta" width={100} height={100} /></Link>
                </div>
                <div className="divFunciones">
                    <Link href="/"><Image src={"/images/icos/cerrarSesion.png"} title="Cerrar sesion" width={100} height={100} /></Link>
                </div>
            </div>
        </nav>
    )
}
