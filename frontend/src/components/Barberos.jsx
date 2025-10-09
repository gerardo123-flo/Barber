import { useEffect, useState } from 'react';
import {
  getBarberos,
  createBarbero,
  updateBarbero,
  deleteBarbero,
} from '../api/barberos';
import { getSucursales } from '../api/sucursales'; // <-- 1. Importar la función para obtener sucursales

export default function Barberos() {
  const [barberos, setBarberos] = useState([]);
  const [sucursales, setSucursales] = useState([]); // <-- 2. Nuevo estado para guardar las sucursales
  const [nombre, setNombre] = useState('');
  const [sucursalId, setSucursalId] = useState(''); // <-- 2. Nuevo estado para el select del formulario
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // <-- 3. Cargar ambos listados al iniciar
    cargarBarberos();
    cargarSucursales();
  }, []);

  const cargarBarberos = async () => {
    const data = await getBarberos();
    setBarberos(data);
  };

  const cargarSucursales = async () => {
    const data = await getSucursales();
    setSucursales(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      // <-- 4. Pasar sucursalId al actualizar
      await updateBarbero(editId, nombre, sucursalId);
    } else {
      // <-- 4. Pasar sucursalId al crear
      await createBarbero(nombre, sucursalId);
    }
    // Limpiar todos los campos del formulario
    setNombre('');
    setSucursalId('');
    setEditId(null);
    cargarBarberos();
  };

  const handleEdit = (barbero) => {
    // <-- 5. Rellenar también el campo de sucursal al editar
    setNombre(barbero.nombre);
    setSucursalId(barbero.sucursal_id); // Asumiendo que el GET de barberos devuelve sucursal_id
    setEditId(barbero.id);
  };

  const handleDelete = async (id) => {
    await deleteBarbero(id);
    cargarBarberos();
  };

  return (
    <div>
      <h2>Gestión de Barberos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del barbero"
          required
        />
        {/* <-- 6. Nuevo menú desplegable para las sucursales --> */}
        <select
          value={sucursalId}
          onChange={(e) => setSucursalId(e.target.value)}
          required
        >
          <option value="">Selecciona una sucursal</option>
          {sucursales.map((sucursal) => (
            <option key={sucursal.id} value={sucursal.id}>
              {sucursal.direccion}
            </option>
          ))}
        </select>
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Sucursal</th> {/* <-- 7. Nueva columna en la tabla --> */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {barberos.map((barbero) => (
            <tr key={barbero.id}>
              <td>{barbero.id}</td>
              <td>{barbero.nombre}</td>
              <td>{barbero.sucursal_direccion}</td> {/* <-- 7. Mostrar la dirección --> */}
              <td>
                <button onClick={() => handleEdit(barbero)}>Editar</button>
                <button onClick={() => handleDelete(barbero.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}