/*HOJA DE ESTILOS: digitalMenu_Cliente.css */
import axios from 'axios';
import { Layout } from '@/componentes/Layout';
import Link from 'next/link';
import { NavbarCliente } from '@/componentes/NavbarCliente';

function Listado({ productos }) {
  return (
    <Layout>
      <NavbarCliente />
      {productos.map(producto => (
        <div className='contentMenu'>
          <div className="productCard">
            <div className="product">

              <div className="imgProduct">
                <img src={`/images/productos/${producto.vchImage}`} alt="imgTest" />
              </div>

              <div className="namePrice_Product">
                <h2><b>{producto.vchNombre}</b></h2>
                <h3>Precio: ${producto.fltPrecio}</h3>
              </div>
            </div>
            <h4>{producto.vchDescripcion}</h4>

            <div className="buttons">
              {/* <button className="btnBuy" >
                  EDITAR
                </button>*/}
                
              <Link href={`/productos/${producto.idProducto}`} key={producto.id} >
                  Agregar a la Canasta
              </Link>
              <button className="btnAddBasket">
                Comprar Ahora
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