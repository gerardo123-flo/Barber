import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import Barberos from './components/Barberos';
import Clientes from './components/Clientes';
import Servicios from './components/Servicios';
import Citas from './components/Citas';
import './App.css';

// Componente Inicio con clases CSS personalizadas
function Inicio() {
  return (
    <>
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-title">Bienvenido al Panel</h1>
          <p className="lead-text">
            Usa las tarjetas de navegación para comenzar a gestionar tu barbería.
          </p>
        </div>
      </div>
      
      <div className="card-grid">
        <Link to="/barberos" className="card-link">
          <div className="card">
            <h3>💈 Gestionar Barberos</h3>
            <p>Añade, edita o elimina a los barberos de tu equipo.</p>
          </div>
        </Link>
        <Link to="/clientes" className="card-link">
          <div className="card">
            <h3>👥 Ver Clientes</h3>
            <p>Consulta la lista de todos tus clientes registrados.</p>
          </div>
        </Link>
        <Link to="/servicios" className="card-link">
          <div className="card">
            <h3>✂️ Administrar Servicios</h3>
            <p>Define los cortes, servicios y precios que ofreces.</p>
          </div>
        </Link>
        <Link to="/citas" className="card-link">
          <div className="card">
            <h3>📅 Revisar Citas</h3>
            <p>Consulta el calendario de citas agendadas.</p>
          </div>
        </Link>
      </div>
    </>
  );
}

function App() {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="navbar-brand" onClick={() => setIsNavExpanded(false)}>
            Barbería Mapache 🦝
          </Link>
          <button 
            className="navbar-toggler" 
            onClick={() => setIsNavExpanded(!isNavExpanded)}
          >
            ☰
          </button>
          <div className={isNavExpanded ? "navbar-collapse expanded" : "navbar-collapse"}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/barberos" className="nav-link" onClick={() => setIsNavExpanded(false)}>Barberos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/clientes" className="nav-link" onClick={() => setIsNavExpanded(false)}>Clientes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/servicios" className="nav-link" onClick={() => setIsNavExpanded(false)}>Servicios</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/citas" className="nav-link" onClick={() => setIsNavExpanded(false)}>Citas</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/barberos" element={<Barberos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/citas" element={<Citas />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;