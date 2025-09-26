import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Console from "../components/Console/Console";

function Consoles() {

    let { brand } = useParams();
    let [consoles, setConsoles] = useState([]);

    useEffect(() => {
        console.log(`/api/${brand}`)
        fetch(`/api/${brand}`)
            .then((res) => res.json())
            .then((data) => {
                setConsoles(data)
                //console.log(data)
            })
            .catch((err) => console.error(`Could not fetch consoles for ${brand}: `, err))
    }, [brand]);

    return (
        <div>
            <h1>Consoles</h1>
            {consoles.map((console) => (<Console console={console}/>))}
        </div>   
    )
}

export default Consoles