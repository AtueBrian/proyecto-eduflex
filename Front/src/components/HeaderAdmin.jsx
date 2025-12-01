// HeaderAdmin.jsx
import { Link, useNavigate } from "react-router-dom";

export default function HeaderAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tipoUsuario");
  navigate("/"); // <<-- igual que tu ruta de Login
};

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MiLogo</Link>
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
              <Link className="nav-link" to="/Admin">Home</Link>
            </li>
            <li className="nav-item">
              <button 
                className="btn btn-link nav-link" 
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
