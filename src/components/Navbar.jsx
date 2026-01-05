import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const favLink = (fav) => {
	if (fav.kind === "people") return `/people/${fav.uid}`;
	if (fav.kind === "planets") return `/planet/${fav.uid}`;
};

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	const removeFavorite = (fav, e) => {
		e.preventDefault();
		e.stopPropagation();

		dispatch({
			type: "remove_favorite",
			payload: { uid: fav.uid, kind: fav.kind }
		});
	};

	return (
		<nav className="navbar sticky-top navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<img className="navTitle " src="https://imgs.search.brave.com/rJu8MQMT53pVQmxzYcSRZevEvl2RcdwVkJDBCPXNFzI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L3N0YXItd2Fycy1s/b2dvLXBuZy0xMC5w/bmc" alt="" />
				</Link>

				<div className="btn-group">
					<button
						type="button"
						className="btn btn-primary dropdown-toggle"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Favorites ({store.favorites.length})
					</button>

					<ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: 320 }}>
						{store.favorites.length === 0 && (
							<li className="dropdown-item text-muted">No favorites yet</li>
						)}

						{store.favorites.map((fav) => (
							<li key={`${fav.kind}-${fav.uid}`}>
								<Link
									to={favLink(fav)}
									className="dropdown-item d-flex justify-content-between align-items-center"
								>
									<span className="me-3">
										{fav.name}
										<span className="badge bg-secondary ms-2 text-uppercase">{fav.kind}</span>
									</span>

									<button
										className="btn btn-sm btn-link text-danger p-0"
										onClick={(e) => removeFavorite(fav, e)}
										aria-label="remove favorite"
										title="Remove"
									>
										<i className="fa-solid fa-trash"></i>
									</button>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};
