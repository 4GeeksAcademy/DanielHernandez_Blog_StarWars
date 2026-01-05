import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";

const imgUrl = (uid) => `https://starwars-visualguide.com/assets/img/starships/${uid}.jpg`;

export function Starship() {
    const { uid } = useParams();
    const { store } = useGlobalReducer();

    const ship = store.starships.find(s => String(s.uid) === String(uid));
    if (!ship) return <div className="container p-5">Loading...</div>;

    return (
        <div className="container p-5">
            <div className="d-flex justify-content-between">
                <img
                    src={imgUrl(uid)}
                    alt={ship.name}
                    className="imgpersonaje ratio ratio-4x3 mb-2"
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image"; }}
                />

                <div className="text-center px-5">
                    <h1>{ship.name}</h1>
                    <p>
                        Model: {ship.model} • Class: {ship.starship_class} • Manufacturer: {ship.manufacturer}
                    </p>
                </div>
            </div>

            <div className="container-fluid border-top my-5 border-danger">
                <div className="row my-2 text-danger mx-5 mt-4 text-center">
                    <div className="col">
                        <h5>Model</h5>
                        <h5>{ship.model}</h5>
                    </div>
                    <div className="col">
                        <h5>Class</h5>
                        <h5>{ship.starship_class}</h5>
                    </div>
                    <div className="col">
                        <h5>Cost</h5>
                        <h5>{ship.cost_in_credits}</h5>
                    </div>
                    <div className="col">
                        <h5>Length</h5>
                        <h5>{ship.length}</h5>
                    </div>
                    <div className="col">
                        <h5>Crew</h5>
                        <h5>{ship.crew}</h5>
                    </div>
                    <div className="col">
                        <h5>Passengers</h5>
                        <h5>{ship.passengers}</h5>
                    </div>
                </div>

                <div className="row my-2 text-danger mx-5 mt-4 text-center">
                    <div className="col">
                        <h5>Max Speed</h5>
                        <h5>{ship.max_atmosphering_speed}</h5>
                    </div>
                    <div className="col">
                        <h5>Hyperdrive</h5>
                        <h5>{ship.hyperdrive_rating}</h5>
                    </div>
                    <div className="col">
                        <h5>MGLT</h5>
                        <h5>{ship.MGLT}</h5>
                    </div>
                    <div className="col">
                        <h5>Cargo</h5>
                        <h5>{ship.cargo_capacity}</h5>
                    </div>
                    <div className="col">
                        <h5>Consumables</h5>
                        <h5>{ship.consumables}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
