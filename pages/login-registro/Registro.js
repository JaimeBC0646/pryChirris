import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ReCAPTCHA from "react-google-recaptcha";
import { siteKey } from './keyCaptcha';


export function FormRegistro() {
    const router = useRouter();

    const [usuario, setUsuario] = useState({
        txtNombre: "",
        txtApepat: "",
        txtApemat: "",
        txtFechaNacimiento: "",
        txtUsuario: "",
        txtTelefono: "",

        txtCorreo: "",
        txtPassword: "",
        txtConfirmaPassword: "",
        rdbSexo: "",
        txtPreguntaSecreta: "",
        txtRespuestaSecreta: "",
    });

    /* MENSAJES DE VALIDACIONES */
    //Campo vacio
    const [mnsjCampos, setMnsjCampos] = useState("");

    //Validacion para c/campo:
    const [mnsjNombre, setMnsjNombre] = useState("");
    const [mnsjFechaNacimiento, setMnsjFechaNacimiento] = useState("");
    const [mnsjUsuario, setMnsjUsuario] = useState("");
    const [mnsjTelefono, setMnsjTelefono] = useState("");
    const [mnsjCorreo, setMnsjCorreo] = useState("");
    const [mnsjReglasPass, setMnsjReglasPass] = useState("");
    const [mnsjConfirmaPass, setMnsjConfirmaPass] = useState("");
    const [mnsjSexo, setMnsjSexo] = useState("");
    const [mnsjPregunta, setMnsjPregunta] = useState("");
    const [mnsjRespuesta, setMnsjRespuesta] = useState("");


    const [mnsjCaptcha, setMnsjCaptcha] = useState("");
    const [btnEstado, setBtnEstado] = useState(false);
    const [estadoPregunta, setEstadoPregunta] = useState(true);
    //const [mnsj, setMnsj = useState("");

    const [captchaEstado, setCaptchaEstado] = useState(false);
    const [formValido, setFormEstado] = useState(0);


    const handleSubmit = async (e) => {
        e.preventDefault();

        /* VALIDACIONES EN EL SUBMIT */

        /*
        AJUSTAR ALGUNAS VALIDACIONES EN "HandleChange" PARA COMPROBAR VALIDACIONES EN TIEMPO REAL
        ACTUALMENTE SE DEBE PRECIONAR EL BOTON DE REGISTRO PARA VALIDAR 1 PRIMERA OCASION, SI TODO ESTA VALIDADO:
            +NO HAY MENSAJES DE ERROR
            +EL ESTADO DEL FORMULARIO PASA A SER VALIDO
            +SE DEBE PULSAR DE NUEVO EL BOTON PARA PROCEDER EL REGISTRO
         */


        //Campos vacios
        if (!usuario.txtNombre || !usuario.txtApepat || !usuario.txtApemat || !usuario.txtUsuario ||
            !usuario.txtTelefono || !usuario.txtCorreo || !usuario.txtPassword ||
            !usuario.txtConfirmaPassword) {
            setMnsjCampos("Llenar todos los campos");
            //Al clickear una 1era vez deshabilita el boton en caso de que falten campos por llenar
            setBtnEstado(true);
            setFormEstado(0);
            return;
        }

        /*Solo letras en nombre completo*/
        const regexLetras = /^[a-zA-Z\s]*$/;
        if (!regexLetras.test(usuario.txtNombre) || !regexLetras.test(usuario.txtApepat) || !regexLetras.test(usuario.txtApemat)) {
            setMnsjNombre("El nombre y los apellidos solo debe contener letras y sin espacios ⚠");
            setFormEstado(0);
            setBtnEstado(true);
        } else {
            setMnsjNombre("");
            setFormEstado(1);
        }


        /*Seleccionar Fecha de nacimiento*/
        if (!usuario.txtFechaNacimiento) {
            setMnsjFechaNacimiento("Porfavor seleccione su fecha de nacimiento ⚠");
            setFormEstado(0);
            setBtnEstado(true);
            return;
        } else {
            setMnsjFechaNacimiento("");
            setFormEstado(1);
        }


        /* Usuario distinto de los existentes en BD */
        try {
            if (usuario.txtUsuario) {
                //console.log("txtU: " + usuario.txtUsuario)
                const result = await axios.post('/api/login-registro?action=usuario', { txtUsuario: usuario.txtUsuario }); // Pasar el valor del campo txtUsuario
                //console.log(result.data);

                //result && Object.keys(result).length > 0
                //result && Array.isArray(result.data) && result.length > 0
                if (result.data == "no") {
                    setMnsjUsuario("El nombre de usuario ya está en uso");
                    setFormEstado(0);
                    return;
                    //console.log("Objkeys.r: ",Object.keys(result.length));
                    //setBtnEstado(true); // Deshabilita el botón si se encuentra un usuario
                }
                else {
                    setMnsjUsuario("");
                    setFormEstado(1);
                }
            }
        } catch (error) {
            setMnsjUsuario("");
            setBtnEstado(false); // Habilita el botón si no se encuentra un usuario
            console.error("Error al buscar usuario:", error);
        }


        /*Solo numeros en numero de telefono*/
        const regexNumeros = /^\d+$/;
        if (usuario.txtTelefono) {
            if (!regexNumeros.test(usuario.txtTelefono)) {
                setMnsjTelefono("Solo numeros de telefono valido (10 digitos) ⚠");
                setFormEstado(0);
                setBtnEstado(true);
                return;
            } else {
                setMnsjTelefono("");
                setFormEstado(1);
            }
        }


        /* Correo distinto de los existentes en BD */
        try {
            if (usuario.txtCorreo) {
                //console.log("txtC: " + usuario.txtCorreo)
                const result = await axios.post('/api/login-registro?action=correo', { txtCorreo: usuario.txtCorreo }); // Pasar el valor del campo txtUsuario

                if (result.data == "no") {
                    setMnsjCorreo("El correo ya posee a una cuenta existente");
                    setFormEstado(0);
                    return;
                }
                else {
                    setMnsjCorreo("");
                    setFormEstado(1);
                }
            }

        } catch (error) {
            setMnsjUsuario("");
            setBtnEstado(false); // Habilita el botón si no se encuentra un usuario
            console.error("Error al buscar correo:", error);
        }


        /*Reglas de contraseña*/
        const regexPassRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$\-+_*/':;!¡?¿]).{8,}$/;
        if (usuario.txtPassword) {
            if (!regexPassRule.test(usuario.txtPassword)) {
                setMnsjReglasPass("Reglas de Contraseña ⚠  ● Minimo 8 caracteres ⓘ \n"
                    + "● Al menos una letra mayúscula ⓘ \n"
                    + "● Al menos una letra minucula ⓘ \n"
                    + "● Al menos un dígito ⓘ \n"
                    + "● No espacios en blanco ⓘ \n"
                    + "● Al menos 1 caracter especial ⓘ \n");
                setFormEstado(0);
                setBtnEstado(true);
            } else {
                setMnsjReglasPass("");
                setFormEstado(1);
            }
        }


        /*Confirmacion de contraseña*/
        if ((usuario.txtConfirmaPassword && usuario.txtPassword) && (usuario.txtConfirmaPassword != usuario.txtPassword)) {
            setMnsjConfirmaPass("Las contraseñas no coinciden ⚠");
            setFormEstado(0);
            return;
        }
        else {
            setMnsjConfirmaPass("");
            setFormEstado(1);
        }


        /*Seleccion de radioboton sexo*/
        if (!usuario.rdbSexo) {
            setMnsjSexo("Debe elegir una casilla ⚠");
            setFormEstado(0);
            return;
        }
        else {
            setMnsjSexo("");
            setFormEstado(1);
        }


        /*Seleccion de pregunta secreta*/
        if (usuario.txtPreguntaSecreta == "") {
            setMnsjPregunta("Debe elegir una pregunta ⚠");
            setFormEstado(0);
            return;
        }
        else {
            setMnsjPregunta("");
            setFormEstado(1);
        }

        /*Respuesta secreta*/
        if (!usuario.txtRespuestaSecreta) {
            setMnsjRespuesta("Debe colocar una respuesta ⚠");
            setFormEstado(0);
            return;
        }
        else {
            setMnsjRespuesta("");
            setFormEstado(1);
        }


        /*
                if (captchaEstado == false) {
                    setMnsjCaptcha("Por favor, complete el CAPTCHA ⚠");
                    return;
                }
                else{
                    setMnsjCaptcha("");
                }
        */



        //SUBMIT DEL FORM (Registro)
        if (formValido == 1) {
            try {
                const result = await axios.post('/api/login-registro?action=registro', usuario);

                if (result) {
                    //alert("USER EXIST: "+result.data.vchUsuario)
                    alert("Enviando codigo al correo...")
                    router.push({
                        //Ruta a donde redirecciona
                        pathname: './AltaRegistro',
                        //paso el id recuperado de la API
                        query: { usuarioNuevo: usuario.txtUsuario }
                    });
                }
            }
            catch (error) {
                //toast.error("Por favor no deje campos vacios y que correspondan al tipo de dato");
                console.log("No se ha podido completar el registro");
                console.error("Error registro:", error);
            }
        }

    };

    const handleChange = async ({ target: { name, value } }) => {
        setMnsjCampos(""); //Resetea el mensaje de campos vacios
        setUsuario({ ...usuario, [name]: value })
        console.log(name + " =  " + value);
        //console.log("Estado form: "+formValido);

        /*Campos vacios*/
        if (usuario.txtNombre || usuario.txtApepat || usuario.txtApemat || usuario.txtUsuario ||
            usuario.txtTelefono || usuario.txtCorreo || usuario.txtPassword ||
            usuario.txtConfirmaPassword) {
            setBtnEstado(false); // Habilita el botón si todos los campos están llenos
        }
        // else {setBtnEstado(true);// Deshabilita el botón si algún campo está vacío}

        /* console.log() */
        //console.log("Fecha Nac: "+usuario.txtFechaNacimiento);
        //console.log("Sexo: " + usuario.rdbSexo);
        //console.log("Token: "+token);
        //console.log("Value Pregunta: " +usuario.txtPreguntaSecreta);

        /*Seleccion de pregunta secreta*/
        if (usuario.txtPreguntaSecreta != "0") {
            setEstadoPregunta(false);
        }
        else {
            setEstadoPregunta(true);
        }
    };







    return (
        <div className="titleMod">
            <h1>REGISTRO</h1>

            <form onSubmit={handleSubmit} className="frmRegistro">
                {/* Campos Vacios */}
                <label htmlFor="lblCampos" id="lblCampos" style={{ visibility: mnsjCampos ? 'visible' : 'hidden' }}>
                    {mnsjCampos ? mnsjCampos : ""}
                </label>

                <div className="divForm">
                    <div className="formInputs">

                        {/* Campo Nombre */}
                        <label id="lblAdvertencias" style={{ visibility: mnsjNombre ? 'visible' : 'hidden' }}>
                            {mnsjNombre ? mnsjNombre : ""}
                        </label>
                        <input type="text" name="txtNombre" id="txtNombre" placeholder="Nombre (s)" minLength="3" onChange={handleChange} />



                        {/* Campo Apepat */}
                        <label id="lblAdvertencias"> </label>
                        <input type="text" name="txtApepat" id="txtApepat" placeholder="Apellido Paterno" onChange={handleChange} />



                        {/* Campo Apemat */}
                        <label id="lblAdvertencias"> </label>
                        <input type="text" name="txtApemat" id="txtApemat" placeholder="Apellido Materno" onChange={handleChange} />


                        {/* Campo Fecha de nacimiento */}
                        <label id="lblAdvertencias" style={{ visibility: mnsjFechaNacimiento ? 'visible' : 'hidden' }}>
                            {mnsjFechaNacimiento ? mnsjFechaNacimiento : ""}
                        </label>
                        <input type="date" name="txtFechaNacimiento" id="txtFechaNacimiento" onChange={handleChange} />



                        {/* Campo Usuario */}
                        <label id="lblAdvertencias" style={{ visibility: mnsjUsuario ? 'visible' : 'hidden' }}>
                            {mnsjUsuario ? mnsjUsuario : ""}
                        </label>
                        <input type="text" name="txtUsuario" id="txtUsuario" placeholder="Nombre de Usuario" minLength="5" onChange={handleChange} />



                        {/* Campo Telefono */}
                        <label id="lblAdvertencias" style={{ visibility: mnsjTelefono ? 'visible' : 'hidden' }}>
                            {mnsjTelefono ? mnsjTelefono : ""}
                        </label>
                        <input type="text" name="txtTelefono" id="txtTelefono" placeholder="No. de Telefono" minLength="10" maxLength="10" onChange={handleChange} />

                    </div>

                    <div className="formInputs">

                        {/* Campo Correo */}
                        <label id="lblAdvertencias" style={{ visibility: mnsjCorreo ? 'visible' : 'hidden' }}>
                            {mnsjCorreo ? mnsjCorreo : ""}
                        </label>
                        <input type="email" name="txtCorreo" id="txtCorreo" placeholder="Correo" onChange={handleChange} />



                        {/* Campo Contraseña*/}
                        <label id="lblAdvertencias" style={{ visibility: mnsjReglasPass ? 'visible' : 'hidden' }}>
                            {mnsjReglasPass ? mnsjReglasPass : ""}
                        </label>
                        <input type="password" name="txtPassword" id="txtPassword" placeholder="Contraseña" minLength="8" onChange={handleChange} />



                        {/* Campo Confimra Contraseña*/}
                        <label id="lblAdvertencias" style={{ visibility: mnsjConfirmaPass ? 'visible' : 'hidden' }}>
                            {mnsjConfirmaPass ? mnsjConfirmaPass : ""}
                        </label>
                        <input type="password" name="txtConfirmaPassword" id="txtConfirmaPassword"
                            placeholder="Confirmar contraseña" title="La contraseña debe ser igual al campo anterior" onChange={handleChange} />

                        {/* Campo Sexo*/}
                        <label id="lblAdvertencias" style={{ visibility: mnsjSexo ? 'visible' : 'hidden' }}>
                            {mnsjSexo ? mnsjSexo : ""}

                        </label>
                        <div className="divSexSelect">
                            <div className="rdbOption">
                                <input type="radio" id="rdbHombre" name="rdbSexo" value="h" onChange={handleChange} />
                                <label className="rdb">Hombre</label>
                            </div>

                            <div className="rdbOption">
                                <input type="radio" id="rdbMujer" name="rdbSexo" value="m" onChange={handleChange} />
                                <label className="rdb">Mujer</label>
                            </div>

                            <div className="rdbOption">
                                <input type="radio" id="rdbOtro" name="rdbSexo" value="o" onChange={handleChange} />
                                <label className="rdb">Otro</label>
                            </div>
                        </div>



                        {/* Campo Pregunta secreta */}
                        <label id="lblAdvertencias" style={{ visibility: mnsjPregunta ? 'visible' : 'hidden' }}>
                            {mnsjPregunta ? mnsjPregunta : ""}
                        </label>
                        <select name="txtPreguntaSecreta" id="txtPreguntaSecreta" onChange={handleChange} >
                            <option value="0">--| Seleccione una pregunta |--</option>
                            <option value="1">¿Cual es tu color favorito?</option>
                            <option value="2">¿Cual es tu comida favorita?</option>
                            <option value="3">¿Cual es el nombre de mascota?</option>
                        </select>



                        {/* Campo Respuesta secreta */}
                        <label id="lblAdvertencias" style={{ visibility: mnsjRespuesta ? 'visible' : 'hidden' }}>
                            {mnsjRespuesta ? mnsjRespuesta : ""}
                        </label>
                        <input type="varchar" name="txtRespuestaSecreta" id="txtRespuestaSecreta" placeholder="Respuesta secreta" onChange={handleChange} disabled={estadoPregunta} />


                    </div>
                </div>

                <p>
                    Al hacer clic en Registrarte, aceptas las Condiciones, la Política de privacidad y la Política de cookies.
                </p>

                {/* 
                <label htmlFor="lblCampos" id="lblCampos" style={{ visibility: mnsjCaptcha ? 'visible' : 'hidden' }}>
                    {mnsjCaptcha ? mnsjCaptcha : ""}
                </label>

                <ReCAPTCHA sitekey={siteKey} onChange={() => setCaptchaEstado(true)} />
                */}


                <button type="submit" id="btnRegistro" >REGISTRARSE</button>
                {/*disabled={btnEstado} */}

            </form>

            <div className="homeLink">
                <a href="./Login" className='aLogin'>Ya tienes cuenta? Iniciar sesión</a>
                <a href="/">
                    <img src="/images/homeIco.png" alt="homeIco" className="homeIco" />
                    Volver al Inicio
                </a>
            </div>

        </div>
    )
}
export default FormRegistro;