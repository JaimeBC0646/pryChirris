import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

export function RecuperarContrasena() {
    // ENRUTADOR PARA REDIRIGIR
    const router = useRouter();

    // FUNCIONES PARA LOGIN
    const [usuario, setUsuario] = useState({
        txtIdentidad: ""
    });


    /* VALIDACIONES */
    //Autenticacion
    const [mnsjAutenticacion, setMnsjAutenticacion] = useState("");
    //Campo vacio
    const [mnsjCampos, setMnsjCampos] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usuario.txtIdentidad) {
            setMnsjCampos("Por favor, introduzca el usuario para recuperar su cuenta ⚠");
            return;
        }

        try {
            //Enviar por post la accion a realizar dependiendo del formulario
            const result = await axios.post('/api/login-registro?action=recuperaContra', usuario);

            //console.log("(CLIENTE result): "+result);
            //console.log("(CLIENTE r.data): "+result.data);
            //console.log("(CLIENTE r.idC): "+ result.idCliente)
            //console.log("(CLIENTE r[]]): "+result[0].idCliente);
            if (result) {
                //alert("Encontrado...");
                //router.push('./ActualizarContrasena');
                router.push({
                    //Ruta a donde redirecciona
                    pathname: './ActualizarContrasena',
                    //paso el id recuperado de la API
                    query: { id: result.data }
                });
            }
        }
        catch (error) {
            console.error("Error de recuperar:", error);
            setMnsjAutenticacion("Usuario no encontrado ⚠");
            //alert("No encontrado");
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
            <h1>RECUPERACION DE CONTRASEÑA</h1>

            <img src="/images/lockIcon.png" id="frmRecuperaContra" className="lockIcon" alt="userImg" />

            <div className="recuperaContraForm">
                <div className="divMessage">
                    <h4>Ingresa tu correo electrónico o nombre de usuario para buscar tu cuenta.</h4>
                </div>

                <label htmlFor="lblCampos" id="lblCampos" style={{ visibility: mnsjCampos ? 'visible' : 'hidden' }}>
                    {mnsjCampos ? mnsjCampos : ""}
                </label>
                
                <label htmlFor="lblAutenticacion" id="lblAutenticacion" style={{ visibility: mnsjAutenticacion ? 'visible' : 'hidden' }}>
                    {mnsjAutenticacion ? mnsjAutenticacion : ""}
                </label>

                <form onSubmit={handleSubmit} className="buscaForm">
                    <input type="text" name="txtIdentidad" id="txtIdentidad" placeholder="Usuario o correo" title="Usuario o Correo" onChange={handleChange} />

                    <div className="frmButtons">
                        <button type="submit" className="btn" id="btnRecupera">BUSCAR</button>

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
export default RecuperarContrasena;