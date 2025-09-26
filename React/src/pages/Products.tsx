import React, { useState, useEffect } from "react"
import Product from "../components/Product/Product";

function Products () {

    let [products, setProducts] = useState([]);

    useEffect(() => {
        console.log('Loaded Products Page')
        const query = window.location.search
        console.log('Query: ' + query)
        fetch('/api/search' + query)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data)
                //console.log(products)
            })
            .catch((err) => console.error("Could not Fetch Products: ", err))
    }, []);
    
    return (
        <div>
            <h1>Products</h1>
            {products.map((product) => (<Product product={product}/>))}
        </div>
    )
}
export default Products