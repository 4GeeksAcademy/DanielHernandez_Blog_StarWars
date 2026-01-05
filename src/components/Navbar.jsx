import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	const removeFavorite = (fav) => {
		dispatch({ type: "remove_favorite", payload: { uid: fav.uid, kind: fav.kind } });
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/" className="navbar-brand mb-0 h1">
					<img
						className="tituloNav"
						src="https://i.pinimg.com/1200x/b6/af/5a/b6af5aeff0ee43a4253fc70c167bb6db.jpg"
						alt="Star Wars"
					/>
				</Link>

				<div className="btn-group">
					<button
						type="button"
						className="btn btn-primary dropdown-toggle"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Favorites {store.favorites.length}
					</button>

					<ul className="dropdown-menu dropdown-menu-end">
						{store.favorites.length === 0 && (
							<li className="dropdown-item text-muted">No favorites yet</li>
						)}

						{store.favorites.map((fav) => (
							<li key={`${fav.kind}-${fav.uid}`} className="dropdown-item">
								<div className="d-flex justify-content-between align-items-center">
									<span>
										{fav.name}{" "}
										<span className="badge bg-secondary ms-2 text-uppercase">{fav.kind}</span>
									</span>

									<button
										className="btn btn-sm btn-link text-danger"
										type="button"
										onClick={() => removeFavorite(fav)}
										aria-label="remove favorite"
									>
										<i className="fa-solid fa-trash"></i>
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};
