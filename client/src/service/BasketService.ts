export const ItemDeleteServerHandler =  (curseId: string) => {
     fetch("http://localhost:5000/user/basket", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token: localStorage.getItem("token"), curseId: curseId})
    });
};

export const orderHandler = () => {
    fetch("http://localhost:5000/user/basket/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token: localStorage.getItem("token")})
    });
};