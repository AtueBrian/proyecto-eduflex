// GestionUsuarios.jsx
import ABMGenerico from "./ABMGenerico";
import HeaderAdmin from "./HeaderAdmin";

export default function GestionUsuarios() {
  return (
    <>
    <HeaderAdmin/>
    <ABMGenerico
      entidad="Clientes"
      columnas={["id", "usuario", "nombre", "puntos", "tipoUsuario"]}
      endpoint="http://localhost:4000/api/clientes"
    />
    </>
  );
}
