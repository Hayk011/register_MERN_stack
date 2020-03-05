export function login(email: string, password: string, callback: (isAuth: boolean) => void) {
    fetch("http://localhost:5000/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email, password: password})
    }).then(res => res.json()).then(data => {
        localStorage.setItem("token", data.token);
        if (data.token) {
            callback(true);
        }
    }).catch(e => console.log(e));
}

export function logout() {
    localStorage.removeItem("token");
}