import Link from "next/link"
import { useState } from "react";
import Image from "next/image";

export function Navbar() {
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
                <div className="login-Registro">
                    <Link href="#">AYUDA</Link>
                </div>

            </ul>

            <div className="funcionesUsuario">
                <div className="login-Registro">
                    <Link href="/login-registro/Login">INICIAR SESION</Link>
                    <Link href="/login-registro/Registro">CREAR CUENTA</Link>
                </div>
            </div>
        </nav>
    )
}