import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';


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
    const [mnsjResIncorrecta, setMnsjResIncorrecta] = useState("");
    //Intentos para accesar con respuesta de PS
    const [intentos, setSumaIntentos] = useState(3);
    const [mnsjIntentos, setMnsjIntentos] = useState(0);
    const [btnEstado, setBtnEstado] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usuario.txtRespuesta) {
            setMnsjCampos("Por favor, responda la pregunta ⚠");
            return;
        }
        else {
            if (intentos == 1) {
                setMnsjResIncorrecta("")
                setMnsjIntentos("Ha superado el limite de intentos, su cuenta ha sido bloqueada.\n Contacte con servicio al cliente para poder reactivar su cuenta ⚠");
                alert("bloquiando")
                try {
                    const idCliente = router.query.id; // Tomo el ID de la URL
                    await axios.post(`/api/login-registro?action=bloquearCuenta&id=${idCliente}`);
                }
                catch (error) {
                    console.error("Error al bloquear:", error);
                }
                setBtnEstado(true);
                setSumaIntentos(0);
                return;
            }
        }


        try {
            const idCliente = router.query.id; // Tomo el ID de la URL

            const result = await axios.post(`/api/login-registro?action=validaRespuesta&id=${idCliente}`, usuario);
            console.log(result)



            //Si se encuentra el registro con la informacion correcta
            if (result.data !== "") {
                //console.log("length[0]: ",result.data[0].length)

                //Si la cuenta esta desbloqueada (respuesta de funcion en la Api local)
                if (result.data[0][0].intEstadoCuenta === 1) {
                    //alert("Genera nueva pass")

                    router.push({
                        //Ruta a donde redirecciona
                        pathname: './ActualizarContrasena',
                        //paso el id recuperado de la API
                        query: {
                            id: result.data[0][0].idUsuario
                        }
                    });

                }
                else {
                    // Si se accede de manera ilicita a esta parte, si la cuenta esta bloqueada, no permite el paso a la generacion de nueva contraseña
                    setMnsjResIncorrecta("Esta cuenta se encuentra bloqueada, intente desbloquearla o contacte con servicio al cliente si desconoce el motivo ⚠");
                }



            }
            else {
                //Informacion incorrecta -1 intento
                setMnsjResIncorrecta("Respuesta incorrecta, intente de nuevo")
                setSumaIntentos(intentos - 1);

            }

        }
        catch (error) {
            console.error("Error busqueda:", error);
            //alert("No se pudo actualizar");
        }
    };

    const handleChange = ({ target: { name, value } }) => {

        setUsuario({ ...usuario, [name]: value })

        if (value.trim() !== "") {
            setMnsjCampos("");
        }
        setMnsjResIncorrecta("");

    }
    return (
        <div className="titleMod">
            <h1>AUTENTICACION DE LA CUENTA</h1>

            <Image src="/images/lockIcon.png" id="frmRecuperaContra" className="lockIcon" alt="userImg" width={100} height={100} />

            <div className="actualizarContraForm">
                <div className="divMessage">
                    <h4>Responda a la pregunta para poder actualizar su contraseña.</h4>
                </div>

                <label htmlFor="lblCampos" id="lblCampos" style={{ visibility: mnsjCampos ? 'visible' : 'hidden' }}>
                    {mnsjCampos ? mnsjCampos : ""}
                </label>

                <label htmlFor="lblReglasPass" id="lblReglasPass" style={{ visibility: mnsjResIncorrecta ? 'visible' : 'hidden' }}>
                    {mnsjResIncorrecta ? mnsjResIncorrecta : ""}
                </label>

                <form onSubmit={handleSubmit} className="updContraForm">
                    <label htmlFor="lblAutenticacion" id="lblAutenticacion"> Intentos: {intentos}</label>

                    <label htmlFor="lblIdentidad" id="txtWarning" style={{ visibility: mnsjIntentos ? 'visible' : 'hidden' }}>
                        {mnsjIntentos ? mnsjIntentos : ""}
                    </label>

                    <label htmlFor="lblPregunta" id="lblPregunta">
                        {router.query.pregunta}
                    </label>


                    <input type={mostrarPass ? "text" : "password"} name="txtRespuesta" id="txtRespuesta" placeholder="Respuesta secreta" title="Contraseña nueva" onChange={handleChange} />
                    <button type="button" onClick={clickMostrarPass} className="password-toggle-btn"> <Image src={mostrarPass ? "/images/hidePass.png" : "/images/showPass.png"} alt="icoPass" width={100} height={100} /> </button>


                    <div className="frmButtons">
                        <button type="submit" className="btn" id="btnActualizaContra" disabled={btnEstado}> COMPROBAR RESPUESTA </button>
                        {/* disabled={btnEstado} */}
                        <Link href="./Login" className="btn">CANCELAR</Link>
                    </div>
                </form>

                <div className="homeLink">
                    <Link href="/">
                        <Image src="/images/homeIco.png" alt="homeIco" className="homeIco" width={100} height={100} />
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default ActualizarContrasena;