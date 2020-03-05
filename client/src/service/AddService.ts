const curseAddHandler = async (name: string, price: string, image: string) => {
    await  fetch("http://localhost:5000/user/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, price, image})
    });
};
export default  curseAddHandler;