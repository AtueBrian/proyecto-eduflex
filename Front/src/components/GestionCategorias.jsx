// GestionCategorias.jsx
import ABMGenerico from "./ABMGenerico";
import HeaderAdmin from "./HeaderAdmin";

export default function GestionCategorias() {
  return (
    <>
    <HeaderAdmin/>
    <ABMGenerico
      entidad="Categorías"
      columnas={["id", "nombre",]}
      endpoint="http://localhost:4000/api/categorias"
    />
    </>
  );
}
