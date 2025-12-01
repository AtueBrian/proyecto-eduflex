import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // ruta relativa correcta

export default function Perfil() {
  const navigate = useNavigate(); // ✅ nombre correcto

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idCliente");
    navigate("/"); // ✅ redirección segura
  };

  const [perfil, setPerfil] = useState({});
  const [canjes, setCanjes] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("idCliente");
    if (!userId) return;

    // Perfil
    fetch(`http://localhost:4000/api/clientes/${userId}`)
      .then(res => res.json())
      .then(data => setPerfil(data.body[0]));

    // Canjes con detalle de productos
    fetch(`http://localhost:4000/api/canjes/${userId}`)
      .then(res => res.json())
      .then(data => setCanjes(data.body));
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>Mi Perfil</h2>
        <p><strong>Nombre:</strong> {perfil.nombre}</p>
        <p><strong>Profesión:</strong> {perfil.profesion}</p>
        <p><strong>Puntos:</strong> {perfil.puntos}</p>

        <h3 className="mt-4 mb-3">Historial de Canjes</h3>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {canjes.map((canje) => (
            <div key={canje.idCanje} className="col">
              <div className="card h-100 shadow-sm">
                <img
                  src={canje.imagen}
                  className="card-img-top"
                  alt={canje.nombre}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{canje.nombre}</h5>
                  <p className="mb-1"><strong>Cantidad:</strong> {canje.cantidad}</p>
                  <p className="mb-1"><strong>Puntos usados:</strong> {canje.puntosUsados}</p>
                  <p className="mt-auto text-muted" style={{ fontSize: "0.9rem" }}>
                    {new Date(canje.fechaCanje).toLocaleString('es-AR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-danger mt-4" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </>
  );
}
