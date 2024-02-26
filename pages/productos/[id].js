import axios from "axios";
import { useRouter } from "next/router";
import { Layout } from "../../componentes/Layout";
import Image from "next/image";

function VistaProducto({ producto }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    //console.log(id)
    await axios.delete('/api/productos/' + id);
    //console.log(res);
    router.push("/Listado");
  }

  return (
    <Layout>
      <div className="productCard">
        <div className="product">
          
            <div className="imgProduct">
              <Image src={`/images/${producto.vchImage}`} alt="imgTest" width={100} height={100} />
            </div>
            
          <div className="namePrice_Product">
            <h2><b>{producto.vchNombre}</b></h2>
            <h3>Precio: ${producto.fltPrecio}</h3>
          </div>
        </div>
        <h4>{producto.vchDescripcion}</h4>

        <div className="buttons">
          <button className="btnBuy" onClick={() => router.push("/productos/edit/" + producto.idProducto)}>
            EDITAR
          </button>

          <button className="btnAddBasket" onClick={() => handleDelete(producto.idProducto)}>
            ELIMINAR
          </button>
        </div>
      </div>

    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { data: producto } = await axios.get('http://localhost:3000/api/productos/' + context.query.id);

  return {
    props: {
      producto,
    },
  };
};

export default VistaProducto;