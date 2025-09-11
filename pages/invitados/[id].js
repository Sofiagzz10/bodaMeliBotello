import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Invitado() {
  const router = useRouter();
  const { id } = router.query;
  const [invitado, setInvitado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/invitado/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Datos del invitado recibidos:", data);
          setInvitado(data);
        })
        .catch(e => {
          console.error("Error al obtener datos del invitado:", e);
          setError(e.message);
        });
    }
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!invitado) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{invitado.nombre}</h1>
      <p>Invitados permitidos: {invitado.invitadosPermitidos}</p>
      {/* Aquí puedes agregar más detalles y el formulario */}
    </div>
  );
}
