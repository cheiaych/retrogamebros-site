import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Product from "../components/Product/Product";

function Games() {

    let { brand, con } = useParams();
    let [games, setGames] = useState([]);

    useEffect(() => {
        fetch(`/api/${brand}/${con}`)
            .then((res) => res.json())
            .then((data) => {
                setGames(data)
                console.log(games)
            })
            .catch((err) => console.error(`Could not fetch games for ${con}: `, err))
    }, []);

    return (
        <div>
            <h1>Games</h1>
            {games.map((product) => (<Product product={product}/>))}
        </div>
    )
}

export default Games