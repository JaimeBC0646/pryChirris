import { Navbar } from '@/componentes/Navbar';
import { NavbarCliente } from '@/componentes/NavbarCliente';
import { NavbarEmpleado } from '@/componentes/NavbarEmpleado';
import { NavbarAdmin } from '@/componentes/NavbarAdmin';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavbarJADE from './NavbarJADE';


//({ productos })
function StylesTest() {
  return (
    <div>
      <div className= "space3">
        asd
      </div>
      <NavbarJADE />
      <div className= "space3">
        asd
      </div>
      

    </div>
  )
}

export default StylesTest;