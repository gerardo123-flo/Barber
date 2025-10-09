const BASE_URL = 'http://localhost:3000';

export const getSucursales = async () => {
  const res = await fetch(`${BASE_URL}/sucursales`);
  return res.json();
};

export const createSucursal = async (direccion) => {
  const res = await fetch(`${BASE_URL}/sucursales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ direccion }),
  });
  return res.json();
};

export const updateSucursal = async (id, direccion) => {
  const res = await fetch(`${BASE_URL}/sucursales/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ direccion }),
  });
  return res.json();
};

export const deleteSucursal = async (id) => {
  const res = await fetch(`${BASE_URL}/sucursales/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};