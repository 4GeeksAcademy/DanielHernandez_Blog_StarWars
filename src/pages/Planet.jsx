import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";


export function Planet() {
    const { uid } = useParams();
    const { store } = useGlobalReducer();

    const planet = store.planets.find(p => String(p.uid) === String(uid));
    if (!planet) return <div className="container p-5">Loading...</div>;

    return (
        <div className="container p-5">
            <div className="d-flex justify-content-between">
                <img
                    src={rigoImageUrl}
                    alt={planet.name} 
                    className="infoCard ratio ratio-4x3 mb-2" 
                />

                <div className="text-center px-5">
                    <h1>{planet.name}</h1>
                    <p>
                        A long time ago in a galaxy far, far away...
                    </p>
                </div>
            </div>

            <div className="container-fluid border-top my-5 border-danger">
                <div className="row my-2 text-danger mx-5 mt-4 text-center">
                    <div className="col">
                        <h5>Name</h5>
                        <h5>{planet.name}</h5>
                    </div>
                    <div className="col">
                        <h5>Climate</h5>
                        <h5>{planet.climate}</h5>
                    </div>
                    <div className="col">
                        <h5>Population</h5>
                        <h5>{planet.population}</h5>
                    </div>
                    <div className="col">
                        <h5>Orbital Period</h5>
                        <h5>{planet.orbital_period}</h5>
                    </div>
                    <div className="col">
                        <h5>Rotation Period</h5>
                        <h5>{planet.rotation_period}</h5>
                    </div>
                    <div className="col">
                        <h5>Diameter</h5>
                        <h5>{planet.diameter}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}