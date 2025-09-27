import React, { useState } from 'react';
import Barberos from './components/Barberos';
import Clientes from './components/Clientes';
import Servicios from './components/Servicios';
import Citas from './components/Citas';
import './App.css';

function App() {
    const [currentSection, setCurrentSection] = useState('barberos');

    const renderCurrentSection = () => {
        switch (currentSection) {
            case 'barberos': return <Barberos />;
            case 'clientes': return <Clientes />;
            case 'servicios': return <Servicios />;
            case 'citas': return <Citas />;
            default: return <Barberos />;
        }
    };

    return (
        <div className="app-container">
            <header className="header">
                <h1>Panel de Administración Barbería Mapache 🦝</h1>
            </header>

            <nav className="navigation">
                <button
                    className={currentSection === 'barberos' ? 'active' : ''}
                    onClick={() => setCurrentSection('barberos')}
                >
                    Barberos
                </button>
                <button
                    className={currentSection === 'clientes' ? 'active' : ''}
                    onClick={() => setCurrentSection('clientes')}
                >
                    Clientes
                </button>
                <button
                    className={currentSection === 'servicios' ? 'active' : ''}
                    onClick={() => setCurrentSection('servicios')}
                >
                    Servicios
                </button>
                <button
                    className={currentSection === 'citas' ? 'active' : ''}
                    onClick={() => setCurrentSection('citas')}
                >
                    Citas
                </button>
            </nav>

            <main className="main-content">
                {renderCurrentSection()}
            </main>
        </div>
    );
}

export default App;