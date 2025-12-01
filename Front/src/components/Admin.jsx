import { Link } from "react-router-dom";
import gestion_producto from "../assets/gestion_producto.png";
import gestion_usuario from "../assets/gestion_usuario.png";
import gestion_categoria from "../assets/gestion_categoria.png";
import gestion_dashboard from "../assets/gestion_dashboard.png";
import "./Admin.css";
import HeaderAdmin from "./HeaderAdmin"; // ruta relativa correcta

export default function Admin() {
  return (
    <>
      <HeaderAdmin/>
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col">
          <h1>Gestión</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <Link to="/Admin/GestionProductos" className="text-decoration-none text-dark">
            <div className="card h-100 shadow-sm">
              <img src={gestion_producto} className="img" alt="" />
              <div className="card-body">
                <h5 className="card-title">Productos</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 mb-3">
          <Link to="/Admin/GestionUsuarios" className="text-decoration-none text-dark">
            <div className="card h-100 shadow-sm">
              <img src={gestion_usuario} className="img" alt="" />
              <div className="card-body">
                <h5 className="card-title">Usuarios</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 mb-3">
          <Link to="/Admin/GestionCategorias" className="text-decoration-none text-dark">
            <div className="card h-100 shadow-sm">
              <img src={gestion_categoria} className="img" alt="" />
              <div className="card-body">
                <h5 className="card-title">Categorías</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 mb-3">
          <Link to="/Admin/Dashboard" className="text-decoration-none text-dark">
            <div className="card h-100 shadow-sm">
              <img src={gestion_dashboard} className="img" alt="" />
              <div className="card-body">
                <h5 className="card-title">Dashboard</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
