import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export function FormProducto() {
    // ENRUTADOR PARA REDIRIGIR
    const router = useRouter();

    // FUNCIONES PARA FORM
    const [producto, setProducto] = useState({
        txtNombre: "",
        txtDescripcion: "",
        txtPrecio: 0
    });

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const { data } = await axios.get('/api/productos/' + router.query.id)
                /*console.log("DATA: ")
                console.log(data);
                console.log("PRODUCTO: ");
                console.log(producto);*/
                setProducto({
                    txtNombre: data.vchNombre || "",
                    txtDescripcion: data.vchDescripcion || "",
                    txtPrecio: data.fltPrecio || 0
                });
                console.log("Actualizando... " + producto);
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            }
        }

        if (router.query.id) {
            //console.log(router.query.id)
            obtenerProducto(router.query.id)
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (router.query.id) {
                await axios.put("/api/productos/" + router.query.id, producto)
                //toast.success(router.query.id);
                console.log("Actualizando ID: " + router.query.id)
            }
            else {
                await axios.post("/api/productos", producto)
                //toast.success("Producto dado de alta!");
                console.log("Producto creado");
                //console.log(res);
            }
            router.push('/Listado');
        }
        catch (error) {
            //console.log(error.response)
            toast.error("Por favor no deje campos vacios y que correspondan al tipo de dato");
        }
    };

    const handleChange = ({ target: { name, value } }) => {
    //const handleChange = (e) => {
        //console.log(e.target.name, e.target.value);
        //const { name, value } = e.target;
        setProducto(prevProducto => ({ ...prevProducto, [name]: value }));
        //setProducto({ ...producto, [name]: value })
        console.log(name + " =  " + value);

        console.log(router.pathname)
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>

                <label htmlFor="txtNombre">Nombre de Producto: </label>
                <input type="text" name="txtNombre" placeholder='Frape' onChange={handleChange} value={producto.txtNombre} />

                <label htmlFor="txtDescripcion">Descripcion: </label>
                <input type="text" name="txtDescripcion" id="txtDescripcion" placeholder="Bebida fria" onChange={handleChange} value={producto.txtDescripcion} />

                <label htmlFor="txtPrecio">Precio: </label>
                <input type="text" name="txtPrecio" id="txtPrecio" placeholder="$ 0.00" onChange={handleChange} value={producto.txtPrecio} />

                <button>
                    {router.query.id ? 'Actualizar Producto' : 'Agregar Producto'}
                </button>
            </form>
        </div>
    )
}