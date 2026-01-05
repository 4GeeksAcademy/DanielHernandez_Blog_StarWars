const API = "https://www.swapi.tech/api";

// Cache con TTL para evitar refetch tras refresh
const CACHE_KEY = "sw_blog_cache_v1";
const TTL_MS = 1000 * 60 * 60 * 6; // 6 horas

function readCache() {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed.savedAt || Date.now() - parsed.savedAt > TTL_MS) return null;
        return parsed;
    } catch {
        return null;
    }
}

function writeCache(patch) {
    const current = readCache() || { savedAt: Date.now() };
    const next = { ...current, ...patch, savedAt: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(next));
}

// parse seguro (SWAPI a veces responde texto en 429)
async function safeJson(resp) {
    const text = await resp.text();
    try {
        return JSON.parse(text);
    } catch {
        throw new Error(text);
    }
}

async function fetchList(kind, limit = 12, page = 1) {
    const resp = await fetch(`${API}/${kind}?page=${page}&limit=${limit}`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await safeJson(resp);
    return data.results; // [{ uid, name, url }, ...]
}

async function fetchDetailByUrl(url) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await safeJson(resp);
    return data.result; // { uid, properties, description, ... }
}

// Concurrencia limitada (evita 429)
async function mapWithConcurrency(items, mapper, concurrency = 4) {
    const results = new Array(items.length);
    let index = 0;

    async function worker() {
        while (index < items.length) {
            const i = index++;
            results[i] = await mapper(items[i], i);
        }
    }

    const workers = Array.from({ length: Math.min(concurrency, items.length) }, worker);
    await Promise.all(workers);
    return results;
}

// Construye items para Home con "resumen"
function buildHomeItem(kind, listItem, detail) {
    const props = detail.properties || {};
    const uid = listItem.uid;

    // cada tipo tiene props distintas: definimos qué “resumen” quieres enseñar en Home
    if (kind === "people") {
        return {
            uid,
            name: listItem.name,
            gender: props.gender,
            hair_color: props.hair_color,
            eye_color: props.eye_color,
            kind: "people",
        };
    }

    if (kind === "planets") {
        return {
            uid,
            name: listItem.name,
            population: props.population,
            climate: props.climate,
            terrain: props.terrain,
            kind: "planets",
        };
    }

}

async function loadCategory(dispatch, store, kind, actionType) {
    // 1) si ya está en store, no hagas nada
    if (store[kind]?.length) return;

    // 2) si hay cache válida, úsala
    const cache = readCache();
    if (cache?.[kind]?.length) {
        dispatch({ type: actionType, payload: cache[kind] });
        return;
    }

    // 3) fetch lista
    const list = await fetchList(kind, 12, 1); // ajustar limit si se quieren más/menos cards

    // 4) fetch con detalles y concurrencia limitada
    const details = await mapWithConcurrency(
        list,
        async (item) => fetchDetailByUrl(item.url),
        4
    );

    const merged = list.map((item, idx) => buildHomeItem(kind, item, details[idx]));

    dispatch({ type: actionType, payload: merged });
    writeCache({ [kind]: merged });
}

export async function loadPeople(dispatch, store) {
    try {
        await loadCategory(dispatch, store, "people", "load_people");
    } catch (e) {
        console.error("Error loading people:", e.message || e);
    }
}

export async function loadPlanets(dispatch, store) {
    try {
        await loadCategory(dispatch, store, "planets", "load_planets");
    } catch (e) {
        console.error("Error loading planets:", e.message || e);
    }
}


// Para la vista detalle
export async function fetchDetails(kind, uid) {
    const resp = await fetch(`${API}/${kind}/${uid}`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await safeJson(resp);
    return data.result; // { properties, ... }
}
