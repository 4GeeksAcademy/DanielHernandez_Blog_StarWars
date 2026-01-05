const API = "https://www.swapi.tech/api";

async function fetchListWithDetails(endpoint) {
    const response = await fetch(`${API}/${endpoint}/`);
    const data = await response.json();

    const items = await Promise.all(
        data.results.map(async (item) => {
            const res = await fetch(item.url);
            const detail = await res.json();
            return {
                uid: item.uid,              // uid numérico real
                name: item.name,
                ...detail.result.properties // propiedades completas
            };
        })
    );

    return items;
}

export async function loadPeople(dispatch, store) {
    if (store.people.length > 0) return;

    try {
        const people = await fetchListWithDetails("people");
        dispatch({ type: "load_people", payload: people });
    } catch (error) {
        console.log("Error loading people:", error);
    }
}

export async function loadPlanets(dispatch, store) {
    if (store.planets.length > 0) return;

    try {
        const planets = await fetchListWithDetails("planets");
        dispatch({ type: "load_planets", payload: planets });
    } catch (error) {
        console.log("Error loading planets:", error);
    }
}

