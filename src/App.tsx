import { useState, useCallback } from 'react'
import './App.css'
import BuscadorPelis from './components/BuscadorPelis'
import { Routes, Route, Link } from 'react-router-dom'
import ListaPeliculas from './pelis'
import DetallePelis from './components/DetallePelis'

function App() {
  const [busqueda, setBusqueda] = useState('');

  const limpiarBusqueda = useCallback(() => {
    setBusqueda('');
  }, []);

  return (
    <>
      <header className="cabecera">
        <span className='logotipo'>
          <Link to="/">
            <img src="/favicon.svg" alt="logo" />
            Cinema Paradiso
          </Link>
        </span>
        <nav>
          <BuscadorPelis consulta={busqueda} setConsulta={setBusqueda} />
        </nav>
      </header>

      <main className='envoltorio'>
        <Routes>
          <Route path="/" element={<ListaPeliculas busqueda={busqueda} onLimpiarBusqueda={limpiarBusqueda} />} />
          <Route path="/pelis/:id" element={<DetallePelis />} />
        </Routes>
      </main>

      <footer className="pie-pagina">
        <p>&copy; 2025 cinema paradiso - Algunos derechos reservados</p>
      </footer>
    </>
  )
}

export default App
