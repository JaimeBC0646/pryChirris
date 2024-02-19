import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

export function RecuperarContrasena() {
    // ENRUTADOR PARA REDIRIGIR
    const router = useRouter();

    // FUNCIONES PARA LOGIN
    const [usuarioAlta, setUsuarioAlta] = useState({
        txtCodigoVerificacion: ""
    });


    /* VALIDACIONES */
    //Autenticacion
    const [mnsjAutenticacion, setMnsjAutenticacion] = useState("");
    //Campo vacio
    const [mnsjCampos, setMnsjCampos] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usuarioAlta.txtCodigoVerificacion) {
            setMnsjCampos("Por favor, introduzca el codigo de verifiacion ⚠");
            return;
        }

        try {
            //const result = await axios.post('/api/login-registro?action=activarCuenta', usuario);

            //Enviar por post la accion a realizar dependiendo de la accion
            const result = await axios.post('/api/login-registro?action=activarCuenta', usuarioAlta);

            if (result) {
                alert("Cuenta Activada...");
                //router.push('./ActualizarContrasena');
                router.push('/login-registro/Login');
            }
        }
        catch (error) {
            console.error("Error al activar Cuenta:", error);
            setMnsjAutenticacion("Codigo de verififacion incorrecto ⚠");
            //alert("No encontrado");
        }
    };

    const handleChange = ({ target: { name, value } }) => {
        //setUsuario(prevUsuario => ({ ...usuario, [name]: value }));
        setUsuarioAlta({ ...usuarioAlta, [name]: value })
        if (value.trim() !== "") {
            setMnsjAutenticacion("");
            setMnsjCampos("");
        }
        //console.log(router.pathname)
        //console.log(name + " =  " + value);
        console.log(usuarioAlta.txtUsuarioNuevo);
    }


    return (
        <div className="titleMod">
            <h1>VALIDACION DE REGISTRO</h1>

            <img src="/images/lockIcon.png" id="frmRecuperaContra" className="lockIcon" alt="userImg" />

            <div className="recuperaContraForm">
                <div className="divMessage">
                    <h4>Ingresa el codigo que se envio al correo registrado para activar la cuenta.</h4>
                </div>

                <label htmlFor="lblCampos" id="lblCampos" style={{ visibility: mnsjCampos ? 'visible' : 'hidden' }}>
                    {mnsjCampos ? mnsjCampos : ""}
                </label>
                
                <label htmlFor="lblAutenticacion" id="lblAutenticacion" style={{ visibility: mnsjAutenticacion ? 'visible' : 'hidden' }}>
                    {mnsjAutenticacion ? mnsjAutenticacion : ""}
                </label>

                <form onSubmit={handleSubmit} className="buscaForm">
                    <input type="text" name="txtCodigoVerificacion" id="txtCodigoVerificacion" placeholder="Codigo de verificación" title="Usuario o Correo" onChange={handleChange} />

                    <div className="frmButtons">
                        <button type="submit" className="btn" id="btnRecupera">ACTIVAR CUENTA</button>
                        {/* <a href="./Login" className="btn">CANCELAR</a> */}
                    </div>
                </form>

                {/*
                <div className="homeLink">
                    <a href="/">
                        <img src="/images/homeIco.png" alt="homeIco" className="homeIco" />
                        Volver al Inicio
                    </a>
                </div>
                */}
            </div>
        </div>
    )
}
export default RecuperarContrasena;