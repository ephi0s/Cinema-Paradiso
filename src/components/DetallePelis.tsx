import { useParams, Link } from 'react-router-dom';
import { datosPeli } from './api/api';
import './DetallePelis.css';

/**
 * Componente de vista de detalle de la película.
 * Muestra información completa y metadatos.
 */
function DetallePelis() {
    const { id } = useParams();
    const peli = datosPeli.find(p => p.id === id);

    if (!peli) {
        return (
            <div className="contenedor-detalle">
                <h2>Película no encontrada</h2>
                <Link to="/" className="enlace-volver">Volver</Link>
            </div>
        );
    }

    return (
        <article className="contenedor-detalle">
            <div className="tarjeta-detalle">
                <img src={peli.imagen} alt={peli.titulo} className="imagen-detalle" loading="lazy" />
                <section className="info-detalle">
                    <header>
                        <h1>{peli.titulo}</h1>
                    </header>

                    {peli.valoracion > 0 && (
                        <div className="puntuacion" title={`Valoración: ${peli.valoracion}/10`}>
                            <span className="estrella">⭐</span>
                            <strong>{peli.valoracion.toFixed(1)}</strong> / 10
                        </div>
                    )}

                    {peli.director && peli.director !== 'Desconocido' && (
                        <p><strong>Director:</strong> {peli.director}</p>
                    )}

                    {peli.fecha && peli.fecha !== 'Fecha desconocida' && (
                        <p><strong>Fecha:</strong> {peli.fecha}</p>
                    )}

                    {peli.generos && peli.generos.length > 0 && (
                        <p><strong>Géneros:</strong> {peli.generos.join(', ')}</p>
                    )}

                    {peli.actores && peli.actores.length > 0 && (
                        <p><strong>Actores:</strong> {peli.actores.join(', ')}</p>
                    )}

                    {peli.descripcion && peli.descripcion !== 'Sin descripción disponible' && (
                        <p className="descripcion">{peli.descripcion}</p>
                    )}

                    <footer className="acciones">
                        <a href={peli.enlace} target="_blank" rel="noopener noreferrer" className="enlace-imdb">
                            Ver en IMDB
                        </a>
                        <Link to="/" className="enlace-volver">Volver al listado</Link>
                    </footer>
                </section>
            </div>
        </article>
    );
}

export default DetallePelis;

