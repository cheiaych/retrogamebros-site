import React, { useState, useEffect } from "react"

function Products () {

    let [products, setProducts] = useState([]);

    useEffect(() => {
        const query = window.location.search
        console.log('Query: ' + query)
        fetch('/api/products' + query)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data)
                console.log(products)
            })
            .catch((err) => console.error("Could not Fetch Products: ", err))
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(product =>
                    <li>{JSON.stringify(product)}</li>)}
            </ul>
        </div>
    )
}
export default Products