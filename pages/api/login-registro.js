import { pool } from '../../config/cnxBD';


export default async function handler(req, res) {
    const accion = req.query.action; // Para determinar la acción específica

    switch (accion) {
        //const action = req.query.action;

        case 'login': return await loginUsuario(req, res);
            //console.log(accion);

        case 'usuario': return await buscaUsuario(req, res);

        case 'correo': return await buscaCorreo(req, res);

        case 'registro': return await registraUsuario(req, res);

        case 'recuperaContra': return await recuperaContra(req, res);

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
        const [result] = await pool.query('SELECT * FROM tblclientes WHERE (vchCorreo = ? OR vchUsuario = ?) AND vchPassword = ?'
            , [txtIdentidad, txtIdentidad, txtPassword]);

        //console.log(result);
        if (result.length > 0) {
            console.log("Usuario autenticado:", result);
            return res.status(200).json("API Logeando...");
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

        const [result] = await pool.query('SELECT * FROM tblclientes WHERE vchUsuario = ?', [txtUsuario]);
        //console.log("Servidor result: ", result);

        if (result && result.length > 0) {
            console.log('Servidor: Usuario en uso-> ', result )
            return res.status(200).json("no");
        }
        else{
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

        const [result] = await pool.query('SELECT * FROM tblclientes WHERE vchCorreo = ?', [txtCorreo]);
        //console.log("Servidor result: ", result);

        if (result && result.length > 0) {
            console.log('Servidor: Usuario en uso-> ', result )
            return res.status(200).json("no");
        }
        else{
            return res.status(200).json("");
        }
        
        //return res.status(200).json(result);
    }   
    catch (err) {
        //console.log(err)
        return res.status(500).json({ err });
    }
}

const registraUsuario = async (req, res) => {
    //console.log(req.query.action)
    const { txtNombre, txtApepat, txtApemat, txtUsuario, txtTelefono, txtCorreo, txtPassword } = req.body

    try {
        const [result] = await pool.query('INSERT INTO tblclientes SET ?', {
            vchNombre: txtNombre,
            vchApepat: txtApepat,
            vchApemat: txtApemat,
            vchUsuario: txtUsuario,
            vchTelefono: txtTelefono,
            vchCorreo: txtCorreo,
            vchPassword: txtPassword,
        });

        return res.status(200).json({ txtUsuario, id: result.insertId });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const recuperaContra = async (req, res) => {
    //console.log(req.query.action)
    const { txtIdentidad } = req.body;
    try {
        const [result] = await pool.query('SELECT * FROM tblclientes WHERE (vchCorreo = ? OR vchUsuario = ?)'
            , [txtIdentidad, txtIdentidad]);
        console.log("(API r[]]): " + result[0].idCliente);

        if (result.length > 0) {
            //console.log("(API) id: "+result[0].idCliente);
            return res.status(200).json(result[0].idCliente);
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
        await pool.query('UPDATE tblclientes SET vchPassword = ? WHERE idCliente = ?',[txtNewContra, idCliente]);
        return res.status(204).json(req.query);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}