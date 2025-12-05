import Caratulas from './components/Caratulas'
import listaPelis from './components/api/api'

interface PropsLista {
    busqueda: string;
    onLimpiarBusqueda: () => void;
}

/**
 * Componente que muestra la lista de películas filtrada.
 */
function ListaPeliculas({ busqueda, onLimpiarBusqueda }: PropsLista) {

    // Filtrar películas según la búsqueda
    const peliculasFiltradas = listaPelis.filter((peli) =>
        peli.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <section id="aplicacion" aria-label="Lista de películas">
            {peliculasFiltradas.length > 0 ? (
                peliculasFiltradas.map((peli) => (
                    <Caratulas
                        key={peli.id}
                        imagen={peli.imagen}
                        titulo={peli.titulo}
                        id={peli.id}
                    />
                ))
            ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-color-muted)' }}>
                    <p>No se encontraron películas que coincidan con "{busqueda}"</p>
                    <button
                        onClick={onLimpiarBusqueda}
                        style={{
                            marginTop: '1rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}
        </section>
    )
}

export default ListaPeliculas

