import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { getCitas, createCita, updateCita, deleteCita } from '../api/citas';
import { getBarberos } from '../api/barberos';
import { getClientes } from '../api/clientes';
import { getServicios } from '../api/servicios';

export default function Citas() {
  const [citas, setCitas] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);

  const [form, setForm] = useState({
    barbero_id: '',
    cliente_id: '',
    servicio_id: '',
    fecha: '',
    hora: '',
    estado: '',
    notas: '',
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    cargarCitas();
    cargarOpciones();
  }, []);

  const cargarCitas = async () => {
    const data = await getCitas();
    setCitas(data);
  };

  const cargarOpciones = async () => {
    const [barb, cli, serv] = await Promise.all([
      getBarberos(),
      getClientes(),
      getServicios(),
    ]);
    setBarberos(barb);
    setClientes(cli);
    setServicios(serv);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateCita(editId, form);
    } else {
      await createCita(form);
    }
    setForm({
      barbero_id: '',
      cliente_id: '',
      servicio_id: '',
      fecha: '',
      hora: '',
      estado: '',
      notas: '',
    });
    setEditId(null);
    cargarCitas();
  };

  const handleEdit = (cita) => {
    setForm({
      barbero_id: cita.barbero_id,
      cliente_id: cita.cliente_id,
      servicio_id: cita.servicio_id,
      fecha: cita.fecha,
      hora: cita.hora,
      estado: cita.estado,
      notas: cita.notas,
    });
    setEditId(cita.id);
  };

  const handleDelete = async (id) => {
    await deleteCita(id);
    cargarCitas();
  };

  return (
    <div>
      <h2>Gestión de Citas</h2>
      <form onSubmit={handleSubmit}>
        <select value={form.barbero_id} onChange={(e) => setForm({ ...form, barbero_id: e.target.value })}>
          <option value="">Selecciona Barbero</option>
          {barberos.map((b) => (
            <option key={b.id} value={b.id}>{b.nombre}</option>
          ))}
        </select>

        <select value={form.cliente_id} onChange={(e) => setForm({ ...form, cliente_id: e.target.value })}>
          <option value="">Selecciona Cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <select value={form.servicio_id} onChange={(e) => setForm({ ...form, servicio_id: e.target.value })}>
          <option value="">Selecciona Servicio</option>
          {servicios.map((s) => (
            <option key={s.id} value={s.id}>{s.descripcion}</option>
          ))}
        </select>

        <DatePicker
          selected={form.fecha ? new Date(form.fecha) : null}
          onChange={(date) => setForm({ ...form, fecha: date.toISOString().split('T')[0] })}
          dateFormat="yyyy-MM-dd"
          placeholderText="Selecciona fecha"
        />

        <select value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })}>
          <option value="">Selecciona hora</option>
          {['09:00', '10:00', '11:00', '12:00', '13:00', '15:00', '16:00'].map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>

        <input
          value={form.estado}
          onChange={(e) => setForm({ ...form, estado: e.target.value })}
          placeholder="Estado"
        />
        <input
          value={form.notas}
          onChange={(e) => setForm({ ...form, notas: e.target.value })}
          placeholder="Notas"
        />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Barbero</th>
            <th>Cliente</th>
            <th>Servicio</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Notas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.id}</td>
              <td>{cita.barbero}</td>
              <td>{cita.cliente}</td>
              <td>{cita.servicio}</td>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>{cita.estado}</td>
              <td>{cita.notas}</td>
              <td>
                <button onClick={() => handleEdit(cita)}>Editar</button>
                <button onClick={() => handleDelete(cita.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
