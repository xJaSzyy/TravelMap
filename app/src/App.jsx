import {useEffect, useState} from "react";
import Map from "./components/Map";

function App() {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}places.json`)
            .then(res => res.json())
            .then(data => setPlaces(data));
    }, []);

    return (
        <div className="app">
            
            <Map places={places}/>

        </div>
    );
}

export default App;