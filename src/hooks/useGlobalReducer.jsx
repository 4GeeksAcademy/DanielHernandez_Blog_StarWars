import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

const STORAGE_KEY = "sw_blog_store_v1";

function initFromStorage() {
    const base = initialStore();

    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return base;

        const parsed = JSON.parse(raw);

        return {
            ...base,
            people: parsed.people || [],
            planets: parsed.planets || [],
            favorites: parsed.favorites || []
        };
    } catch (e) {
        console.warn("Failed to init store from localStorage:", e);
        return base;
    }
}

export function StoreProvider({ children }) {
    // init desde localStorage
    const [store, dispatch] = useReducer(storeReducer, undefined, initFromStorage);

    // Persistencia automática
    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    people: store.people,
                    planets: store.planets,
                    favorites: store.favorites,
                    savedAt: Date.now()
                })
            );
        } catch (e) {
            console.warn("Failed to persist store:", e);
        }
    }, [store.people, store.planets, store.favorites]);

    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    return useContext(StoreContext);
}

