const BASE_URL = 'http://localhost:3000';

export const getCitas = async () => {
  const res = await fetch(`${BASE_URL}/citas`);
  return res.json();
};

export const createCita = async ({
  barbero_id,
  cliente_id,
  servicio_id,
  sucursal_id, // Campo añadido
  fecha,
  hora,
  estado,
  notas,
}) => {
  const res = await fetch(`${BASE_URL}/citas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      barbero_id,
      cliente_id,
      servicio_id,
      sucursal_id, // Campo añadido
      fecha,
      hora,
      estado,
      notas,
    }),
  });
  return res.json();
};

export const updateCita = async (
  id,
  { barbero_id, cliente_id, servicio_id, sucursal_id, fecha, hora, estado, notas } // Campo añadido
) => {
  const res = await fetch(`${BASE_URL}/citas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      barbero_id,
      cliente_id,
      servicio_id,
      sucursal_id, // Campo añadido
      fecha,
      hora,
      estado,
      notas,
    }),
  });
  return res.json();
};

export const deleteCita = async (id) => {
  const res = await fetch(`${BASE_URL}/citas/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};