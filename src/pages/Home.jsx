import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { loadPeople, loadPlanets} from "../components/action.js";
import { Link } from "react-router-dom";


export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {
		if (store.people.length === 0 && store.planets.length === 0 && store.starships.length === 0) {
			loadPeople(dispatch, store);

			const t1 = setTimeout(() => loadPlanets(dispatch, store), 3000);

			return () => {
				clearTimeout(t1); // Cargar planetas
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
					<div className="card homeCard p-1" key={person.uid} style={{ width: "18rem" }}>
						<img
							src={rigoImageUrl}
							className="card-img-top ratio ratio-16x9"
							alt={person.name}
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
					<div className="card homeCard p-1" key={planet.uid} style={{ width: "18rem" }}>
						<img
							src={rigoImageUrl}
							className="card-img-top ratio ratio-16x9"
							alt={planet.name}
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

		</div>
	);
};
