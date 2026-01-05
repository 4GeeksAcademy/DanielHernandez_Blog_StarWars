import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { loadPeople, loadPlanets, loadStarships } from "../components/action.js";
import { Link } from "react-router-dom";

const getImageUrl = (kind, uid) => {
	// Visual Guide usa endpoints distintos para people/planets/starships
	// kind: "people" | "planets" | "starships"
	return `https://starwars-visualguide.com/assets/img/${kind}/${uid}.jpg`;
};

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {
		// Carga escalonada como tenías tú, pero con nombres nuevos
		if (store.people.length === 0 && store.planets.length === 0 && store.starships.length === 0) {
			loadPeople(dispatch, store);

			const t1 = setTimeout(() => loadPlanets(dispatch, store), 1500);
			const t2 = setTimeout(() => loadStarships(dispatch, store), 3000);

			return () => {
				clearTimeout(t1);
				clearTimeout(t2);
			};
		}
	}, []);

	const isFavorite = (uid, kind) =>
		store.favorites.some(f => f.uid === uid && f.kind === kind);

	const toggleFavorite = (item, kind) => {
		dispatch({
			type: "toggle_favorite",
			payload: { uid: item.uid, name: item.name, kind }
		});
	};

	return (
		<div className="container text-center mt-5 my-2">

			{/* PEOPLE */}
			<h1 className="d-flex justify-content-start my-4 text-danger">People</h1>
			<div className="cards-scroll-container mb-5">
				{store.people.map(person => (
					<div className="card tamaño-card p-1" key={person.uid} style={{ width: "18rem" }}>
						<img
							src={getImageUrl("characters", person.uid)}
							className="card-img-top ratio ratio-16x9"
							alt={person.name}
							onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x225?text=No+Image"; }}
						/>

						<div className="card-body text-start">
							<h5 className="card-title">{person.name}</h5>
							<p className="mb-1">Gender: {person.gender}</p>
							<p className="mb-1">Hair Color: {person.hair_color}</p>
							<p className="mb-3">Eye Color: {person.eye_color}</p>

							<div className="d-flex justify-content-between">
								<Link className="btn btn-outline-primary" to={`/people/${person.uid}`}>
									Learn more!
								</Link>

								<button
									className="btn btn-outline-warning"
									onClick={() => toggleFavorite(person, "people")}
									aria-label="toggle favorite"
								>
									<i className={isFavorite(person.uid, "people") ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* PLANETS */}
			<h1 className="d-flex justify-content-start my-4 text-danger">Planets</h1>
			<div className="cards-scroll-container mb-5">
				{store.planets.map(planet => (
					<div className="card tamaño-card p-1" key={planet.uid} style={{ width: "18rem" }}>
						<img
							src={getImageUrl("planets", planet.uid)}
							className="card-img-top ratio ratio-16x9"
							alt={planet.name}
							onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x225?text=No+Image"; }}
						/>

						<div className="card-body text-start">
							<h5 className="card-title">{planet.name}</h5>
							<p className="mb-1">Population: {planet.population}</p>
							<p className="mb-3">Terrain: {planet.terrain}</p>

							<div className="d-flex justify-content-between">
								<Link className="btn btn-outline-primary" to={`/planet/${planet.uid}`}>
									Learn more!
								</Link>

								<button
									className="btn btn-outline-warning"
									onClick={() => toggleFavorite(planet, "planets")}
									aria-label="toggle favorite"
								>
									<i className={isFavorite(planet.uid, "planets") ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* STARSHIPS */}
			<h1 className="d-flex justify-content-start my-4 text-danger">Starships</h1>
			<div className="cards-scroll-container mb-5">
				{store.starships.map(ship => (
					<div className="card tamaño-card p-1" key={ship.uid} style={{ width: "18rem" }}>
						<img
							src={getImageUrl("starships", ship.uid)}
							className="card-img-top ratio ratio-16x9"
							alt={ship.name}
							onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x225?text=No+Image"; }}
						/>

						<div className="card-body text-start">
							<h5 className="card-title">{ship.name}</h5>
							<p className="mb-1">Model: {ship.model}</p>
							<p className="mb-3">Class: {ship.starship_class}</p>

							<div className="d-flex justify-content-between">
								<Link className="btn btn-outline-primary" to={`/starships/${ship.uid}`}>
									Learn more!
								</Link>

								<button
									className="btn btn-outline-warning"
									onClick={() => toggleFavorite(ship, "starships")}
									aria-label="toggle favorite"
								>
									<i className={isFavorite(ship.uid, "starships") ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

		</div>
	);
};
