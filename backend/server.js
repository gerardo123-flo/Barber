// =============================================
// IMPORTACIONES Y CONFIGURACIÓN INICIAL
// =============================================
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Creacion de instancia de express
const app = express();
const port = 3000;

// Middlewares
app.use(express.json()); // Habilitar el json en las peticiones
app.use(cors()); // Habilitar cors para las peticiones de backend a frontend

// Configuracion de la conexion a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'gerardo',
    database: 'barberdbac' // Asegúrate que este sea el nombre correcto de tu BD
});

// Conexion a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error en la conexion a la base de datos;', err);
        return;
    }
    console.log('Conexion a la base de datos exitosa');
});

// =============================================
// RUTA DE PRUEBA Y ARRANQUE DEL SERVIDOR
// =============================================

// Esta es una ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor Mapache funcionando correctamente Muejejejeje...');
});

// Iniciar el Servidor
app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});


// =============================================
// CRUD SUCURSALES (NUEVO)
// =============================================

// Ruta para obtener todas las sucursales
app.get('/sucursales', (req, res) => {
    const sql = 'SELECT * FROM sucursales';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener las sucursales:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
});

// Ruta para crear una nueva sucursal
app.post('/sucursales', (req, res) => {
    const { direccion } = req.body;
    const sql = 'INSERT INTO sucursales (direccion) VALUES (?)';
    db.query(sql, [direccion], (err, result) => {
        if (err) {
            console.error('Error al crear la sucursal:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.status(201).json({ id: result.insertId, message: 'Sucursal creada con éxito' });
    });
});

// Ruta para actualizar una sucursal por su ID
app.put('/sucursales/:id', (req, res) => {
    const { id } = req.params;
    const { direccion } = req.body;
    const sql = 'UPDATE sucursales SET direccion = ? WHERE id = ?';
    db.query(sql, [direccion, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar la sucursal:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json({ message: 'Sucursal actualizada con éxito' });
    });
});

// Ruta para eliminar una sucursal por su ID
app.delete('/sucursales/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM sucursales WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(400).json({ message: 'No se puede eliminar la sucursal porque tiene barberos o citas asociadas.' });
            }
            console.error('Error al eliminar la sucursal:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json({ message: 'Sucursal eliminada con éxito' });
    });
});

// =============================================
// CRUD BARBEROS (ACTUALIZADO)
// =============================================

// Ruta para listar a Barberos (con la dirección de su sucursal)
app.get('/barberos', (req, res) => {
    const sql = `
        SELECT 
            b.id, 
            b.nombre, 
            b.activo,
            b.sucursal_id,  -- Esta es la línea clave que se agregó
            s.direccion AS sucursal_direccion 
        FROM barberos b
        JOIN sucursales s ON b.sucursal_id = s.id
    `;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('error al obtener los barberos:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(result)
    });
});

// Ruta para crear un barbero
app.post('/barberos', (req, res) => {
    const { nombre, sucursal_id } = req.body;
    const sql = 'INSERT INTO barberos (nombre, sucursal_id) VALUES (?, ?)';
    db.query(sql, [nombre, sucursal_id], (err, result) => {
        if (err) {
            console.error('Error al crear el Barbero:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.status(201).json({ id: result.insertId, message: 'Barbero creado exitosamente' });
    });
});

// Ruta para actualizar un barbero
app.put('/barberos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, sucursal_id } = req.body;
    const sql = 'UPDATE barberos SET nombre=?, sucursal_id=? WHERE id=?';
    db.query(sql, [nombre, sucursal_id, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el Barbero:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json({ message: 'Barbero actualizado exitosamente' });
    });
});

// Ruta para eliminar un barbero por su ID
app.delete('/barberos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM barberos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el barbero:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json({ message: 'Barbero eliminado con éxito' });
    });
});

// =============================================
// CRUD CLIENTES (SIN CAMBIOS)
// =============================================

// Ruta para obtener todos los clientes
app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener los clientes:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
});

// Ruta para crear un nuevo cliente
app.post('/clientes', (req, res) => {
    const { nombre, telefono, email } = req.body;
    const sql = 'INSERT INTO clientes (nombre, telefono, email) VALUES (?, ?, ?)';
    db.query(sql, [nombre, telefono, email], (err, result) => {
        if (err) {
            console.error('Error al crear el cliente:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.status(201).json({ id: result.insertId, message: 'Cliente creado con éxito' });
    });
});

// Ruta para actualizar un cliente por su ID
app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, email } = req.body;
    const sql = 'UPDATE clientes SET nombre = ?, telefono = ?, email = ? WHERE id = ?';
    db.query(sql, [nombre, telefono, email, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el cliente:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json({ message: 'Cliente actualizado con éxito' });
    });
});

// Ruta para eliminar un cliente por su ID
app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM clientes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el cliente:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json({ message: 'Cliente eliminado con éxito' });
    });
});

// =============================================
// CRUD SERVICIOS (SIN CAMBIOS)
// =============================================

// Ruta para obtener todos los servicios
app.get('/servicios', (req, res) => {
    const sql = 'SELECT * FROM servicios';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener los servicios:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
});

// Ruta para crear un nuevo servicio
app.post('/servicios', (req, res) => {
    const { descripcion, costo, duracion_minutos } = req.body;
    const sql = 'INSERT INTO servicios (descripcion, costo, duracion_minutos) VALUES (?, ?, ?)';
    db.query(sql, [descripcion, costo, duracion_minutos], (err, result) => {
        if (err) {
            console.error('Error al crear el servicio:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.status(201).json({ id: result.insertId, message: 'Servicio creado con éxito' });
    });
});

// Ruta para actualizar un servicio por su ID
app.put('/servicios/:id', (req, res) => {
    const { id } = req.params;
    const { descripcion, costo, duracion_minutos } = req.body;
    const sql = 'UPDATE servicios SET descripcion = ?, costo = ?, duracion_minutos = ? WHERE id = ?';
    db.query(sql, [descripcion, costo, duracion_minutos, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el servicio:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json({ message: 'Servicio actualizado con éxito' });
    });
});

// Ruta para eliminar un servicio por su ID
app.delete('/servicios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM servicios WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el servicio:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json({ message: 'Servicio eliminado con éxito' });
    });
});

// =============================================
// CRUD CITAS (ACTUALIZADO)
// =============================================

// Ruta para obtener todas las citas (ahora incluye la sucursal)
app.get('/citas', (req, res) => {
    const sql = `
        SELECT 
            citas.id, 
            barberos.nombre AS barbero, 
            clientes.nombre AS cliente, 
            servicios.descripcion AS servicio, 
            sucursales.direccion AS sucursal,
            citas.fecha, 
            citas.hora, 
            citas.estado, 
            citas.notas,
            citas.barbero_id,
            citas.cliente_id,
            citas.servicio_id,
            citas.sucursal_id
        FROM citas
        JOIN barberos ON citas.barbero_id = barberos.id
        JOIN clientes ON citas.cliente_id = clientes.id
        JOIN servicios ON citas.servicio_id = servicios.id
        JOIN sucursales ON citas.sucursal_id = sucursales.id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener las citas:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
});

// Ruta para crear una nueva cita
app.post('/citas', (req, res) => {
    const { barbero_id, cliente_id, servicio_id, sucursal_id, fecha, hora, estado, notas } = req.body;
    const sql = 'INSERT INTO citas (barbero_id, cliente_id, servicio_id, sucursal_id, fecha, hora, estado, notas) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [barbero_id, cliente_id, servicio_id, sucursal_id, fecha, hora, estado, notas], (err, result) => {
        if (err) {
            console.error('Error al crear la cita:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.status(201).json({ id: result.insertId, message: 'Cita creada con éxito' });
    });
});

// Ruta para actualizar una cita por su ID
app.put('/citas/:id', (req, res) => {
    const { id } = req.params;
    const { barbero_id, cliente_id, servicio_id, sucursal_id, fecha, hora, estado, notas } = req.body;
    const sql = 'UPDATE citas SET barbero_id = ?, cliente_id = ?, servicio_id = ?, sucursal_id = ?, fecha = ?, hora = ?, estado = ?, notas = ? WHERE id = ?';
    db.query(sql, [barbero_id, cliente_id, servicio_id, sucursal_id, fecha, hora, estado, notas, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar la cita:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json({ message: 'Cita actualizada con éxito' });
    });
});

// Ruta para eliminar una cita por su ID
app.delete('/citas/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM citas WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar la cita:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json({ message: 'Cita eliminada con éxito' });
    });
});