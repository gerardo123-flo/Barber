import { useEffect, useState } from 'react';
import {
  getServicios,
  createServicio,
  updateServicio,
  deleteServicio,
} from '../api/servicios';

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({ descripcion: '', costo: '', duracion_minutos: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    const data = await getServicios();
    setServicios(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateServicio(editId, form);
    } else {
      await createServicio(form);
    }
    setForm({ descripcion: '', costo: '', duracion_minutos: '' });
    setEditId(null);
    cargarServicios();
  };

  const handleEdit = (servicio) => {
    setForm({
      descripcion: servicio.descripcion,
      costo: servicio.costo,
      duracion_minutos: servicio.duracion_minutos,
    });
    setEditId(servicio.id);
  };

  const handleDelete = async (id) => {
    await deleteServicio(id);
    cargarServicios();
  };

  return (
    <div>
      <h2>Gestión de Servicios</h2>
      <form onSubmit={handleSubmit}>
        <input value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Descripción" />
        <input value={form.costo} onChange={(e) => setForm({ ...form, costo: e.target.value })} placeholder="Costo" />
        <input value={form.duracion_minutos} onChange={(e) => setForm({ ...form, duracion_minutos: e.target.value })} placeholder="Duración (min)" />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Descripción</th><th>Costo</th><th>Duración</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td><td>{s.descripcion}</td><td>{s.costo}</td><td>{s.duracion_minutos}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Editar</button>
                <button onClick={() => handleDelete(s.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
