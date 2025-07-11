import React, { useEffect } from "react"
import { getItems } from '../DB'

function Products () {

    const getAllItems = async () => {
        const response = await getItems();
        console.log(response);
    }

    useEffect(() => {
        getAllItems();
    })

    return (
        <h1>Products</h1>
    )
}
export default Products