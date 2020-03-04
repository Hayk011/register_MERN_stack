export function login(email: string, password: string, callback: (isAuth: boolean, id: any) => void) {
    fetch("http://localhost:8000/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email, password: password})
    }).then(res => res.json()).then(data => {
        localStorage.setItem("token", data.token);
        console.log(data);
        callback(true,  data.userId);
    });
}
export function logout() {
    localStorage.removeItem("token");
}