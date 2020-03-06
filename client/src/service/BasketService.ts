const ItemDeleteServerHandler = async () => {
    await fetch("http://localhost:5000/user/basket", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    });
};
export default ItemDeleteServerHandler;