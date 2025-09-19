const BASE_URL = 'http://localhost:3000';

export const getClientes = async () => {
  const res = await fetch(`${BASE_URL}/clientes`);
  return res.json();
};

export const createCliente = async ({ nombre, telefono, email }) => {
  const res = await fetch(`${BASE_URL}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, telefono, email }),
  });
  return res.json();
};

export const updateCliente = async (id, { nombre, telefono, email }) => {
  const res = await fetch(`${BASE_URL}/clientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, telefono, email }),
  });
  return res.json();
};

export const deleteCliente = async (id) => {
  const res = await fetch(`${BASE_URL}/clientes/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
