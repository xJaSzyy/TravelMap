import {useEffect, useState} from "react";
import Map from "./components/Map";
import Filter from "./components/Filter";


function App() {

    const [places, setPlaces] = useState([]);

    const [types, setTypes] = useState({
        food: true,
        walk: true,
        rest: true,
        fun: true
    });


    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}places.json`)
            .then(res => res.json())
            .then(data => setPlaces(data));
    }, []);


    const filteredPlaces = places.filter(
        place => types[place.type]
    );

    return (
        <div className="app">

            <Filter
                types={types}
                setTypes={setTypes}
            />

            <Map places={filteredPlaces}/>

        </div>
    );
}

export default App;