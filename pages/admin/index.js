/*HOJA DE ESTILOS: indexCliente.css */
import { NavbarAdmin } from '@/componentes/NavbarAdmin';


function HomePage({ productos }) {
  return (
    <div>
      <NavbarAdmin />
      <div className='divMenu'>
        <div className='infoName'>
          <h1>Bienvenido querido usuario!</h1>
          <h3>Satisfazca su antojo de cafe con las multiples variedades de bebidas disponibles</h3>
        </div>
      </div>

      <div className='divMenu'>
        <div className='infoName'>
          <h1>En servicio de Lunes a Viernes!</h1>
          <h3>Puede acudir a nuestra sucursal en un horario de 8:00am a 6:00pm</h3>
        </div>
      </div>


    </div>
  )
}

export default HomePage;