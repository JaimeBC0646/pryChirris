import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';


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

        rdbTyC: "",
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
    const [mnsjTyC, setMnsjTyC] = useState("");


    const [btnEstado, setBtnEstado] = useState(false);
    const [estadoPregunta, setEstadoPregunta] = useState(true);
    //const [mnsj, setMnsj = useState("");

    //Estado y funcion para mostrar/ocultar contraseña
    const [mostrarPass, setMostrarPass] = useState(false);
    const clickMostrarPass = () => {
        setMostrarPass(!mostrarPass);
    };


    const [mostrarConfirmaPass, setMostrarConfirmaPass] = useState(false);
    const clickMostrarConfirmaPass = () => {
        setMostrarConfirmaPass(!mostrarConfirmaPass);
    };



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
                const result = await axios.post('/api/login-registro?action=usuarioR', { txtUsuario: usuario.txtUsuario }); // Pasar el valor del campo txtUsuario
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


        //Si esta comentado, es para no gastar peticiones
        /*Solo numeros en numero de telefono*/
        const regexNumeros = /^\d+$/;
        if (usuario.txtTelefono) {
            if (!regexNumeros.test(usuario.txtTelefono)) {
                setMnsjTelefono("Solo numeros de telefono valido (10 digitos) ⚠");
                setFormEstado(0);
                return;
            } else {
                setMnsjTelefono("");
                try {
                    //NumLookApi (Gasta peticiones)
                    //const apiKeyTelefono = "num_live_jGsgTjnWgHk75B0tp2kfz4pM3criXpBZ5VsAJzgh";
                    //const telefono = usuario.txtTelefono;
                    //const response = await axios.get("https://api.numlookupapi.com/v1/validate/+52"+telefono+"?apikey="+apiKeyTelefono);
                    

                    //AbstractApi (Gratis)
                    const apiKeyTelefono = "59fa5c57b4f149ac8ab0ecdbe167c0e6";
                    const telefono = usuario.txtTelefono;
                    const response = await axios.get("https://phonevalidation.abstractapi.com/v1/?api_key=" + apiKeyTelefono + "&phone=52" + telefono);


                    console.log(response.data) //Array con datos de API
                    //console.log(response.data.valid) //Accede al dato valid (para saber si el numero es real ¿?)


                    const numReal = response.data.valid;
                    if (!numReal) {
                        setMnsjTelefono("Introduzca un numero de telefono valido ⚠");
                        setFormEstado(0);
                        return;
                    }
                    else {
                        setMnsjTelefono("");
                        setFormEstado(1);
                    }

                } catch (error) {
                    console.error('Error al validar el número de teléfono:', error);
                    throw error;
                }
            }
        }
        


        /*Si esta comentado, es para no gastar peticiones*/
        /* Correo distinto de los existentes en BD */
        try {
            if (usuario.txtCorreo) {
                //console.log("txtC: " + usuario.txtCorreo)
                const apiKeyCorreo = "a8e3bf7201ed4734b83c11f0b4017607";
                const correo = usuario.txtCorreo;
                const response = await axios.get("https://emailvalidation.abstractapi.com/v1/?api_key=" + apiKeyCorreo + "&email=" + correo);
                //console.log("response Correo", response)

                if (response.data.deliverability === "DELIVERABLE" && response.data.is_smtp_valid.value === true) {
                    //alert("Valido SI")
                    const result = await axios.post('/api/login-registro?action=correo', { txtCorreo: usuario.txtCorreo }); // Pasar el valor del campo txtUsuario

                    if (result.data == "no") {
                        setMnsjCorreo("El correo ya posee a una cuenta existente ⚠");
                        setFormEstado(0);
                        return;
                    }
                    else {
                        setMnsjCorreo("");
                        setFormEstado(1);
                    }
                }
                else {
                    //alert("Invalido NO")
                    setMnsjCorreo("Porfavor coloque un correo valido ⚠");
                    setFormEstado(0);
                    return;
                }
            }
        } catch (error) {
            setMnsjCorreo("");
            setBtnEstado(false); // Habilita el botón si no se encuentra un usuario
            console.error("Error al buscar correo:", error);
        }
        


        /*Reglas de contraseña*/
        try {
            if (usuario.txtPassword) {
                //console.log("txtC: " + usuario.txtCorreo)
                const result = await axios.post('/api/login-registro?action=verificaPass', { txtPassword: usuario.txtPassword });
                //console.log("result cliente: ",result)

                if (result.data == "no") {
                    setMnsjReglasPass("La contraseña es muy debil, introduzca otra respetando las reglas para contraseña ⚠");
                    setFormEstado(0);
                    return;
                }
                else {
                    const regexPassRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$\-+_*/':;!¡?¿]).{8,}$/;
                    if (!regexPassRule.test(usuario.txtPassword)) {
                        setMnsjReglasPass("Reglas de Contraseña ⚠  <br></br>● Minimo 8 caracteres ⓘ "
                            + "\n● Al menos una letra mayúscula ⓘ "
                            + "\n● Al menos una letra minucula ⓘ "
                            + "\n● Al menos un dígito ⓘ "
                            + "\n● No espacios en blanco ⓘ "
                            + "\n● Al menos 1 caracter especial ⓘ ");
                        setFormEstado(0);
                        setBtnEstado(true);
                        return;
                    } else {
                        setMnsjReglasPass("");
                        setFormEstado(1);
                    }
                }

            }
        } catch (error) {
            setMnsjCorreo("");
            setBtnEstado(false); // Habilita el botón si no se encuentra un usuario
            console.error("Error al buscar contraseña:", error);
        }

        /*
        if (usuario.txtPassword) {
            if (!regexPassRule.test(usuario.txtPassword)) {
                setMnsjReglasPass("Reglas de Contraseña ⚠  \n● Minimo 8 caracteres ⓘ "
                    + "\n● Al menos una letra mayúscula ⓘ "
                    + "\n● Al menos una letra minucula ⓘ "
                    + "\n● Al menos un dígito ⓘ "
                    + "\n● No espacios en blanco ⓘ "
                    + "\n● Al menos 1 caracter especial ⓘ ");
                setFormEstado(0);
                setBtnEstado(true);
            } else {
                setMnsjReglasPass("");
                setFormEstado(1);
            }
        }
*/

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



        /*Seleccion de radioboton sexo*/
        if (usuario.rdbTyC != "1") {
            setMnsjTyC("Debe aceptar nuestros terminos y condiciones para registrarse ⚠");
            setFormEstado(0);
            return;
        }
        else {
            setMnsjTyC("");
            setFormEstado(1);
        }



        //SUBMIT DEL FORM (Registro)
        if (formValido == 1) {
            try {
                const result = await axios.post('/api/login-registro?action=registro', usuario);

                if (result) {
                    console.log("idU: ", result.data[0][0].idUsuario);
                    const idRU = result.data[0][0].idUsuario;

                    //alert("Enviando codigo al correo...")

                    router.push({
                        //Ruta a donde redirecciona
                        pathname: './AltaRegistro',
                        //paso el id recuperado de la API
                        query: { id: idRU, usuarioNuevo: usuario.txtUsuario }
                    });
                }
            }
            catch (error) {
                if (error.response) {
                    alert("no se puede")
                }
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

        const regexPassRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$\-+_*/':;!¡?¿]).{8,}$/;
        if (regexPassRule.test(usuario.txtPassword)) {
            setMnsjReglasPass("");
        }

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
            <div className="divContentFrmR">
                <h2>REGISTRO</h2>
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

                            <div className="divPassR">
                                <input type={mostrarPass ? "text" : "password"} name="txtPassword" id="txtPassword" placeholder="Contraseña" title="Contraseña" onChange={handleChange} />
                                <Image onClick={clickMostrarPass} src={mostrarPass ? "/images/hidePass.png" : "/images/showPass.png"} alt="icoPass" width={100} height={100} />
                            </div>



                            {/* Campo Confimra Contraseña*/}
                            <label id="lblAdvertencias" style={{ visibility: mnsjConfirmaPass ? 'visible' : 'hidden' }}>
                                {mnsjConfirmaPass ? mnsjConfirmaPass : ""}
                            </label>

                            <div className="divPassR">
                                <input type={mostrarConfirmaPass ? "text" : "password"} name="txtConfirmaPassword" id="txtConfirmaPassword" placeholder="Confirmar contraseña" title="La contraseña debe ser igual al campo anterior" onChange={handleChange} />
                                <Image onClick={clickMostrarConfirmaPass} src={mostrarConfirmaPass ? "/images/hidePass.png" : "/images/showPass.png"} alt="icoPass" width={100} height={100} />
                            </div>



                            {/* Campo Sexo*/}
                            <label id="lblAdvertencias" style={{ visibility: mnsjSexo ? 'visible' : 'hidden' }}>
                                {mnsjSexo ? mnsjSexo : ""}
                            </label>
                            <div className="divSexRdb">
                                <div className="rdbOption">
                                    <input type="radio" id="rdbHombre" name="rdbSexo" value="h" onChange={handleChange} />
                                    <label>Hombre</label>
                                </div>

                                <div className="rdbOption">
                                    <input type="radio" id="rdbMujer" name="rdbSexo" value="m" onChange={handleChange} />
                                    <label>Mujer</label>
                                </div>

                                <div className="rdbOption">
                                    <input type="radio" id="rdbOtro" name="rdbSexo" value="o" onChange={handleChange} />
                                    <label>Prefiero no decir</label>
                                </div>
                            </div>



                            {/* Campo Pregunta secreta */}
                            <label id="lblAdvertencias" style={{ visibility: mnsjPregunta ? 'visible' : 'hidden' }}>
                                {mnsjPregunta ? mnsjPregunta : ""}
                            </label>
                            <select name="txtPreguntaSecreta" id="txtPreguntaSecreta" onChange={handleChange} >
                                <option value="0">-- Seleccione una pregunta --</option>
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



                    {/* Campo TyC*/}
                    <label id="lblAdvertencias" style={{ visibility: mnsjTyC ? 'visible' : 'hidden' }}>
                        {mnsjTyC ? mnsjTyC : ""}
                    </label>

                    <div className="divTyC">
                        <input type="radio" id="rdbTyC" name="rdbTyC" value="1" onChange={handleChange} />
                        <p>Al confirmar, aceptas las Condiciones, la Política de privacidad y la Política de cookies.</p>
                    </div>

                    <button type="submit" id="btnRegistro" >REGISTRARSE</button>
                    {/*disabled={btnEstado} */}

                </form>

                <div className="homeLink">
                    <Link href="./Login" className='aLogin'>Ya tienes cuenta? Iniciar sesión</Link>
                    <Link href="/">
                        <div>
                            <Image src="/images/homeIco.png" alt="homeIco" className="homeIco" width={100} height={100} />
                            Volver al Inicio
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}
export default FormRegistro;