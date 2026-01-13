export const postItem = async (formValues: any) => {
    console.log(JSON.stringify(formValues))
    try {
        let response = await fetch('/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
        });
        let data = await response.json();
        return (data)
    }
    catch(error) {
        console.error("Error: ", error)
    }
}

export const getItems = async () => {
    console.log("Opened Products Page")
    try {
        let response = await fetch('/items');
        let data = await response.json();
        return (data);
    }
    catch(error) {
        console.error("Error: ", error)
    }
}