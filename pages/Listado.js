import axios from 'axios';
import { Layout } from '@/componentes/Layout';
import Link from 'next/link';
import { Navbar } from '@/componentes/Navbar';

function Listado({ productos }) {
  return (
    <Layout>
      <Navbar />
      {productos.map(producto => (
        <div className='contentMenu'>
          <div className="productCard">
            <div className="product">

              <div className="imgProduct">
                <img src={`/images/${producto.vchImage}`} alt="imgTest" />
              </div>

              <div className="namePrice_Product">
                <h2><b>{producto.vchNombre}</b></h2>
                <h3>Precio: ${producto.fltPrecio}</h3>
              </div>
            </div>
            <h4>{producto.vchDescripcion}</h4>

            <div className="buttons">
              <Link href={`/productos/${producto.idProducto}`} key={producto.id} >
                <button className="btnBuy" >
                  EDITAR
                </button>
              </Link>
              <button className="btnAddBasket">
                ELIMINAR
              </button>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { data: productos } = await axios.get("http://localhost:3000/api/productos");

  return {
    props: {
      productos,
    },
  };
};

export default Listado;