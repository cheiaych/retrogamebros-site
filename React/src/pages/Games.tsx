import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

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
        <h1>Games</h1>
    )
}

export default Games