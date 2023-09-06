import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      window.location.reload();

      navigate("/Home");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  );
}

export default LogoutButton;