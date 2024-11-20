import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Donation from "./component/Donation";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./component/DashBoard";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donation" element={<Donation />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
