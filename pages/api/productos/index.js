import { useRouter } from 'next/router';
import { pool } from '../../../config/cnxBD';


export default async function handler(req, res) {

    switch (req.method) {
        case 'GET':
            return await obtenerProductos(req, res);


        case 'POST':
            return await guardarProducto(req, res);
    }
}

const obtenerProductos = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM tblproductos ORDER BY idProducto DESC')
        //console.log(result);
        //return res.status(200).json("Obteniendo productos");
        return res.status(200).json(result);
    }
    catch (err) {
        //console.log(err)
        return res.status(500).json({ err });
    }
}


const guardarProducto = async (req, res) => {
    try {
        const { txtNombre, txtDescripcion, txtPrecio } = req.body;

        const [result] = await pool.query('INSERT INTO tblproductos SET ?', {
            vchNombre: txtNombre,
            vchDescripcion: txtDescripcion,
            fltPrecio: txtPrecio
        });

        return res.status(200).json({ txtNombre, txtDescripcion, txtPrecio, id: result.insertId });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}