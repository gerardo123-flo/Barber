const BASE_URL = 'http://localhost:3000';

export const getServicios = async () => {
  const res = await fetch(`${BASE_URL}/servicios`);
  return res.json();
};

export const createServicio = async ({ descripcion, costo, duracion_minutos }) => {
  const res = await fetch(`${BASE_URL}/servicios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descripcion, costo, duracion_minutos }),
  });
  return res.json();
};

export const updateServicio = async (id, { descripcion, costo, duracion_minutos }) => {
  const res = await fetch(`${BASE_URL}/servicios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descripcion, costo, duracion_minutos }),
  });
  return res.json();
};

export const deleteServicio = async (id) => {
  const res = await fetch(`${BASE_URL}/servicios/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
