// GestionProductos.jsx
import ABMGenerico from "./ABMGenerico";
import HeaderAdmin from "./HeaderAdmin";

export default function GestionProductos() {
  return (
  <>
  <HeaderAdmin/>
    <ABMGenerico
      entidad="Producto"
      columnas={["id", "nombre", "puntosRequeridos", "stock", "categoria", "esDestacado", "imagen"]}
      endpoint="http://localhost:4000/api/productos"
    />
    </>
  );
}
