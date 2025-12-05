import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './BuscadorPelis.css'

interface PropsBuscador {
  consulta: string;
  setConsulta: (valor: string) => void;
}

/**
 * Componente funcional de Buscador.
 * Permite filtrar películas por texto.
 */
function BuscadorPelis({ consulta, setConsulta }: PropsBuscador) {
  const [valorInput, setValorInput] = useState('');
  const [expandido, setExpandido] = useState(false);
  const navegar = useNavigate();

  // Sincronizar input con consulta externa
  useEffect(() => {
    setValorInput(consulta);
  }, [consulta]);

  // Resetear estado expandido si la pantalla crece
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setExpandido(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    setConsulta(valorInput);
    navegar('/');
    // En móvil, podríamos querer cerrar el buscador tras buscar, 
    // pero a veces es mejor dejarlo para ver qué se buscó.
    // setExpandido(false);
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoValor = e.target.value;
    setValorInput(nuevoValor);
    if (nuevoValor === '') {
      setConsulta('');
    }
  };



  const cerrarBuscador = () => {
    setValorInput('');
    setConsulta('');
    setExpandido(false);
  };

  return (
    <form
      className={`buscador ${expandido ? 'expandido' : ''}`}
      role="search"
      onSubmit={manejarEnvio}
    >
      <div className="caja-busqueda">
        <input
          type="search"
          value={valorInput}
          onChange={manejarCambio}
          placeholder="Buscar películas..."
          aria-label="Buscar películas"
          autoFocus={expandido}
        />
      </div>

      {/* Botón Lupa (Funciona como trigger en móvil colapsado y submit en escritorio/expandido) */}
      <button
        type="submit"
        onClick={(e) => {
          if (window.innerWidth <= 600 && !expandido) {
            e.preventDefault();
            setExpandido(true);
          }
        }}
        aria-label="Buscar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      {/* Botón Cerrar (Solo visible en móvil expandido) */}
      {expandido && (
        <button
          type="button"
          className="boton-cerrar"
          onClick={cerrarBuscador}
          aria-label="Cerrar búsqueda"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </form>
  )
}

export default BuscadorPelis
