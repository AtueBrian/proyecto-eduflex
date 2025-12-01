
import { useNavigate } from "react-router-dom";


export default function ProductoCard({ producto }) {
  const navigate = useNavigate();

  const handleVerMas = () => {
    navigate(`/producto/${producto.id}`); // redirige al detalle
  };

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={producto.imagen ? `http://localhost:4000/uploads/${producto.imagen}` : "https://via.placeholder.com/300"}
        className="card-img-top"
        alt={producto.nombre}
      />
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text text-muted">{producto.descripcion?.slice(0, 50)}...</p>
        <p className="text-success">{producto.oferta ? "En oferta" : ""}</p>
        <p>Puntos: {producto.puntosRequeridos}</p>
        <button className="btn btn-outline-dark" onClick={handleVerMas}>
          Ver más
        </button>
      </div>
    </div>
  );
}
