import React, { useEffect, useState } from 'react';
import { postItem, getItems } from '../../DB'

function Admin () {

    const [authorized, setAuthorized] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/admin/check')
        .then(res => {
            if (res.ok) {
                setAuthorized(true)
            }
            else {
                setShowLogin(true)
            }
        })
    }, []);

    const login = async () => {
        const res = await fetch('/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        if (res.ok) {
            setAuthorized(true);
            setShowLogin(false);
            setPassword('');
        }
        else {
            setError('Incorrect Password');
        }
    }

    const [itemFormValues, setItemFormValues] = useState({
        name: '',
        type: '',
        brand: '',
        quality: '',
        price: 0.00,
        quantity: 0
    });

    function handleChange(e: any) {
        const { name, value } = e.target;
        setItemFormValues({
            ...itemFormValues,
            [name]: value
        })
    }

    const submitItem = async () => {
        const response = await postItem(itemFormValues);
        console.log(response);
    }

    const getAllItems = async () => {
        const response = await getItems();
        console.log(response);
    }

    return (
        <>
            {showLogin && (
                <div>
                    <div>
                        <h2>Admin Access</h2>
                        <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                        <button onClick={login}>Login</button>
                        {error && <p className="error">{error}</p>}
                    </div>
                </div>
            )}
            {authorized && (
                <div className="Admin">
                    <form>
                    <label>Name</label><input name="name" value={itemFormValues.name} type="text" onChange={handleChange}></input><br/>
                    <label>Type</label><input name="type" value={itemFormValues.type} type="text" onChange={handleChange}></input><br/>
                    <label>Brand</label><input name="brand" value={itemFormValues.brand} type="text" onChange={handleChange}></input><br/>
                    <label>Quality</label><input name="quality" value={itemFormValues.quality} type="text" onChange={handleChange}></input><br/>
                    <label>Price</label><input name="price" value={itemFormValues.price} type="number" onChange={handleChange}></input><br/>
                    <label>Quantity</label><input name="quantity" value={itemFormValues.quantity} type="number" onChange={handleChange}></input><br/>
                    <button type="button" onClick={submitItem}>Post</button>
                    </form>
                    <button type="button" onClick={getAllItems}>Get</button>
                </div>
            )}
        </>
    );
}

export default Admin