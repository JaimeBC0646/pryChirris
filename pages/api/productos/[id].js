import { pool } from "../../../config/cnxBD";

export default async function handler(req, res) {

    const obtenerProducto = async (req, res) => {
        try {
            const { id } = req.query;
            const [result] = await pool.query('SELECT * FROM tblproductos WHERE idProducto = ?', [id])
            return res.status(200).json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    const eliminarProducto = async (req, res) => {
        try {
            const { id } = req.query;
            await pool.query('DELETE FROM tblproductos WHERE idProducto = ?', [id])
            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    const actualizarProducto = async (req, res) => {
        const { id } = req.query;
        const { txtNombre, txtDescripcion, txtPrecio } = req.body;

        try {
            await pool.query('UPDATE tblproductos SET vchNombre = ?, vchDescripcion = ?, fltPrecio = ? WHERE idProducto = ?',
                [txtNombre, txtDescripcion, txtPrecio, id]
            );
            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }

    }

    switch (req.method) {
        case 'GET':
            return await obtenerProducto(req, res);

        case 'DELETE':
            return await eliminarProducto(req, res);

        case 'PUT':
            return await actualizarProducto(req, res);

        default:
            break;
    }
}