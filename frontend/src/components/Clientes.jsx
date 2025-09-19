import { useEffect, useState } from 'react';
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from '../api/clientes';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    const data = await getClientes();
    setClientes(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateCliente(editId, form);
    } else {
      await createCliente(form);
    }
    setForm({ nombre: '', telefono: '', email: '' });
    setEditId(null);
    cargarClientes();
  };

  const handleEdit = (cliente) => {
    setForm({
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      email: cliente.email,
    });
    setEditId(cliente.id);
  };

  const handleDelete = async (id) => {
    await deleteCliente(id);
    cargarClientes();
  };

  return (
    <div>
      <h2>Gestión de Clientes</h2>
      <form onSubmit={handleSubmit}>
        <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre" />
        <input value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="Teléfono" />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Teléfono</th><th>Email</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td><td>{c.nombre}</td><td>{c.telefono}</td><td>{c.email}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Editar</button>
                <button onClick={() => handleDelete(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
