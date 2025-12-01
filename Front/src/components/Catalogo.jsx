import { useEffect, useState } from "react";
import Header from "./Header"; // ruta relativa correcta
import ProductoCard from "./ProductoCard";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroOferta, setFiltroOferta] = useState(false);

  useEffect(() => {
    // Traer productos
    fetch("http://localhost:4000/api/productos")
      .then(res => res.json())
      .then(data => {
        const productosArray = Array.isArray(data.body) ? data.body : [];
        setProductos(productosArray);
      })
      .catch(err => console.error(err));

    // Traer categorias
    fetch("http://localhost:4000/api/categorias")
      .then(res => res.json())
      .then(data => setCategorias(Array.isArray(data.body) ? data.body : []))
      .catch(err => console.error(err));
  }, []);
  // Filtrado
  const productosFiltrados = productos.filter(p => {
  // Asegurarse que los tipos coincidan
  const categoriaProducto = Number(p.categoria); // convertir a número si viene como string
  return (
    (filtroCategoria ? categoriaProducto === filtroCategoria : true) &&
    (!filtroOferta || p.oferta)
  );
});

  return (
    <>
    <Header/>
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar de filtros */}
        <div className="col-md-3">
          <div className="card p-3 mb-3">
            <h5>Filtrar</h5>

            <div className="mb-3">
              <label>Categoría:</label>
                <select
                className="form-select"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(Number(e.target.value))}
                >
                <option value="">Todas</option>
                {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
                </select>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                id="oferta"
                className="form-check-input"
                checked={filtroOferta}
                onChange={() => setFiltroOferta(!filtroOferta)}
              />
              <label className="form-check-label" htmlFor="oferta">
                Solo en oferta
              </label>
            </div>
          </div>
        </div>

        {/* Productos */}
<div className="col-md-9">
  <h3>Catálogo</h3>
  <div className="row">
    {productosFiltrados.map((producto) => (
      <div key={producto.id} className="col-md-3 mb-4">
        <ProductoCard producto={producto} />
      </div>
    ))}
  </div>
</div>
      </div>
    </div>
    </>
  );
}
