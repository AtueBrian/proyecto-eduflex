import { useState, useEffect } from "react";

export default function ABMGenerico({ entidad, columnas, endpoint }) {
  const [datos, setDatos] = useState([]);
  const [nuevoRegistro, setNuevoRegistro] = useState({});
  const [originalRegistro, setOriginalRegistro] = useState({});
  const [editando, setEditando] = useState(null); // id que se está editando

  const token = localStorage.getItem("token");

  // Cargar datos
  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setDatos(data.body || []))
      .catch((err) => console.error(err));
  }, [endpoint]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setNuevoRegistro({ ...nuevoRegistro, [e.target.name]: e.target.value });
  };

  // Crear registro nuevo
  const handleGuardar = () => {
    const registroAEnviar = { ...nuevoRegistro, id: 0 };

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(registroAEnviar),
    })
      .then(() => alert(`${entidad} agregado con éxito`))
      .then(() => window.location.reload());
  };

  // Confirmar edición
  const handleActualizar = () => {
    if (!editando) return;

    const cambios = {};

    // Solo enviamos campos que cambiaron
    Object.keys(nuevoRegistro).forEach((key) => {
      if (nuevoRegistro[key] !== originalRegistro[key]) {
        cambios[key] = nuevoRegistro[key];
      }
    });

    if (Object.keys(cambios).length === 0) {
      alert("No se realizaron cambios.");
      return;
    }

    // Enviar solo cambios y el id
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: editando, ...cambios }),
    })
      .then(() => alert(`${entidad} actualizado con éxito`))
      .then(() => window.location.reload());
  };

  // Eliminar registro
  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este registro?")) {
      fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      })
        .then(() => alert(`${entidad} eliminado con éxito`))
        .then(() => window.location.reload());
    }
  };

  // Cargar registro seleccionado para editar
  const handleEditar = (item) => {
    setEditando(item.id);
    setNuevoRegistro(item);       // datos para el formulario
    setOriginalRegistro(item);    // copia para comparar cambios
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de {entidad}</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            {columnas.map((col) => (
              <th key={col}>{col}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(datos) && datos.length > 0 ? (
            datos.map((item) => (
              <tr key={item.id}>
                {columnas.map((col) => (
                  <td key={col}>{item[col]}</td>
                ))}
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditar(item)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(item.id)}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnas.length + 1}>No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>

      <h4>{editando ? `Editar ${entidad}` : `Nuevo ${entidad}`}</h4>

      {columnas
        .filter((col) => col !== "id")
        .map((col) => (
          <input
            key={col}
            name={col}
            placeholder={col}
            value={nuevoRegistro[col] || ""}
            onChange={handleChange}
            type={col.toLowerCase().includes("contraseña") ? "password" : "text"} // input password si contiene "contraseña"
            className="form-control mb-2"
          />
        ))}

      {editando ? (
        <button className="btn btn-success" onClick={handleActualizar}>
          Actualizar {entidad}
        </button>
      ) : (
        <button className="btn btn-primary" onClick={handleGuardar}>
          Guardar {entidad}
        </button>
      )}
    </div>
  );
}
