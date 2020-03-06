export const ItemDeleteServerHandler = async (curseId: string) => {
    await fetch("http://localhost:5000/user/basket", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token: localStorage.getItem("token"), curseId: curseId})
    });
};
