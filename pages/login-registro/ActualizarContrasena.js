import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export function ActualizarContrasena() {
    // ENRUTADOR PARA REDIRIGIR
    const router = useRouter();

    // FUNCIONES PARA LOGIN
    const [usuario, setUsuario] = useState({
        txtNewContra: ""
    });


    /* VALIDACIONES */
    //Campo vacio
    const [mnsjCampos, setMnsjCampos] = useState("");
    //Reglas de nueva contraseña y actualizacion
    const [mnsjReglasPass, setMnsjReglasPass] = useState("");
    //const [btnEstado, setBtnEstado] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usuario.txtNewContra) {
            setMnsjCampos("Por favor, introduzque una nueva contraseña ⚠");
            return;
        }

        /*Reglas de contraseña*/
        // Validar la contraseña con la expresión regular
        const regexPassRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$\-+_*/':;!¡?¿]).{8,}$/;
        if (usuario.txtNewContra !== "" && !regexPassRule.test(usuario.txtNewContra)) {
            setMnsjReglasPass("La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial, y tener al menos 8 caracteres de longitud");
            return;
            //setBtnEstado(true); //Habilita el envio del form (actualiza)
        } else {
            setMnsjReglasPass("");
            //setBtnEstado(false); //Deshabilita el envio del form (no actualiza)
        }


        try {
            const idCliente = router.query.id; // Tomo el ID de la URL

                const result = await axios.put(`/api/login-registro?action=actualizaContra&id=${idCliente}`, usuario);
                console.log(result)

                if (result) {
                    alert("Actualizado..."); //Cambiar por modal u otra alerta
                    router.push('./Login');
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
            <h1>ACTUALIZACION DE CONTRASEÑA</h1>

            <img src="/images/lockIcon.png" id="frmRecuperaContra" className="lockIcon" alt="userImg" />

            <div className="actualizarContraForm">
                <div className="divMessage">
                    <h4>Genera una nueva contraseña.</h4>
                </div>

                <label htmlFor="lblCampos" id="lblCampos" style={{ visibility: mnsjCampos ? 'visible' : 'hidden' }}>
                    {mnsjCampos ? mnsjCampos : ""}
                </label>

                <label htmlFor="lblReglasPass" id="lblReglasPass" style={{ visibility: mnsjReglasPass ? 'visible' : 'hidden' }}>
                    {mnsjReglasPass ? mnsjReglasPass : ""}
                </label>

                <form onSubmit={handleSubmit} className="updContraForm">
                    <input type="password" name="txtNewContra" id="txtNewContra" placeholder="Contraseña nueva" title="Contraseña nueva" onChange={handleChange} />

                    <div className="frmButtons">
                        <button type="submit" className="btn" id="btnActualizaContra" > ACTUALIZAR CONTRASEÑA </button>
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