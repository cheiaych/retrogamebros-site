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

    /*let accessories: any[] = [];
    let consoles: any[] = [];
    let controllers: any[] = [];
    let games: any[] = [];
    let others: any[] = [];*/
    
    const productGroups = {
        Accessories: [],
        Consoles: [],
        Controllers: [],
        Games: [],
        Others: []
    };

    const sectionOrder = ['Consoles', 'Controllers', 'Accessories', 'Games', 'Others']

    products.forEach( p => {
        console.log(p['productType']);
        switch ((p['productType'] as String).toLowerCase()) {
            case 'accessory':
                productGroups['Accessories'].push(p);
                break;
            case 'console':
                productGroups['Consoles'].push(p);
                break;
            case 'controller':
                productGroups['Controllers'].push(p);
                break;
            case 'game':
                productGroups['Games'].push(p);
                break;
            default:
                productGroups['Others'].push(p);
                break;
        }
    })

    return (
        <div>
            <h1>{con}</h1>
            {
                sectionOrder.map(section => {
                    const items = (productGroups as any)[section];
                    if (items.length < 1) {
                        return null;
                    }

                    return (
                        <div>
                            <h2>{section}</h2>
                            {items.map((i: Product) => (<Product product={i}/>))}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Products