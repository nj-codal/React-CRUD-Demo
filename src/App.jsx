import { ToastContainer } from "react-toastify";
import SiteRoutes from "@/SiteRoutes";

const App = () => (
  <>
    <SiteRoutes />
    <ToastContainer
      autoClose={5000}
      bodyClassName="nj_toast_body"
      className="nj_toast_wrapper"
      closeOnClick
      draggable
      hideProgressBar
      newestOnTop
      pauseOnFocusLoss
      pauseOnHover
      position="top-right"
      progressClassName="nj_toast_progress"
      rtl={false}
      toastClassName="nj_toast"
    />
  </>
);

export default App;
