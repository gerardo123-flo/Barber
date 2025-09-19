import Barberos from './components/Barberos';
import Clientes from './components/Clientes';
import Servicios from './components/Servicios';
import Citas from './components/Citas';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Panel de Administración Barbería Mapache 🦝</h1>

      <section>
        <Barberos />
      </section>

      <section>
        <Clientes />
      </section>

      <section>
        <Servicios />
      </section>

      <section>
        <Citas />
      </section>
    </div>
  );
}

export default App;
