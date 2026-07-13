import {useEffect, useState} from "react";
import Map from "./components/Map";


function App() {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}places.json`)
            .then(response => response.json())
            .then(data => {
                setPlaces(data);
            });

    }, []);

    return (
        <Map places={places}/>
    );

}

export default App;