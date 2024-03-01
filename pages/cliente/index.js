/*HOJA DE ESTILOS: indexCliente.css */
import { NavbarCliente } from '@/componentes/NavbarCliente';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


function HomePage({ productos }) {
  return (
    <div>
      <div className="banner">
        <h1>CHIRRIS</h1>
        <Image src={"/images/logoChirris.jpg"} width={100} height={100} alt="logoChirris" />
        <h1>HOUSE</h1>
      </div>

      <NavbarCliente />

      <div className="bodyMain">
        <div className="content_PublicMain">
          <div className='divWelcome'>
            <div className='infoName'>
              <h1>Bienvenido querido usuario!</h1>
              <br></br>
              <h3>Satisfazca su antojo de cafe con las multiples variedades de bebidas y postres disponibles</h3>
            </div>
          </div>

          <div className="contentCarousel">
            <h2>¡Prueba nuestra variedad de productos!</h2>

            <div className="divCarousel">
              <Carousel className="productsCarousel" autoPlay={true} interval={3000} showArrows={true} showThumbs={false} infiniteLoop={true}>
                {/* 
              <div>
                <img src="/images/carrusel/burger.jpg" alt="imagen-1" />
                <p className="legend">Anvorguesa</p>
              </div>
              */}
                <Image src="/images/carrusel/burger.jpg" alt="imagen-1" width={1000} height={0} />
                <Image src="/images/carrusel/cuernito.jpg" alt="imagen-2" width={1000} height={100} />
                <Image src="/images/carrusel/ensalada1.jpg" alt="imagen-2" width={1000} height={100} />
                <Image src="/images/carrusel/ensalada2.jpg" alt="imagen-2" width={1000} height={100} />
              </Carousel>
            </div>
          </div>
        </div>


        <div className="content_PublicMain">
          <div className="clientsPhotos">
            <h2>★ Productos top ★</h2>
          </div>

          <div className='divTimeService'>
            <div className='infoName'>
              <h1>En servicio de Lunes a Viernes!</h1>
              <h3>Puede acudir a nuestra sucursal en un horario de 8:00am a 6:00pm</h3>
            </div>
          </div>
        </div>
      </div>



      <h3 className="infoDireccion">
        Ubicado en colonia Tepoxteco, Carretera Huejutla - Chalahuiyapa S/N.
        Contactenos al 771-242-6625
      </h3>


    </div>
  )
}

export default HomePage;