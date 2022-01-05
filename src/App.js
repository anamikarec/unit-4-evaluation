import "./styles.css";

import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar";
import AllRoutes from "./route/AllRoutes";
export default function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
    </div>
  );
}
