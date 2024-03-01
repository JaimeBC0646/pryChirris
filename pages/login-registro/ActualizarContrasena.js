import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export function ActualizarContrasena() {
    // ENRUTADOR PARA REDIRIGIR
    const router = useRouter();

    // FUNCIONES PARA LOGIN
    const [usuario, setUsuario] = useState({
        txtNewContra: ""
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
        if (!usuario.txtNewContra) {
            setMnsjCampos("Por favor, introduzque una nueva contraseña ⚠");
            setMnsjReglasPass("");
            return;
        }

        /*Reglas de contraseña*/
        // Validar la contraseña con la expresión regular
        const regexPassRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$\-+_*/':;!¡?¿]).{8,}$/;
        if (usuario.txtNewContra !== "" && !regexPassRule.test(usuario.txtNewContra)) {
            setMnsjReglasPass("Reglas de Contraseña ⚠  \n● Minimo 8 caracteres ⓘ "
                            + "\n● Al menos una letra mayúscula ⓘ "
                            + "\n● Al menos una letra minucula ⓘ "
                            + "\n● Al menos un dígito ⓘ "
                            + "\n● No espacios en blanco ⓘ "
                            + "\n● Al menos 1 caracter especial ⓘ ");
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
        setMnsjReglasPass("")
    }
    return (
        <div className="titleMod">
            <div className="divContentBox">
                <h2>ACTUALIZACIÓN DE CONTRASEÑA</h2>

                <Image src="/images/lockIcon.png" id="frmRecuperaContra" className="lockIcon" alt="userImg" width={100} height={100} />

                <div>
                    <label htmlFor="lblCampos" id="lblCampos" style={{ visibility: mnsjCampos ? 'visible' : 'hidden' }}>
                        {mnsjCampos ? mnsjCampos : ""}
                    </label>

                    <label id="lblAdvertencias" style={{ visibility: mnsjReglasPass ? 'visible' : 'hidden' }}>
                        {mnsjReglasPass ? mnsjReglasPass : ""}
                    </label>
                </div>

                <div className="actualizarContraForm">
                    <div className="divMessage">
                        <h4>Genera una nueva contraseña.</h4>
                    </div>

                    <form onSubmit={handleSubmit} className="updContraForm">

                        <div className="divRespuesta">
                            <input type={mostrarPass ? "text" : "password"} name="txtNewContra" id="txtNewContra" placeholder="Contraseña nueva" title="Contraseña nueva" onChange={handleChange} />
                            <Image onClick={clickMostrarPass} src={mostrarPass ? "/images/hidePass.png" : "/images/showPass.png"} alt="icoAwnser" width={100} height={100} />
                        </div>

                        <div className="frmButtons">
                            <button type="submit" className="btn" id="btnActualizaContra" > ACTUALIZAR CONTRASEÑA </button>
                            {/* disabled={btnEstado} */}
                            <Link href="./Login" className="btn">CANCELAR</Link>
                        </div>
                    </form>

                    <div className="homeLink">
                        <Link href="/">
                            <div>
                                <Image src="/images/homeIco.png" alt="homeIco" className="homeIco" width={100} height={100} />
                                Volver al Inicio
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ActualizarContrasena;