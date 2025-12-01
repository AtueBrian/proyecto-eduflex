import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MiLogo</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/Empleado">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Catalogo">Catalogo</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/ayuda">Ayuda</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Perfil">Mi Perfil</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
