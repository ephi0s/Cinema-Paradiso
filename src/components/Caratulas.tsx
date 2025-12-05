import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Caratulas.css';

interface PropsTarjeta {
    imagen: string;
    titulo: string;
    id?: string;
}

/**
 * Componente de tarjeta para cada película.
 * Muestra la imagen y el título al pasar el mouse.
 */
function Caratulas({ imagen, titulo, id }: PropsTarjeta) {
    const [imgSrc, setImgSrc] = useState(imagen || '/no_caratula.png');
    const [imgCargada, setImgCargada] = useState(false);

    const tituloMostrar = titulo || 'Título no disponible';

    return (
        <article className="tarjeta-peli">
            <Link to={`/pelis/${id}`} title="Ver detalles">
                <fieldset className="visor-peli">
                    <img
                        src={imgSrc}
                        alt={tituloMostrar}
                        loading="lazy"
                        onLoad={() => setImgCargada(true)}
                        onError={() => setImgSrc('/no_caratula.png')}
                        style={{
                            opacity: imgCargada ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out',
                            filter: imgCargada ? 'none' : 'blur(10px)'
                        }}
                    />
                    <legend>{tituloMostrar}</legend>
                </fieldset>
            </Link>
        </article>
    );
}

export default Caratulas;

