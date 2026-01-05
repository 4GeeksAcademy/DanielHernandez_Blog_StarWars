export const initialStore = () => {
  return {
    people: [],
    planets: [],
    starships: [],
    favorites: [],
    message: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "add_task": {
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map(todo =>
          todo.id === id ? { ...todo, background: color } : todo
        )
      };
    }

    case "load_people":
      return { ...store, people: action.payload };

    case "load_planets":
      return { ...store, planets: action.payload };


    // Favoritos: toggle (si existe, lo quita; si no, lo añade)
    case "toggle_favorite": {
      const exists = store.favorites.some(
        fav => fav.uid === action.payload.uid && fav.kind === action.payload.kind
      );
      return {
        ...store,
        favorites: exists
          ? store.favorites.filter(
            fav => !(fav.uid === action.payload.uid && fav.kind === action.payload.kind)
          )
          : [...store.favorites, action.payload]
      };
    }

    case "remove_favorite":
      return {
        ...store,
        favorites: store.favorites.filter(
          fav => !(fav.uid === action.payload.uid && fav.kind === action.payload.kind)
        )
      };

    default:
      throw Error("Unknown action.");
  }
}
