import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import router from "./routes";

const App = () => {

  return (
    <div>

      <ToastContainer />
      <RouterProvider router={router} />

    </div>
  );
};

export default App;