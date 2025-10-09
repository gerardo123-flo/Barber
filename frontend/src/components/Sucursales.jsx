import { useEffect, useState } from 'react';
import {
  getSucursales,
  createSucursal,
  updateSucursal,
  deleteSucursal,
} from '../api/sucursales';

export default function Sucursales() {
  const [sucursales, setSucursales] = useState([]);
  const [direccion, setDireccion] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    cargarSucursales();
  }, []);

  const cargarSucursales = async () => {
    try {
      const data = await getSucursales();
      setSucursales(data);
    } catch (error) {
      console.error("Error al cargar sucursales:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!direccion.trim()) return; // Evita crear entradas vacías

    try {
      if (editId) {
        await updateSucursal(editId, direccion);
      } else {
        await createSucursal(direccion);
      }
      setDireccion('');
      setEditId(null);
      cargarSucursales();
    } catch (error) {
      console.error("Error al guardar la sucursal:", error);
    }
  };

  const handleEdit = (sucursal) => {
    setDireccion(sucursal.direccion);
    setEditId(sucursal.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSucursal(id);
      cargarSucursales();
    } catch (error) {
      // El backend ya envía un mensaje específico, pero podemos mostrar una alerta
      console.error("Error al eliminar la sucursal:", error);
      alert("No se puede eliminar la sucursal si tiene barberos o citas asignadas.");
    }
  };

  return (
    <div>
      <h2>Gestión de Sucursales</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Dirección de la sucursal"
          required
        />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sucursales.map((sucursal) => (
            <tr key={sucursal.id}>
              <td>{sucursal.id}</td>
              <td>{sucursal.direccion}</td>
              <td>
                <button onClick={() => handleEdit(sucursal)}>Editar</button>
                <button onClick={() => handleDelete(sucursal.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}