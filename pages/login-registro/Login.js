import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ReCAPTCHA from "react-google-recaptcha";
import { siteKey } from './keyCaptcha';
import Link from 'next/link';
import Image from 'next/image';
import { APP_CLIENT_INTERNALS } from 'next/dist/shared/lib/constants';



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
    const [intentos, setSumaIntentos] = useState(3);
    const [mnsjIntentos, setMnsjIntentos] = useState(0);
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
                setMnsjIntentos("Ha superado el limite de intentos, su cuenta ha sido bloqueada.\n Contacte con atencion al cliente para poder reactivar su cuenta ⚠");
                alert("bloquiando")
                try {
                    await axios.post('/api/login-registro?action=bloquearCuenta', usuario);
                }
                catch (error) {
                    console.error("Error al bloquear:", error);
                }
                setBtnEstado(true);
                setSumaIntentos(0);
                return;
            }
            else {
                try {
                    const resultUser = await axios.post('/api/login-registro?action=usuarioL', usuario);
                    //console.log("result: ", resultUser)
                    //console.log("length: ", resultUser.data.length)

                    if (resultUser.data.length > 0) {
                        try {
                            const resultLogin = await axios.post('/api/login-registro?action=login', usuario);
                            console.log(resultLogin);
                            //console.log("resultLogin.lenght : ", resultLogin.data.length);
                            //console.log("resultLogin.lengh[0]t : ", resultLogin.data[0].length);

                            if (resultLogin.data.length && resultLogin.data[0].length > 0){
                                if(resultLogin.data[0][0].intEstadoCuenta === 0){
                                    setMnsjAutenticacion("Esta cuenta se encuentra bloqueada, intente desbloquearla o contacte con servicio al cliente si desconoce el motivo ⚠");
                                    
                                }
                                else{
                                    //alert("Redirigiendo")
                                    const rol = resultLogin.data[0][0].idRol;
                                    //alert("rol: " + rol)
                                    
                                    
                                    switch (rol) {
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
                                    
                                }
                                
                            }
                            else{
                                setMnsjAutenticacion("Credenciales incorrectos ⚠");
                                setSumaIntentos(intentos - 1)
                            }

                        }
                        catch (err) {
                            // Contraseña incorrecta
                                console.error("Error login:", err);
                        }


                    }
                    else{
                        setMnsjAutenticacion("Usuario no registrado ⚠");
                    }


                }
                catch (error) {
                    console.error("Error del server:", error);
                }
            }

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

            <Image src="/images/userIcon.png" id="frmLogin" className="icoUser" alt="userImg" width={100} height={100} />

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
                    <button type="button" onClick={clickMostrarPass} className="password-toggle-btn"> <Image src={mostrarPass ? "/images/hidePass.png" : "/images/showPass.png"} alt="icoPass" width={100} height={100} /> </button>


                    <label htmlFor="lblCampos" id="lblCampos" style={{ visibility: mnsjCaptcha ? 'visible' : 'hidden' }}>
                        {mnsjCaptcha ? mnsjCaptcha : ""}
                    </label>
                    <ReCAPTCHA sitekey={siteKey} onChange={() => setCaptchaEstado(true)} />


                    <button id="btnlogin" disabled={btnEstado}> INICIAR SESION </button>
                </form>

                <div className="homeLink">
                    <Link href="./RecuperarContrasena">Olvidaste tu contraseña?</Link>
                    <Link href="./RecuperarCuenta">Tu cuenta esta bloqueada?</Link>
                    <Link href="./Registro">Aun no tienes cuenta? Crear cuenta</Link>
                    <Link href="/">
                        <Image src="/images/homeIco.png" alt="homeIco" className="homeIco" width={100} height={100} />
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FormLogin;