/* ---| COMPONENTES |--- */
//import 'react-toastify/dist/ReactToastify.css'


/* ---| ESTILOS DE VISTAS |--- */
import "@/styles/globals.css";
//import '../styles/banner.css'

// --- Publico --- //
import '../styles/navbar.css'
import '../styles/login.css'

import '../styles/email.css'

import '../styles/registro.css'
import '../styles/recuperarContrasena.css'
import '../styles/digitalMenu.css'

// --- Cliente --- //
import '../styles/estilosCliente/cliente_Index.css'



export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
