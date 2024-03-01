import { pool } from '../../config/cnxBD';
import { transporter } from '@/componentes/transporter';
import { getNamedMiddlewareRegex } from 'next/dist/shared/lib/router/utils/route-regex';
const randomstring = require('randomstring');


export default async function handler(req, res) {
    const accion = req.query.action; // Para determinar la acción específica

    switch (accion) {
        //const action = req.query.action;
        //console.log(accion);

        /* METODOS LOGIN */
        case 'usuarioL': return await buscaUsuarioL(req, res);

        case 'login': return await loginUsuario(req, res);

        case 'bloquearCuenta': return await bloquearCuenta(req, res);

        /* METODOS REGISTRO */

        case 'usuarioR': return await buscaUsuarioR(req, res);

        case 'correo': return await buscaCorreo(req, res);

        case 'verificaPass': return await verificaPassDebil(req, res);

        case 'registro': return await registraUsuario(req, res);

        case 'activarCuenta': return await activarCuenta(req, res);

        /* METODOS RECUPERACION */

        case 'recuperaCuenta': return await recuperaCuenta(req, res);

        case 'recuperaContra': return await recuperaContra(req, res);

        case 'validaRespuesta': return await validaRespuesta(req, res);

        case 'actualizaContra': return await actualizaContra(req, res);


        default: return res.status(405).end();
    }
}


/* --- | CONSULTAS E INSTRUCCIONES A LA BD | --- */

// -> LOGIN

const buscaUsuarioL = async (req, res) => {

    const { txtIdentidad } = req.body;
    //console.log("Servidor Usuario: ",txtUsuario)
    try {

        const [result] = await pool.query('SELECT * FROM tblusuarios WHERE (vchUsuario = ? OR vchCorreo = ?)', [txtIdentidad, txtIdentidad]);
        //console.log(result)
        //console.log("length: ",result.length)

        if (result && result.length > 0) {
            //console.log('Servidor: Usuario registrado-> ', result)
            return res.status(200).json(result);
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

const loginUsuario = async (req, res) => {
    //console.log(req.query.action)
    const { txtIdentidad, txtPassword } = req.body;
    try {
        const [result] = await pool.query('CALL SP_UsuarioLogin(?, ?)', [txtIdentidad, txtPassword]);
        console.log(result)
        console.log("length: ",result[0].length)

        
        if (result[0].length > 0) {
            //console.log("Rol de usario: ", result[0][0].idRol);
            return res.status(200).json(result);
        } else {
            console.log("Credenciales incorrectas ⚠");
            return res.status(200).json("");
            //return res.status(401).json("Regresando a login...");
        }
    }
    catch (err) {
        //console.log(err)
        return res.status(500).json({ err });
    }
}

const bloquearCuenta = async (req, res) => {
    if(req.query.id){
        const idCliente = req.query.id
        try {
            const [result] = await pool.query('UPDATE tblusuarios SET intEstadoCuenta = 0 WHERE idUsuario = ?', [idCliente]);
    
            //console.log(result);
            if (result.length > 0) {
                //console.log("Rol de usario: ", result[0][0].idRol);
                return res.status(200).json("Cuenta bloqueada");
            } else {
                console.log("La cuenta ya bloqueada");
                return res.status(200).json("");
                //return res.status(401).json("Regresando a login...");
            }
        }
        catch (err) {
            //console.log(err)
            return res.status(200).json("");
        }
        
    }
    else{
        const { txtIdentidad } = req.body;
        try {
            const [result] = await pool.query('UPDATE tblusuarios SET intEstadoCuenta = 0 WHERE (vchUsuario = ? OR vchCorreo = ?)', [txtIdentidad, txtIdentidad]);
    
            //console.log(result);
            if (result.length > 0) {
                //console.log("Rol de usario: ", result[0][0].idRol);
                return res.status(200).json("Cuenta bloqueada");
            } else {
                console.log("Usuario o contraseña incorrectos");
                return res.status(500).json({ err });
                //return res.status(401).json("Regresando a login...");
            }
        }
        catch (err) {
            //console.log(err)
            return res.status(500).json({ err });
        }
    }
}




// -> REGISTRO

const buscaUsuarioR = async (req, res) => {

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

const verificaPassDebil = async (req, res) => {
    const { txtPassword } = req.body;
    //console.log("Servidor Usuario: ",txtUsuario)
    try {

        const [result] = await pool.query('SELECT * FROM tbllistanegrapass WHERE vchPass = ?', [txtPassword]);
        //console.log("Servidor result: ", result);
        //console.log(result[0][0].idUsuario)
        if (result && result.length > 0) {
            console.log('Contraseña debil o descifrable', result)
            return res.status(200).json("no");
        }
        else {
            return res.status(200).json("ok");
        }

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

        let correoRegistro = {
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
                        <h3>En caso de querer actualizar la informacion de cuenta, hazlo directamente en tu perfil desde la App.</h3>
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


        await transporter.sendMail(correoRegistro);


        const [resultCuenta] = await pool.query('CALL SP_ObtenID_CuentaInactiva(?)', [txtUsuario]);


        //console.log("res: ", resultCuenta[0][0].idUsuario);



        if (resultCuenta.length) {
            const id = resultCuenta[0][0].idUsuario //Obtenme el ID del registro realizado
            const min = 300000; //Tiempo de espera (5min) para que expire el codigo (se elimine el registro)
            //(30 segundos) -> 30000
            //(5 minutos)   -> 300000

            //Coloca una funciona a realizar despues de que el temporizador se acabe
            setTimeout(async () => {
                await pool.query('CALL SP_EliminaCuentaInactiva(?)', [id]);
            }, min);
        }


        return res.status(200).json(resultCuenta);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }


}

const activarCuenta = async (req, res) => {
    //console.log(req.query.action)
    let idCliente = "";
    if (req.query.id) {
        //console.log("idQuery enn ActivaCuenta: ", req.query.id);
        idCliente = req.query.id;
    }
    //console.log("idCliente: " + idCliente)


    const { txtCodigoVerificacion } = req.body
    console.log("codigo: " + txtCodigoVerificacion)

    try {

        const [resCuenta] = await pool.query('CALL SP_BuscaCodigo(?, ?)', [txtCodigoVerificacion, idCliente]);
        //console.log(resCuenta)
        //console.log("corchete ",resCuenta[0]) NO
        //console.log("lenght[0] ", resCuenta[0].length);
        if (resCuenta[0].length) {
            const [result] = await pool.query('CALL SP_ActivarCuenta(?, ?)', [txtCodigoVerificacion, idCliente]);
            return res.status(200).json(resCuenta);
        }
        else {
            return res.status(404).json({ message: error.message });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}




// -> RECUPERACIÓN

const recuperaCuenta = async (req, res) => {
    //console.log(req.query.action)
    const { txtIdentidad } = req.body;
    
    
    try {
        const [result] = await pool.query('CALL SP_ObtenPregunta(?)', [txtIdentidad]);

        //OBJETO CON LOS ARRAYS 
        console.log("us: "+txtIdentidad+"   result obtenPregunta: ", result)
        //Longitud del primer array
        console.log("lenght: ", result[0].length)


        if (result[0].length == 1) {
            
            //console.log("intEstado: ", result[0][0].intEstadoCuenta)
            let bandera = true;
            let nuevoCodigo = "";
            console.log("idUser: ",result[0][0].idUsuario)
            //console.log("correo: ",result[0][0].vchCorreo)

            //Toma id del usuario
            const id = result[0][0].idUsuario;
            while (bandera) {
                // Genera nuevo codigo
                nuevoCodigo = generaCodigoRandom();
                try {
                    // Compara codigo nuevo con el registrado
                    const [result2] = await pool.query('SELECT * FROM tblusuarios WHERE vchCodigoVerificacion = MD5(?) AND idUsuario = ?', [nuevoCodigo, id]);
                    // Si el codigo ya existe el estado bandera se mantiene y reinicia el ciclo
                    if (result2.length === 0) {
                        bandera = false;
                    }
                }
                catch (err) {
                    return res.status(500).json({ message: error.message });
                }
            }
            
            

            
            
            
            //console.log("correo: ",result[0][0].vchCorreo)
            
            //Correo con el codigo de desbloqueo
            const correoCuenta = result[0][0].vchCorreo;
            let correoDesbloqueo = {
                from: 'ChirrisHouse-Cafeteria@gmail.com', // Correo remitente
                to: correoCuenta, //Correo Destinatario (correo registrado en el formulario)
                subject: 'Código de desbloqueo', // Asunto
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
                            <h3>Se hace envío del código para dar desbloquear su cuenta.</h3>
                            <h3>Su código de desbloqueo es:</h3>
    
                            <div class="code">${nuevoCodigo}</div>
    
                            <h3>Este codigo expira en 5 minutos, procure utilizarlo pronto.</h3>
                            <h3>Si usted no ha solicitado este código de desbloqueo, ignore este mensaje.</h3>
                            <h3>Si no eres el destinatario no deberás imprimir, copiar, retransmitir, diseminar o hacer uso de la información de este correo.</h3>
                            <h1>¡Chirris Online!</h1>
                            <h3>En caso de querer actualizar la informacion de cuenta, hazlo directamente en tu perfil desde la App.</h3>
                        </div>
                    </div>
                </body>
                
                </html>
                `
                
                //Carta anterior (de prueba)
                //text: "Hola estimado usuario, se hace envio del codigo para dar de alta su cuenta registrada recientemente Su código de verificación es: " + codigoVerificacion + ". \n"
                //+"Si usted no ha solicitado este codigo de registro, ignore este mensaje"
                
            };
            await transporter.sendMail(correoDesbloqueo);

            


            
            //Toma id del usuario de alla arriba y actualiza el campo (para comparar con el que llega al correo en las siguientes lineas)
            await pool.query('UPDATE tblusuarios SET vchCodigoVerificacion = MD5(?) WHERE idUsuario = ?', [nuevoCodigo, id]);

             const nomUsuario = result[0][0].vchUsuario;
             console.log("nomUser: "+nomUsuario)
             console.log("codigo: "+nuevoCodigo)

             try{
                const [resultCuenta] = await pool.query('CALL SP_ObtenID_CuentaInactiva(?)', [nomUsuario]);
                //console.log("resultCuenta: ", resultCuenta[0].length);
                
                if (resultCuenta[0].length > 0) {
                    
                    
                    const id = resultCuenta[0][0].idUsuario //Obtenme el ID del registro realizado
                    const min = 300000; //Tiempo de espera (5min) para que expire el codigo (se elimine el registro)
                    //(30 segundos) -> 30000
                    //(5 minutos)   -> 300000
    





                    //Actualiza el campo codigo (expira), y el estado de la cuenta (la mantiene inactiva)
                    setTimeout(async () => {
                        await pool.query('UPDATE tblusuarios SET vchCodigoVerificacion ="" WHERE intEstadoCuenta = 0 AND idUsuario = ? ', [id]);
                    }, min);
                }
                return res.status(200).json(result);
             }
             catch(err){
                return res.status(500).json({ message: error.message });
             }
        }
        else{
            console.log("Usuario no encontrado")
            return res.status(200).json("");
            //return res.status(500).json({err});
        }
    }
    catch (error) {
        //console.log(err)
        return res.status(500).json({ message: error.message });
    }
}


const recuperaContra = async (req, res) => {
    //console.log(req.query.action)
    const { txtIdentidad } = req.body;
    try {
        const [result] = await pool.query('CALL SP_ObtenPregunta(?)', [txtIdentidad]);

        //console.log(result);
        //console.log(result[0]);
        //console.log(result[0].length);

        if (result[0].length > 0) {
            return res.status(200).json(result);
        } else {
            console.log("Usuario no encontrado");
            return res.status(200).json("");
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
        console.log("result: ",result)
        console.log("result[0]: ", result[0].length)

        if (result[0].length > 0) {
            //Informacion correcta (regresa la info)
            return res.status(200).json(result);
        } else {
            //Informacion incorrecta (no regresa nada)
            console.log("Respuesta incorrecta");
            return res.status(200).json("");
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
        await pool.query('CALL SP_ActualizaContrasena(?, ?, ?)', [txtNewContra, idCliente, 3]);
        return res.status(204).json(req.query);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}
