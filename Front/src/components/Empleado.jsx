import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import cat_escritura from '../assets/cat_escritura.jpg';
import cat_arte from '../assets/cat_arte.jpg';
import cat_papeleria from '../assets/cat_papeleria.jpg';
import cat_mochila from '../assets/cat_mochila.jpg';
import './Empleado.css';
import Header from "./Header"; // ruta relativa correcta
import ProductoCard from "./ProductoCard";

export default function Empleado() {
  const [productos, setProductos] = useState([]);

  // Traer productos destacados desde la API
  useEffect(() => {
  fetch("http://localhost:4000/api/productos")
    .then((res) => res.json())
    .then((data) => {
      // data.body es el array de productos
      const productosArray = Array.isArray(data.body) ? data.body : [];
      const destacados = productosArray.filter((p) => p.esDestacado).slice(0, 4);
      setProductos(destacados);
    })
    .catch((err) => console.error("Error al cargar productos:", err));
}, []);

  return (
    <>
    <Header />
    <div className="container text-center mt-4">
      {/* Título */}
      <div className="row mb-4">
        <div className="col">
          <h2>Productos Destacados</h2>
        </div>
      </div>

      {/* Productos */}
      <div className="row justify-content-center">
{productos.map((producto) => (
  <div key={producto.id} className="col-md-3 mb-4">
    <ProductoCard producto={producto} />
  </div>
))}
      </div>

      {/* Categorías */}
      <div className="mt-5">
        <h3>Categorías</h3>
        <div className="row mt-3">
          <div className="col-md-6 mb-6">
            <img src={cat_escritura} alt="" className="categoria-img" />
            <div className="border rounded p-3">Escritura</div>
          </div>
          <div className="col-md-6 mb-6">
            <img src={cat_arte} alt="" className="categoria-img" />
            <div className="border rounded p-3">Arte</div>
          </div>
          <div className="col-md-6 mb-6">
            <img src={cat_papeleria} alt="" className="categoria-img" />
            <div className="border rounded p-3">Papelería y Cuadernos</div>
            
          </div>
          <div className="col-md-6 mb-6">
            <img src={cat_mochila} alt="" className="categoria-img" />
            <div className="border rounded p-3">Mochilas y Cartucheras</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
