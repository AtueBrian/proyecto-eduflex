// HeaderAdmin.jsx
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
export default function HeaderAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tipoUsuario");
  navigate("/"); // <<-- igual que tu ruta de Login
};

  return (
    <nav className="navbar navbar-expand-lg navbar-light my-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-color" to="/">EDUFLEX</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAdmin"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAdmin">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link fw-bold text-color" to="/Admin">Home</Link>
            </li>
            <li className="nav-item">
              <button 
                className="btn btn-link nav-link fw-bold text-color" 
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
