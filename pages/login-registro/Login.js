import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ReCAPTCHA from "react-google-recaptcha";
import { siteKey } from './keyCaptcha';



function FormLogin() {
    // ENRUTADOR PARA REDIRIGIR
    const router = useRouter();

    // FUNCIONES PARA LOGIN
    const [usuario, setUsuario] = useState({
        txtIdentidad: "",
        txtPassword: ""
    });

    const [captchaEstado, setCaptchaEstado] = useState(false);

    //Estado y funcion para mostrar/ocultar contraseña
    const [mostrarPass, setMostrarPass] = useState(false);
    const clickMostrarPass = () => {
        setMostrarPass(!mostrarPass);
    };


    /* VALIDACIONES */
    //Autenticacion
    const [mnsjAutenticacion, setMnsjAutenticacion] = useState("");
    //Campos vacios
    const [mnsjCampos, setMnsjCampos] = useState("");
    //CAPTCHA
    const [mnsjCaptcha, setMnsjCaptcha] = useState("");
    //Intentos
    const [mnsjIntentos, setMnsjIntentos] = useState(0);


    const [intentos, setSumaIntentos] = useState(3);
    const [btnEstado, setBtnEstado] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!usuario.txtIdentidad || !usuario.txtPassword) {
            setMnsjCampos("Por favor, completa todos los campos ⚠");
            return;
        }
        else if (captchaEstado == false) {
            setMnsjCaptcha("Por favor, complete el CAPTCHA ⚠");
            return;
        }
        else {
            setMnsjCaptcha("");
            if (intentos == 1) {
                setMnsjIntentos("Ha superado el limite de intentos, intente mas tarde");
                setBtnEstado(true);
                setSumaIntentos(0)
                return;
            }
            else {
                setSumaIntentos(intentos -1)
            }
        }


        try {
            //Enviar por post la accion a realizar dependiendo del formulario
            const result = await axios.post('/api/login-registro?action=login', usuario);

            //console.log(result) //Data en el cliente
            

            if (result) {
                //alert("Rol: "+ result.data)
                switch(result.data){
                    case 1:
                        //Ruta Admin
                        router.push('../admin');
                        break;
                    case 2:
                        //Ruta Empleado
                        router.push('../empleado');
                        break;
                    case 3:
                        //Ruta Cliente
                        router.push('../cliente');
                        break;
                    default:
                        return res.status(405).end();
                }

                //console.log(result[0][0].idUsuario)
                //alert(result[0][0].idUsuario)
                //alert("Logieando...");
                //console.log("Logieando...")
            }
            else{
                setMnsjAutenticacion("Usuario o Contraseña incorrectos ⚠");
            }
        }
        catch (error) {
            console.error("Error login:", error);
            console.log("Error del server")
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
    }



    return (
        <div className="titleMod">
            <h1>INICIO DE SESION</h1>

            <img src="/images/userIcon.png" id="frmLogin" className="icoUser" alt="userImg" />

            <div className="loginForm">
                <form onSubmit={handleSubmit} className="frmLogin">
                    <label htmlFor="lblAutenticacion" id="lblAutenticacion"> Intentos: {intentos}</label>
                    {/*
                    <label htmlFor="lblIdentidad" id="txtWarning" style={{ visibility: formularioValido ? 'hidden' : 'visible' }}>
                        Usuario o Contraseña incorrectos ⚠
                    </label>
                    */}

                    <label htmlFor="lblIdentidad" id="txtWarning" style={{ visibility: mnsjIntentos ? 'visible' : 'hidden' }}>
                        {mnsjIntentos ? mnsjIntentos : ""}
                    </label>


                    <label htmlFor="lblAutenticacion" id="lblAutenticacion" style={{ visibility: mnsjAutenticacion ? 'visible' : 'hidden' }}>
                        {mnsjAutenticacion ? mnsjAutenticacion : ""}
                    </label>

                    <label htmlFor="lblCampos" id="lblCampos" style={{ visibility: mnsjCampos ? 'visible' : 'hidden' }}>
                        {mnsjCampos ? mnsjCampos : ""}
                    </label>
                    <input type="text" name="txtIdentidad" id="txtIdentidad" placeholder="Usuario o correo" title="Usuario o Correo" onChange={handleChange} />


                    <input type={mostrarPass ? "text" : "password"} name="txtPassword" id="txtPassword" placeholder="Contraseña" title="Contraseña" onChange={handleChange} />
                    <button type="button" onClick={clickMostrarPass} className="password-toggle-btn"> <img src={mostrarPass ? "/images/hidePass.png" : "/images/showPass.png"} /> </button>


                    <label htmlFor="lblCampos" id="lblCampos" style={{ visibility: mnsjCaptcha ? 'visible' : 'hidden' }}>
                        {mnsjCaptcha ? mnsjCaptcha : ""}
                    </label>
                    <ReCAPTCHA sitekey={siteKey} onChange={() => setCaptchaEstado(true)} />


                    <button id="btnlogin" disabled={btnEstado}> INICIAR SESION </button>
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