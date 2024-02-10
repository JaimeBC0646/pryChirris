import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

export function FormRegistro() {
    const router = useRouter();

    const [usuario, setUsuario] = useState({
        txtNombre: "",
        txtApepat: "",
        txtApemat: "",
        txtUsuario: "",
        txtTelefono: "",
        txtCorreo: "",
        txtPassword: "",
        txtConfirmaPassword: "",

    });

    /* MENSAJES DE VALIDACIONES */
    //Campo vacio
    const [mnsjCampos, setMnsjCampos] = useState("");

    //Validacion para c/campo:
    const [mnsjNombre, setMnsjNombre] = useState("");
    const [mnsjUsuario, setMnsjUsuario] = useState("");
    const [mnsjTelefono, setMnsjTelefono] = useState("");
    const [mnsjCorreo, setMnsjCorreo] = useState("");
    const [mnsjReglasPass, setMnsjReglasPass] = useState("");
    const [mnsjConfirmaPass, setMnsjConfirmaPass] = useState("");
    const [btnEstado, setBtnEstado] = useState(false);
    //const [mnsj, setMnsj = useState("");

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



        if (usuario.txtUsuario) {
            setMnsjUsuario("");
            setFormEstado(0);
            //setBtnEstado(false);
        }
        else {
            setFormEstado(1);
        }

        if (usuario.txtCorreo) {
            setMnsjCorreo("");
            setFormEstado(0);
            //setBtnEstado(false);
        }
        else {
            setFormEstado(1);
        }


        /*Solo numeros en numero de telefono*/
        const regexNumeros = /^\d+$/;
        if (usuario.txtTelefono) {
            if (!regexNumeros.test(usuario.txtTelefono)) {
                setMnsjTelefono("Solo numeros de telefono valido (10 digitos) ⚠");
                setFormEstado(0);
                setBtnEstado(true);
            } else {
                setMnsjTelefono("");
                setFormEstado(1);
            }
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
        if((usuario.txtConfirmaPassword && usuario.txtPassword) && (usuario.txtConfirmaPassword === usuario.txtPassword)){
            setMnsjConfirmaPass("");
                setFormEstado(1);
        }
        else{
            setMnsjConfirmaPass("Las contraseñas no coinciden ⚠");
                setFormEstado(0);
        }

        

        /* Usuario distinto de los existentes en BD */
        try {
            if (usuario.txtUsuario) {
                console.log("txtU: " + usuario.txtUsuario)
                const result = await axios.post('/api/login-registro?action=usuario', { txtUsuario: usuario.txtUsuario }); // Pasar el valor del campo txtUsuario
                //console.log(result.data);

                //result && Object.keys(result).length > 0
                //result && Array.isArray(result.data) && result.length > 0
                if (result.data == "no") {
                    setMnsjUsuario("El nombre de usuario ya está en uso");
                    setFormEstado(0);
                    //console.log("Objkeys.r: ",Object.keys(result.length));
                    //setBtnEstado(true); // Deshabilita el botón si se encuentra un usuario
                }
                else {
                    setFormEstado(1);
                }
            }

        } catch (error) {
            setMnsjUsuario("");
            setBtnEstado(false); // Habilita el botón si no se encuentra un usuario
            console.error("Error al buscar usuario:", error);
        }




        /* Correo distinto de los existentes en BD */
        try {
            if (usuario.txtCorreo) {
                console.log("txtC: " + usuario.txtCorreo)
                const result = await axios.post('/api/login-registro?action=correo', { txtCorreo: usuario.txtCorreo }); // Pasar el valor del campo txtUsuario

                if (result.data == "no") {
                    setMnsjCorreo("El correo ya posee a una cuenta existente");
                    setFormEstado(0);
                }
                else {
                    setFormEstado(1);
                }
            }

        } catch (error) {
            setMnsjUsuario("");
            setBtnEstado(false); // Habilita el botón si no se encuentra un usuario
            console.error("Error al buscar correo:", error);
        }




        //SUBMIT DEL FORM (Registro)
        if (formValido ==1)
            try {
                const result = await axios.post('/api/login-registro?action=registro', usuario);

                if (result) {
                    //alert("USER EXIST: "+result.data.vchUsuario)
                    alert("Registrando...")
                    router.push('./Login');
                }
            }
            catch (error) {
                //toast.error("Por favor no deje campos vacios y que correspondan al tipo de dato");
                console.log("No se ha podido completar el registro");
                console.error("Error registro:", error);
            }

    };

    const handleChange = async ({ target: { name, value } }) => {
        setUsuario({ ...usuario, [name]: value });
        setMnsjCampos(""); //Resetea el mensaje de campos vacios

        console.log(name + " =  " + value);
        console.log(formValido);

        /*Campos vacios*/
        if (usuario.txtNombre || usuario.txtApepat || usuario.txtApemat || usuario.txtUsuario ||
            usuario.txtTelefono || usuario.txtCorreo || usuario.txtPassword ||
            usuario.txtConfirmaPassword) {
            setBtnEstado(false); // Habilita el botón si todos los campos están llenos
        }
        // else {setBtnEstado(true);// Deshabilita el botón si algún campo está vacío}
        

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
                        <label htmlFor="lblNombre" id="lblNombre" style={{ visibility: mnsjNombre ? 'visible' : 'hidden' }}>
                            {mnsjNombre ? mnsjNombre : ""}
                        </label>
                        <input type="text" name="txtNombre" id="txtNombre" placeholder="Nombre (s)" minLength="3" onChange={handleChange} />



                        {/* Campo Apepat */}
                        <label htmlFor="lblApepat" id="lblApepat" ></label>
                        <input type="text" name="txtApepat" id="txtApepat" placeholder="Apellido Paterno" onChange={handleChange} />



                        {/* Campo Apemat */}
                        <label htmlFor="lblApemat" id="lblApemat" ></label>
                        <input type="text" name="txtApemat" id="txtApemat" placeholder="Apellido Materno" onChange={handleChange} />



                        {/* Campo Usuario */}
                        <label htmlFor="lblUsuario" id="lblUsuario" style={{ visibility: mnsjUsuario ? 'visible' : 'hidden' }}>
                            {mnsjUsuario ? mnsjUsuario : ""}
                        </label>
                        <input type="text" name="txtUsuario" id="txtUsuario" placeholder="Nombre de Usuario" minLength="5" onChange={handleChange} />

                    </div>

                    <div className="formInputs">
                        {/* Campo Telefono */}
                        <label htmlFor="lblTelefono" id="lblTelefono" style={{ visibility: mnsjTelefono ? 'visible' : 'hidden' }}>
                            {mnsjTelefono ? mnsjTelefono : ""}
                        </label>
                        <input type="text" name="txtTelefono" id="txtTelefono" placeholder="No. de Telefono" minLength="10" maxLength="10" onChange={handleChange} />


                        {/* Campo Correo */}
                        <label htmlFor="lblCorreo" id="lblCorreo" style={{ visibility: mnsjCorreo ? 'visible' : 'hidden' }}>
                            {mnsjCorreo ? mnsjCorreo : ""}
                        </label>
                        <input type="email" name="txtCorreo" id="txtCorreo" placeholder="Correo" onChange={handleChange} />



                        {/* Campo Contraseña*/}
                        <label htmlFor="lblPass" id="lblPass" style={{ visibility: mnsjReglasPass ? 'visible' : 'hidden' }}>
                            {mnsjReglasPass ? mnsjReglasPass : ""}
                        </label>
                        <input type="password" name="txtPassword" id="txtPassword" placeholder="Contraseña" minLength="8" onChange={handleChange} />



                        {/* Campo Confimra Contraseña*/}
                        <label htmlFor="lblConfirmaPass" id="lblConfirmaPass" style={{ visibility: mnsjConfirmaPass ? 'visible' : 'hidden' }}>
                            {mnsjConfirmaPass ? mnsjConfirmaPass : ""}
                        </label>
                        <input type="password" name="txtConfirmaPassword" id="txtConfirmaPassword"
                            placeholder="Confirmar contraseña" title="La contraseña debe ser igual al campo anterior" onChange={handleChange} />


                    </div>
                </div>

                <p>
                    Al hacer clic en Registrarte, aceptas las Condiciones, la Política de privacidad y la Política de cookies.
                </p>
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