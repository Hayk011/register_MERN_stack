// @ts-ignore
import * as React from "react";
const storageName: string = "userData";
interface IData {
  userId: string;
  token: string;
}
const useAuth = () => {
  // const [token, setToken] = React.useState(null);
  const [userId, setUserId] = React.useState(null);

  const login = React.useCallback((jwttoken: string, id: string) => {
    // @ts-ignore
    // setToken(jwttoken);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id, token: jwttoken
      })
    );
    // @ts-ignore
    setUserId(id);
  }, []);
  const logOut = React.useCallback(() => {
    // setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);
  React.useEffect(() => {
    const data: IData = JSON.parse(localStorage.getItem(storageName) as string);
    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);
  return { login, logOut, userId };
};
export default useAuth;
