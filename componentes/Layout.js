import { ToastContainer } from "react-toastify";

export function Layout({children}) {
  return <>
    <div>
        <div>{children}</div>
    </div>

    <ToastContainer />
    </>
  
}
