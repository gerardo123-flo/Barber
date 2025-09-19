import { useEffect, useState } from 'react';
import {
  getBarberos,
  createBarbero,
  updateBarbero,
  deleteBarbero,
} from '../api/barberos';

export default function Barberos() {
  const [barberos, setBarberos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    cargarBarberos();
  }, []);

  const cargarBarberos = async () => {
    const data = await getBarberos();
    setBarberos(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateBarbero(editId, nombre);
    } else {
      await createBarbero(nombre);
    }
    setNombre('');
    setEditId(null);
    cargarBarberos();
  };

  const handleEdit = (barbero) => {
    setNombre(barbero.nombre);
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
        />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {barberos.map((barbero) => (
            <tr key={barbero.id}>
              <td>{barbero.id}</td>
              <td>{barbero.nombre}</td>
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
