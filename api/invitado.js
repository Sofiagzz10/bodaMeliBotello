const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const { method } = req;
    let id;
    if (req.url.startsWith('/api/invitado/')) {
      id = req.url.split('/').pop();
    } else {
      id = req.query.id;
    }
    console.log("ID recibido en la API:", id);

    if (!id) {
      return res.status(400).json({ error: 'Se requiere un ID' });
    }

    const baseUrl = `${process.env.FIREBASE_DATABASE_URL}/invitados/${id}`;

    if (method === 'GET') {
      const response = await fetch(`${baseUrl}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const invitado = await response.json();
      console.log("Datos del invitado:", invitado);
      if (!invitado) {
        console.log("Invitado no encontrado");
        return res.status(404).json({ error: 'Invitado no encontrado' });
      }
      return res.status(200).json({
        nombre: invitado.nombre,
        invitadosPermitidos: invitado.invitadosPermitidos,
        confirmacion: invitado.confirmacion,
        invitadosConfirmados: invitado.invitadosConfirmados
      });
    } else if (method === 'POST') {
      const { confirmacion, invitadosConfirmados } = req.body;
      console.log("Datos recibidos para actualizar:", { confirmacion, invitadosConfirmados });

      const updateData = {
        confirmacion,
        invitadosConfirmados
      };

      const response = await fetch(`${baseUrl}.json`, {
        method: 'PATCH',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Datos actualizados con éxito:", result);
      return res.status(200).json({ message: 'Datos actualizados con éxito', result });
    } else {
      return res.status(405).json({ error: 'Método no permitido' });
    }
  } catch (error) {
    console.error('Error detallado en la API:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message,
      stack: error.stack
    });
  }
};
