import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";


export function People() {
    const { uid } = useParams();
    const { store } = useGlobalReducer();

    const person = store.people.find(p => String(p.uid) === String(uid));

    if (!person) return <div className="container p-5">Loading...</div>;

    return (
        <div className="container p-5">
            <div className="d-flex justify-content-between">
                <img
                    src={rigoImageUrl}
                    alt={person.name}
                    className="infoCard ratio ratio-4x3 mb-2"
                />

                <div className="text-center px-5">
                    <h1>{person.name}</h1>
                    <p>
                        A long time ago in a galaxy far, far away... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>

            <div className="container-fluid border-top my-5 border-danger">
                <div className="row my-2 text-danger mx-5 mt-4 text-center">
                    <div className="col">
                        <h5>Name</h5>
                        <h5>{person.name}</h5>
                    </div>
                    <div className="col">
                        <h5>Birth Year</h5>
                        <h5>{person.birth_year}</h5>
                    </div>
                    <div className="col">
                        <h5>Gender</h5>
                        <h5>{person.gender}</h5>
                    </div>
                    <div className="col">
                        <h5>Height</h5>
                        <h5>{person.height}</h5>
                    </div>
                    <div className="col">
                        <h5>Skin Color</h5>
                        <h5>{person.skin_color}</h5>
                    </div>
                    <div className="col">
                        <h5>Eye Color</h5>
                        <h5>{person.eye_color}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
