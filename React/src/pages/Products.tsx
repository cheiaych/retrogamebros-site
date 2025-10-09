import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Product from "../components/Product/Product";

function Products() {

    let { brand, con } = useParams();
    let [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`/api/${brand}/${con}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data)
                console.log(products)
            })
            .catch((err) => console.error(`Could not fetch games for ${con}: `, err))
    }, [brand, con]);

    return (
        <div>
            <h1>Games</h1>
            {products.map((product) => (<Product product={product}/>))}
        </div>
    )
}

export default Products