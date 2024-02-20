import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export function ActualizarContrasena() {
    // ENRUTADOR PARA REDIRIGIR
    const router = useRouter();

    
    const [usuario, setUsuario] = useState({
        txtRespuesta: ""
    });
    
    //Estado y funcion para mostrar/ocultar contraseña
    const [mostrarPass, setMostrarPass] = useState(false);
    const clickMostrarPass = () => {
        setMostrarPass(!mostrarPass);
    };

    /* VALIDACIONES */
    //Campo vacio
    const [mnsjCampos, setMnsjCampos] = useState("");
    //Reglas de nueva contraseña y actualizacion
    const [mnsjReglasPass, setMnsjReglasPass] = useState("");
    //const [btnEstado, setBtnEstado] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usuario.txtRespuesta) {
            setMnsjCampos("Por favor, responda la pregunta ⚠");
            return;
        }


        try {
            const idCliente = router.query.id; // Tomo el ID de la URL

            const result = await axios.put(`/api/login-registro?action=validaRespuesta&id=${idCliente}`, usuario);
            console.log(result)

            if (result) {
                alert("Correcto...");
                router.push({
                    //Ruta a donde redirecciona
                    pathname: './ActualizarContrasena',
                    //paso el id recuperado de la API
                    query: {
                        id: result.data[0][0].idUsuario
                    }
                });
            }

        }
        catch (error) {
            console.error("Error busqueda:", error);
            alert("No se pudo actualizar");
            //setMnsjAutenticacion("Usuario no encontrado ⚠");
        }
    };

    const handleChange = ({ target: { name, value } }) => {

        setUsuario({ ...usuario, [name]: value })

        if (value.trim() !== "") {
            setMnsjCampos("");
        }


        //console.log(name + " =  " + value);
        //console.log("id recibido: " + router.query.id);

    }
    return (
        <div className="titleMod">
            <h1>AUTENTICACION DE LA CUENTA</h1>

            <img src="/images/lockIcon.png" id="frmRecuperaContra" className="lockIcon" alt="userImg" />

            <div className="actualizarContraForm">
                <div className="divMessage">
                    <h4>Responda a la pregunta para poder actualizar su contraseña.</h4>
                </div>

                <label htmlFor="lblCampos" id="lblCampos" style={{ visibility: mnsjCampos ? 'visible' : 'hidden' }}>
                    {mnsjCampos ? mnsjCampos : ""}
                </label>

                <label htmlFor="lblReglasPass" id="lblReglasPass" style={{ visibility: mnsjReglasPass ? 'visible' : 'hidden' }}>
                    {mnsjReglasPass ? mnsjReglasPass : ""}
                </label>

                <form onSubmit={handleSubmit} className="updContraForm">
                    <label htmlFor="lblPregunta" id="lblPregunta">
                        {router.query.pregunta}
                    </label>


                    <input type={mostrarPass ? "text" : "password"} name="txtRespuesta" id="txtRespuesta" placeholder="Respuesta secreta" title="Contraseña nueva" onChange={handleChange} />
                    <button type="button" onClick={clickMostrarPass} className="password-toggle-btn"> <img src={mostrarPass ? "/images/hidePass.png" : "/images/showPass.png"} /> </button>


                    <div className="frmButtons">
                        <button type="submit" className="btn" id="btnActualizaContra" > COMPROBAR RESPUESTA </button>
                        {/* disabled={btnEstado} */}
                        <a href="./Login" className="btn">CANCELAR</a>
                    </div>
                </form>

                <div className="homeLink">
                    <a href="/">
                        <img src="/images/homeIco.png" alt="homeIco" className="homeIco" />
                        Volver al Inicio
                    </a>
                </div>
            </div>
        </div>
    )
}
export default ActualizarContrasena;