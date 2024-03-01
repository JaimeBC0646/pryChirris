import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';


export function RecuperarCuenta() {
    // ENRUTADOR PARA REDIRIGIR
    const router = useRouter();

    // FUNCIONES PARA LOGIN
    const [usuario, setUsuario] = useState({
        txtIdentidad: "",
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
            const resultUser = await axios.post('/api/login-registro?action=recuperaCuenta', usuario);
            console.log("Result: ", resultUser)

            //console.log("resLength: ",resultUser.data[0].length)
            //console.log("estado:  ",resultUser.data[0][0].intEstadoCuenta);


            //1 (encontro la cuenta) o 0 (no encontro)
            if (resultUser.data !== "") {
                //alert("ENCONTRADO");

                //console.log("resLength: ",resultUser.data[0].length);
                //console.log("estado: ",resultUser.data[0][0].intEstadoCuenta)

                if (resultUser.data[0].length === 1 && resultUser.data[0][0].intEstadoCuenta === 0) {
                    //alert("si")
                    //alert("El usuario esta bloqueado, redirigiendo");
                    setMnsjAutenticacion("Cuenta encontrada, redirigiendo...");

                    const seg = 3000; //3 seg
                    setTimeout(async () => {
                        router.push({
                            //Ruta a donde redirecciona
                            pathname: './DesbloqueaCuenta',
                            //paso el id recuperado de la API
                            query: {
                                id: resultUser.data[0][0].idUsuario,
                            }
                        });
                    }, seg);

                }
                else {
                    //alert("no")
                    setMnsjAutenticacion("La cuenta no se encuentra bloquada, puede iniciar sesion con normalidad");
                }

            }
            else {
                setMnsjAutenticacion("Usuario no encontrado ⚠");
            }


        }
        catch (error) {
            console.error("Error de recuperar:", error);
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
            <div className="divContentBox">
                <h2>RECUPERACIÓN DE CUENTA</h2>

                <Image src="/images/icos/lock.png" id="frmRecuperaContra" className="lockIcon" alt="userImg" width={100} height={100} />

                <div>
                    <label htmlFor="lblCampos" id="lblCampos" style={{ visibility: mnsjCampos ? 'visible' : 'hidden' }}>
                        {mnsjCampos ? mnsjCampos : ""}
                    </label>

                    <label htmlFor="lblAutenticacion" id="lblAutenticacion" style={{ visibility: mnsjAutenticacion ? 'visible' : 'hidden' }}>
                        {mnsjAutenticacion ? mnsjAutenticacion : ""}
                    </label>
                </div>
                <div className="recuperaContraForm">
                    <div className="divMessage">
                        <h4>Ingresa tu correo electrónico o nombre de usuario para buscar tu cuenta.</h4>
                    </div>

                    <form onSubmit={handleSubmit} className="buscaForm">
                        <input type="text" name="txtIdentidad" id="txtIdentidad" placeholder="Usuario o correo" title="Usuario o Correo" onChange={handleChange} />

                        <div className="frmButtons">
                            <button type="submit" className="btn" id="btnRecupera">BUSCAR</button>

                            <Link href="./Login" className="btn">CANCELAR</Link>
                        </div>
                    </form>

                    <div className="homeLink">
                        <Link href="/">
                            <Image src="/images/icos/home.png" alt="homeIco" className="homeIco" width={100} height={100} />
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RecuperarCuenta;