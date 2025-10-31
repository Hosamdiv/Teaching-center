import { RouterProvider } from "react-router";
import router from "./routes";
import { ToastContainer } from "react-toastify";

const App = () => {

  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;