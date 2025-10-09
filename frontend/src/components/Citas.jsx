import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { getCitas, createCita, updateCita, deleteCita } from '../api/citas';
import { getBarberos } from '../api/barberos';
import { getClientes } from '../api/clientes';
import { getServicios } from '../api/servicios';
import { getSucursales } from '../api/sucursales';

export default function Citas() {
  const [citas, setCitas] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const [form, setForm] = useState({
    barbero_id: '',
    cliente_id: '',
    servicio_id: '',
    sucursal_id: '',
    fecha: null,
    hora: '',
    estado: 'pendiente',
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
    const [barb, cli, serv, suc] = await Promise.all([
      getBarberos(),
      getClientes(),
      getServicios(),
      getSucursales(),
    ]);
    setBarberos(barb);
    setClientes(cli);
    setServicios(serv);
    setSucursales(suc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const citaData = {
      ...form,
      fecha: form.fecha ? form.fecha.toISOString().split('T')[0] : '',
    };

    if (editId) {
      await updateCita(editId, citaData);
    } else {
      await createCita(citaData);
      // Limpiar el formulario SÓLO después de crear una cita nueva
      setForm({
        barbero_id: '',
        cliente_id: '',
        servicio_id: '',
        sucursal_id: '',
        fecha: null,
        hora: '',
        estado: 'pendiente',
        notas: '',
      });
    }

    // Esto se ejecuta en ambos casos para salir del modo edición y refrescar la lista
    setEditId(null);
    cargarCitas();
  };

  const handleEdit = (cita) => {
    setForm({
      barbero_id: cita.barbero_id,
      cliente_id: cita.cliente_id,
      servicio_id: cita.servicio_id,
      sucursal_id: cita.sucursal_id,
      fecha: cita.fecha ? new Date(cita.fecha) : null,
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
      <form onSubmit={handleSubmit} className="citas-form">
        <select value={form.sucursal_id} onChange={(e) => setForm({ ...form, sucursal_id: e.target.value, barbero_id: '' })} required>
          <option value="">Selecciona Sucursal</option>
          {sucursales.map((s) => (
            <option key={s.id} value={s.id}>{s.direccion}</option>
          ))}
        </select>

        <select value={form.barbero_id} onChange={(e) => setForm({ ...form, barbero_id: e.target.value })} required disabled={!form.sucursal_id}>
          <option value="">Selecciona Barbero</option>
          {barberos
            .filter(b => b.sucursal_id == form.sucursal_id)
            .map((b) => (
              <option key={b.id} value={b.id}>{b.nombre}</option>
            ))}
        </select>

        <select value={form.cliente_id} onChange={(e) => setForm({ ...form, cliente_id: e.target.value })} required>
          <option value="">Selecciona Cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <select value={form.servicio_id} onChange={(e) => setForm({ ...form, servicio_id: e.target.value })} required>
          <option value="">Selecciona Servicio</option>
          {servicios.map((s) => (
            <option key={s.id} value={s.id}>{s.descripcion}</option>
          ))}
        </select>

        <DatePicker
          selected={form.fecha}
          onChange={(date) => setForm({ ...form, fecha: date })}
          dateFormat="yyyy-MM-dd"
          placeholderText="Selecciona fecha"
          required
        />

        <select value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })} required>
            <option value="">Selecciona hora</option>
            {['09:00:00', '10:00:00', '11:00:00', '12:00:00', '14:00:00', '15:00:00', '16:00:00'].map(h => (
                <option key={h} value={h}>{h}</option>
            ))}
        </select>

        <select value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })} required>
            <option value="pendiente">Pendiente</option>
            <option value="confirmada">Confirmada</option>
            <option value="completada">Completada</option>
            <option value="cancelada">Cancelada</option>
        </select>

        <input
            type="text"
            value={form.notas}
            onChange={(e) => setForm({ ...form, notas: e.target.value })}
            placeholder="Notas adicionales"
        />

        <button type="submit">{editId ? 'Actualizar Cita' : 'Crear Cita'}</button>
      </form>

      <hr />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Barbero</th>
            <th>Cliente</th>
            <th>Sucursal</th>
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
              <td>{cita.sucursal}</td>
              <td>{cita.servicio}</td>
              <td>{new Date(cita.fecha).toLocaleDateString()}</td>
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