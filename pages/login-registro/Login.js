import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';



function FormLogin() {
    // ENRUTADOR PARA REDIRIGIR
    const router = useRouter();

    // FUNCIONES PARA LOGIN
    const [usuario, setUsuario] = useState({
        txtIdentidad: "",
        txtPassword: ""
    });


    /* VALIDACIONES */
    //Autenticacion
    const [mnsjAutenticacion, setMnsjAutenticacion] = useState("");
    //Campos vacios
    const [mnsjCampos, setMnsjCampos] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usuario.txtIdentidad || !usuario.txtPassword) {
            setMnsjCampos("Por favor, completa todos los campos ⚠");
            return;
        }

        try {
            //Enviar por post la accion a realizar dependiendo del formulario
            const result = await axios.post('/api/login-registro?action=login', usuario);

            if (result) {
                console.log(result.data)
                //alert("Logieando...");
                //console.log("Logieando...")
                router.push('../Listado');
            }
        }
        catch (error) {
            console.error("Error login:", error);
            setMnsjAutenticacion("Usuario o Contraseña incorrectos ⚠");
            //alert("Usuario no encontrado");
        }
    };

    const handleChange = ({ target: { name, value } }) => {
        //setUsuario(prevUsuario => ({ ...usuario, [name]: value }));
        setUsuario({ ...usuario, [name]: value })
        if (value.trim() !== "") {
            setMnsjAutenticacion("");
            setMnsjCampos("");
        }
        //console.log(router.pathname)
        //console.log(name + " =  " + value);
    }

    

    return (
        <div className="titleMod">
            <h1>INICIO DE SESION</h1>

            <img src="/images/userIcon.png" id="frmLogin" className="icoUser" alt="userImg" />

            <div className="loginForm">
                <form onSubmit={handleSubmit} className="frmLogin">
                    {/*
                    <label htmlFor="lblIdentidad" id="txtWarning" style={{ visibility: formularioValido ? 'hidden' : 'visible' }}>
                        Usuario o Contraseña incorrectos ⚠
                    </label>
                    */}
                    <label htmlFor="lblAutenticacion" id="lblAutenticacion" style={{ visibility: mnsjAutenticacion ? 'visible' : 'hidden' }}>
                        {mnsjAutenticacion ? mnsjAutenticacion : ""}
                    </label>

                    <label htmlFor="lblCampos" id="lblCampos" style={{ visibility: mnsjCampos ? 'visible' : 'hidden' }}>
                        {mnsjCampos ? mnsjCampos : ""}
                    </label>

                    <input type="text" name="txtIdentidad" id="txtIdentidad" placeholder="Usuario o correo" title="Usuario o Correo" onChange={handleChange} />

                    <input type="password" name="txtPassword" id="txtPassword" placeholder="Contraseña" title="Contraseña" onChange={handleChange} />

                    <button id="btnlogin"> INICIAR SESION </button>
                </form>

                <div className="homeLink">
                    <a href="./RecuperarContrasena">Olvidaste tu contraseña?</a>
                    <a href="./Registro">Aun no tienes cuenta? Crear cuenta</a>
                    <a href="/">
                        <img src="/images/homeIco.png" alt="homeIco" className="homeIco" />
                        Volver al Inicio
                    </a>
                </div>
            </div>
        </div>
    )
}

export default FormLogin;