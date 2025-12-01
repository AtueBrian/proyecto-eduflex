import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Empleado from "./components/Empleado";
import Catalogo from "./components/Catalogo";
import GestionProductos from "./components/GestionProductos";
import GestionUsuarios from "./components/GestionUsuarios";
import GestionCategorias from "./components/GestionCategorias";
import Dashboard from "./components/Dashboard";
import DetalleProducto from "./components/DetalleProducto";
import Perfil from "./components/Perfil";

function App() {
  const tipoUsuario = localStorage.getItem("tipoUsuario");
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/Admin"
          element={
            token && tipoUsuario === "admin" ? <Admin /> : <Navigate to="/" />
          }
        />

        <Route
          path="/Empleado"
          element={
            token && tipoUsuario === "empleado" ? (
              <Empleado />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/Catalogo"
          element={token ? <Catalogo /> : <Navigate to="/" />}
        />

        {/* 👇 Mover estas rutas dentro de <Routes> 👇 */}
        <Route
          path="/Admin/GestionProductos"
          element={
            token && tipoUsuario === "admin" ? (
              <GestionProductos />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/Admin/GestionUsuarios"
          element={
            token && tipoUsuario === "admin" ? (
              <GestionUsuarios />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/Admin/GestionCategorias"
          element={
            token && tipoUsuario === "admin" ? (
              <GestionCategorias />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/Admin/Dashboard"
          element={
            token && tipoUsuario === "admin" ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/producto/:id"
          element={token ? <DetalleProducto/> : <Navigate to="/" />}
        />
        <Route
          path="/Perfil"
          element={token ? <Perfil/> : <Navigate to="/" />}
        />
      </Routes>
      
    </Router>
  );
}

export default App;
