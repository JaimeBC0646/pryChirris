import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export function DesbloqueaCuenta() {
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
            setMnsjCampos("Por favor, introduzca el codigo de desbloqueo ⚠");
            return;
        }

        try {
            //Enviar por post la accion a realizar dependiendo de la accion
            const idCliente = router.query.id;
            const result = await axios.post(`/api/login-registro?action=activarCuenta&id=${idCliente}`, usuarioAlta);
            console.log(result)
            if (result) {
                setMnsjAutenticacion("Reactivando cuenta, ya puede iniciar sesion :)");

                const seg = 3000; //3 seg
                setTimeout(async () => {
                    router.push('/login-registro/Login');
                }, seg);

                //alert("Cuenta Activada...");
                //router.push('./ActualizarContrasena');
            }
        }
        catch (error) {
            console.error("Error al reactivar Cuenta:", error);
            setMnsjAutenticacion("Codigo de verificacion incorrecto ⚠");
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
    }


    return (
        <div className="titleMod">
            <div className="divContentBox">
                <h2>DESBLOQUEO DE LA CUENTA</h2>

                <Image src="/images/lockIcon.png" id="frmRecuperaContra" className="lockIcon" alt="userImg" width={100} height={100} />

                <div className="recuperaContraForm">
                    <div className="divMessage">
                        <h4>Ingresa el codigo que se envio al correo registrado para desbloquear la cuenta.</h4>
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
                            {/* <Link href="./Login" className="btn">CANCELAR</Link> */}
                        </div>
                    </form>

                    {/*
                <div className="homeLink">
                    <Link href="/">
                        <Image src="/images/homeIco.png" alt="homeIco" className="homeIco" />
                        Volver al Inicio
                    </Link>
                </div>
                */}
                </div>
            </div>
        </div>
    )
}
export default DesbloqueaCuenta;