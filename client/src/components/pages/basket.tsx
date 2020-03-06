import * as  React from "react";
import {IBasketClient} from "../../../../routs/interfaces/interfaces";

const Basket = () => {
    const [basket, setBasket] = React.useState<IBasketClient[]>([]);
    const [allSumm, setAllSumm] = React.useState<number>(0);
    React.useEffect(() => {
        fetch("http://localhost:5000/user/basket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token: localStorage.getItem("token")})
        })
            .then(info => info.json())
            .then(data => setBasket(data.cart.items))
            .catch(e => console.log(e));
    }, []);
    const deleteHandler = (index: number) => {
        console.log(index);
    };
    return (
        <div className="container">
            <h1>Basket</h1>
            <table>
                <thead>
                <tr>
                    <th>Curse Name</th>
                    <th>Item Count</th>
                    <th>Item Price</th>
                    <th>Sum</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {basket.map((item: IBasketClient, index: number) => (
                    <tr key={item._id}>
                        <td>{item.curse}</td>
                        <td>{item.count}</td>
                        <td>{item.price} AMD</td>
                        <td>{Number(item.price) * Number(item.count)} AMD</td>
                        <td>
                            <button onClick={() => deleteHandler(index)} className="btn primry red">Delete</button>
                        </td>
                    </tr>
                ))
                }
                </tbody>
            </table>

        </div>
    );
};

export default Basket;