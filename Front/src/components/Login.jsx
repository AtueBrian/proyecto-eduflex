import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css"

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await res.json();
      console.log("Respuesta del backend:", data)
      if (!res.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      localStorage.setItem("token", data.body.token);
      localStorage.setItem("idCliente", data.body.idCliente);
      localStorage.setItem("tipoUsuario", data.body.tipoUsuario);
      setSuccess("Inicio de sesión exitoso ✅");

      // Navegación según tipoUsuario
      if (data.body.tipoUsuario === "admin") {
        navigate("/Admin");
        window.location.reload()
      } else {
        navigate("/Empleado");
        window.location.reload()
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <img src="" alt="" />
        <h2>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Username"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Conectando..." : "Ingresar"}
        </button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}
