const BASE_URL = 'http://localhost:3000';

export const getBarberos = async () => {
  const res = await fetch(`${BASE_URL}/barberos`);
  return res.json();
};

export const createBarbero = async (nombre, sucursal_id) => {
  const res = await fetch(`${BASE_URL}/barberos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, sucursal_id }),
  });
  return res.json();
};

export const updateBarbero = async (id, nombre, sucursal_id) => {
  const res = await fetch(`${BASE_URL}/barberos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, sucursal_id }),
  });
  return res.json();
};

export const deleteBarbero = async (id) => {
  const res = await fetch(`${BASE_URL}/barberos/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};