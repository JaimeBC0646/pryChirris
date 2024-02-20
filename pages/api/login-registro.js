import { pool } from '../../config/cnxBD';
import { transporter } from '@/componentes/transporter';
import { getNamedMiddlewareRegex } from 'next/dist/shared/lib/router/utils/route-regex';
const randomstring = require('randomstring');


export default async function handler(req, res) {
    const accion = req.query.action; // Para determinar la acción específica

    switch (accion) {
        //const action = req.query.action;

        case 'login': return await loginUsuario(req, res);
        //console.log(accion);

        case 'usuario': return await buscaUsuario(req, res);

        case 'correo': return await buscaCorreo(req, res);

        case 'registro': return await registraUsuario(req, res);

        case 'activarCuenta': return await activarCuenta(req, res);

        case 'recuperaContra': return await recuperaContra(req, res);
        
        case 'validaRespuesta': return await validaRespuesta(req, res);

        case 'actualizaContra': return await actualizaContra(req, res);
        default:
            return res.status(405).end();
            break;
    }
}

const loginUsuario = async (req, res) => {
    //console.log(req.query.action)
    const { txtIdentidad, txtPassword } = req.body;
    try {
        const [result] = await pool.query('CALL SP_UsuarioLogin(?, ?)', [txtIdentidad, txtPassword]);

        //console.log(result);
        if (result.length > 0) {
            //console.log("Rol de usario: ", result[0][0].idRol);
            return res.status(200).json(result[0][0].idRol);
        } else {
            console.log("Usuario o contraseña incorrectos");
            return res.status(401).json("Regresando a login...");
        }
    }
    catch (err) {
        //console.log(err)
        return res.status(500).json({ err });
    }
}

const buscaUsuario = async (req, res) => {

    const { txtUsuario } = req.body;
    //console.log("Servidor Usuario: ",txtUsuario)
    try {

        const [result] = await pool.query('SELECT * FROM tblusuarios WHERE vchUsuario = ?', [txtUsuario]);
        //console.log("Servidor result: ", result);

        if (result && result.length > 0) {
            console.log('Servidor: Usuario en uso-> ', result)
            return res.status(200).json("no");
        }
        else {
            return res.status(200).json("");
        }

        //return res.status(200).json(result);
    }
    catch (err) {
        //console.log(err)
        return res.status(500).json({ err });
    }
}

const buscaCorreo = async (req, res) => {

    const { txtCorreo } = req.body;
    //console.log("Servidor Usuario: ",txtUsuario)
    try {

        const [result] = await pool.query('SELECT * FROM tblusuarios WHERE vchCorreo = ?', [txtCorreo]);
        //console.log("Servidor result: ", result);

        if (result && result.length > 0) {
            console.log('Servidor: Usuario en uso-> ', result)
            return res.status(200).json("no");
        }
        else {
            return res.status(200).json("");
        }

        //return res.status(200).json(result);
    }
    catch (err) {
        //console.log(err)
        return res.status(500).json({ err });
    }
}

function generaCodigoRandom() {
    const codigo = randomstring.generate({
        length: 6,
        charset: 'alphanumeric'
    });
    return codigo;
}

const registraUsuario = async (req, res) => {
    //console.log(req.query.action)
    const { txtNombre, txtApepat, txtApemat, txtFechaNacimiento, txtUsuario, txtTelefono, txtCorreo, txtPassword, rdbSexo, txtPreguntaSecreta, txtRespuestaSecreta } = req.body

    let codigoVerificacion = "";
    //console.log("Codigo generado: "+codigoVerificacion);

    let bandera = true

    while (bandera) {
        codigoVerificacion = generaCodigoRandom();
        try {
            const [result] = await pool.query('SELECT * FROM tblusuarios WHERE vchCodigoVerificacion = ?', [codigoVerificacion]);
            if (result.length === 0) {
                bandera = false;
            }
        }
        catch (err) {
            return res.status(500).json({ message: error.message });
        }
    }

    try {
        const [result] = await pool.query('CALL SP_ClienteNuevo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [txtNombre, txtApepat, txtApemat, txtFechaNacimiento,
                txtUsuario, txtTelefono, txtCorreo, txtPassword,
                rdbSexo, txtPreguntaSecreta, txtRespuestaSecreta, codigoVerificacion]);


        /*
    const [result] = await pool.query('INSERT INTO tblusuarios SET ?', 

    {
    vchNombre: txtNombre,
    vchApepat: txtApepat,
    vchApemat: txtApemat,
    dtFechaNacimiento: txtFechaNacimiento,
    vchUsuario: txtUsuario,
    vchTelefono: txtTelefono,
    vchCorreo: txtCorreo,
    vchPassword: txtPassword,
    charSexo: rdbSexo,
    vchPreguntaSecreta: txtPreguntaSecreta,
    vchRespuestaSecreta: txtRespuestaSecreta,
    vchCodigoVerificacion: codigoVerificacion,
    dtFechaRegistro: "",
    dtUltimaSesion: "",
    intEstadoUsuario: 0,
    intEstadoCuenta: 0,
    vchUltimaPassword: txtPassword,
    idRol: 3
    });
    */

        let datosCorreo = {
            from: 'ChirrisHouse-Cafeteria@gmail.com', // Correo remitente
            to: txtCorreo, //Correo Destinatario (correo registrado en el formulario)
            subject: 'Código de verificación', // Asunto
            // Cuerpo del correo (Mensaje + codigo de verificacion)
            html:
            `<!DOCTYPE html>
            <html>
            
            <head>
                <style>
                    body {
                        background-color: #dfb79b;
                    }
            
                    .container {
                        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }

                    .logotipo{
                        width: 50%;
                    }
            
                    .message {
                        background-color: #dfb79b77;
                        border: solid rgba(0, 0, 0, 0.411);
                        border-radius: 2rem;
                        padding: 20px;
                        margin-bottom: 20px;
                    }
            
                    .message h1,
                    .message h3 {
                        margin-top: 0;
                        margin-bottom: 10px;
                    }
            
                    .message img {
                        max-width: 100%;
                        height: auto;
                        display: block;
                        margin: 0 auto;
                        margin-bottom: 10px;
                    }
            
                    .code {
                        border: black solid;
                        border-radius: 3rem;
                        padding: 20px;
                        background: #a75225;
                        color: white;
                        font-size: 1.5rem;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                </style>
            </head>
            
            <body>
                <div class="container">
                    <div class="message">
                        <img class="logotipo" src="https://raw.githubusercontent.com/JaimeBC0646/pryChirris/master/public/images/logoChirris1.png" alt="logoChirris">

                        <h1>¡Hola estimado usuario!</h1>
                        <h3>Se hace envío del código para dar de alta su cuenta registrada recientemente.</h3>
                        <h3>Su código de verificación es:</h3>

                        <div class="code">${codigoVerificacion}</div>

                        <h3>Este codigo expira en 5 minutos, procure utilizarlo pronto.</h3>
                        <h3>Si usted no ha solicitado este código de registro, ignore este mensaje.</h3>
                        <h3>Si no eres el destinatario no deberás imprimir, copiar, retransmitir, diseminar o hacer uso de la información de este correo.</h3>
                        <h1>¡Chirris Online!</h1>
                        <h3>En caso de querer actualizar tu correo electrónico hazlo directamente en tu perfil desde la App.</h3>
                    </div>
                </div>
            </body>
            
            </html>
            `
            /*
            text: "Hola estimado usuario, se hace envio del codigo para dar de alta su cuenta registrada recientemente Su código de verificación es: " + codigoVerificacion + ". \n"
            +"Si usted no ha solicitado este codigo de registro, ignore este mensaje"
            */
        };


        await transporter.sendMail(datosCorreo);


        const [resultCuenta] = await pool.query('CALL SP_ObtenID_CuentaInactiva(?)', [txtUsuario]);
        

        console.log("res: ", resultCuenta[0][0].idUsuario);


        /*
        if(resultCuenta.length){
            id = resultCuenta.data[0][0].idUsuario //Obtenme el ID del registro realizado
            //Coloca una funciona a realizar despues de que el temporizador se acabe
            setTimeout(async () => {
                await pool.query('DELETE FROM tblusuarios WHERE idUsuario = ?', [id]);
            }, 10000); //10 segundos en milis
        }
        */
        
        return res.status(200).json(resultCuenta);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }


}


const activarCuenta = async (req, res) => {
    //console.log(req.query.action)
    const { txtCodigoVerificacion } = req.body
    console.log(txtCodigoVerificacion)

    try {
        const [result] = await pool.query('CALL SP_ActivarCuenta(?)', [txtCodigoVerificacion]);
        console.log(result)

        return res.status(200).json("Activado");
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


const recuperaContra = async (req, res) => {
    //console.log(req.query.action)
    const { txtIdentidad } = req.body;
    try {
        const [result] = await pool.query('CALL SP_ObtenPregunta(?)', [txtIdentidad]);
        
        //console.log("(API r[]]): ", result);
        //console.log("(API r[]]): ", result[0].id);

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            console.log("Usuario o contraseña incorrectos");
            return res.status(401).json("Intente de nuevo...");
        }
    }
    catch (err) {
        //console.log(err)
        return res.status(500).json({ err });
    }
}


const validaRespuesta = async (req, res) => {
    //console.log(req.query.action)
    const idCliente = req.query.id;
    const { txtRespuesta } = req.body;
    try {
        const [result] = await pool.query('CALL SP_ValidaRespuesta(?,?)', [idCliente, txtRespuesta]);

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            console.log("Usuario o contraseña incorrectos");
            return res.status(401).json("Intente de nuevo...");
        }
    }
    catch (err) {
        //console.log(err)
        return res.status(500).json({ err });
    }
}

const actualizaContra = async (req, res) => {
    const idCliente = req.query.id;
    const { txtNewContra } = req.body;

    try {
        /*
        console.log("body: ")
        console.log(req.body);
        console.log("query: ")
        console.log(req.query);
        */
        await pool.query('UPDATE tblusuarios SET vchPassword = ? WHERE idUsuario = ?  AND idRol = 3', [txtNewContra, idCliente]);
        return res.status(204).json(req.query);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}