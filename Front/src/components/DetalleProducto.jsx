import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import './DetalleProducto.css';

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");

  const idCliente = localStorage.getItem("idCliente"); // ejemplo

  useEffect(() => {
    fetch(`http://localhost:4000/api/productos/${id}`)
      .then(res => res.json())
      .then(data => {
        const productoData = Array.isArray(data.body) ? data.body[0] : data.body;
        setProducto(productoData);
      })
      .catch(err => console.error(err));
  }, [id]);

  const realizarCanje = async () => {
    if (!idCliente) {
      setMensaje("Debes iniciar sesión para canjear.");
      return;
    }

    const body = {
      idCliente: parseInt(idCliente),
      idProducto: producto.id,
      cantidad: parseInt(cantidad)
    };
    
const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:4000/api/canjes", {
        method: "POST",
        headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
       },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.body || "Error al realizar el canje");
      }

      setMensaje("✅ Canje realizado con éxito!");
      setMostrarModal(false);
    } catch (err) {
      setMensaje("❌ " + err.message);
    }
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>{producto.nombre}</h2>
        <div className="imagen-detalle mb-3">
          <img
            src={producto.imagen ? `http://localhost:4000/uploads/${producto.imagen}` : "/assets/no-image.png"}
            alt={producto.nombre}
            className="img-fluid w-100 h-100 object-fit-cover"
          />
        </div>

        <p>{producto.descripcion}</p>
        <p>Puntos requeridos: {producto.puntosRequeridos}</p>

        <button className="btn btn-success" onClick={() => setMostrarModal(true)}>
          Canjear
        </button>

        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      </div>

      {/* Modal de confirmación */}
      {mostrarModal && (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar canje</h5>
                <button className="btn-close" onClick={() => setMostrarModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>¿Deseás canjear <strong>{producto.nombre}</strong> por {producto.puntosRequeridos} puntos?</p>
                <div className="mb-3">
                  <label>Cantidad:</label>
                  <input
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    className="form-control"
                    style={{ width: "100px" }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>
                  Cancelar
                </button>
                <button className="btn btn-success" onClick={realizarCanje}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
