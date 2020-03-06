const buyHandler = async (id: string, curseID: any, token: string | null) => {
    await  fetch(`http://localhost:5000/user/curses/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            curseID: curseID,
            token: token
        })
    });
};
export default buyHandler;