/**
 * Interfaz para la API de películas.
 * Define la estructura de los datos crudos recibidos.
 */
interface InterfazPeliAPI {
    url: string;
    name: string;
    image: string;
    id?: string;
    ratingValue?: number;
    director?: { name: string };
    description?: string;
    datePublished?: string;
    actor?: { name: string }[];
    genre?: string[];
    trailer?: { embedUrl?: string;[key: string]: unknown };
}

const urlAPI = 'https://raw.githubusercontent.com/theapache64/top250/master/top250.json';
const opciones = {
    method: 'GET'
};

let resultado: string;

try {
    const respuesta = await fetch(urlAPI, opciones);
    resultado = await respuesta.text();
} catch {
    // Datos de respaldo en caso de fallo
    resultado = `[{"name":"Película no encontrada","image":"/no_caratula.png","url":"#"}]`;
}

const peliculasRaw = JSON.parse(resultado) as InterfazPeliAPI[];

const urlBaseIMDB = "https://www.imdb.com";

/**
 * Lista simplificada de películas para el listado principal.
 * Mapea los datos crudos a una estructura más amigable.
 */
const listaPelis = peliculasRaw.map((peli: InterfazPeliAPI) => {
    const esFallback = peli.name === "Película no encontrada";
    const urlCruda = peli.url;
    // Extraer ID de la URL (ej: /title/tt0111161/ -> tt0111161)
    const coincidenciaId = urlCruda.match(/\/title\/(tt\d+)\/?/);
    const id = coincidenciaId ? coincidenciaId[1] : 'desconocido';

    return {
        id,
        titulo: peli.name,
        imagen: peli.image,
        enlace: esFallback ? urlCruda : urlBaseIMDB + urlCruda,
    };
});

/**
 * Información detallada de las películas.
 * Incluye metadatos extra como director, actores, etc.
 */
export const datosPeli = peliculasRaw.map((peli: InterfazPeliAPI) => {
    const esFallback = peli.name === "Película no encontrada";
    const urlCruda = peli.url;
    const coincidenciaId = urlCruda.match(/\/title\/(tt\d+)\/?/);
    const id = coincidenciaId ? coincidenciaId[1] : 'desconocido';

    return {
        id,
        titulo: peli.name,
        imagen: peli.image,
        enlace: esFallback ? urlCruda : urlBaseIMDB + urlCruda,
        valoracion: peli.ratingValue || 0,
        director: peli.director?.name || 'Desconocido',
        descripcion: peli.description || 'Sin descripción disponible',
        fecha: peli.datePublished || 'Fecha desconocida',
        actores: peli.actor?.map(a => a.name) ?? [],
        generos: peli.genre ?? [],
        trailer: peli.trailer?.embedUrl || ''
    };
});

export default listaPelis;

