import axios from "axios";
import { useEffect, useState } from "react";

function useToken(user) {
    const [token, setToken] = useState("");

    useEffect(() => {
        if (user?.user?.email) {
            (async () => {
                const res = await axios.put(
                    `https://stormy-sands-44537.herokuapp.com/user/${user?.user?.email}`,
                    { email: user?.user?.email }
                );

                localStorage.setItem("accessToken", res.data.token);

                setToken(res.data.token);
            })();
        }
    }, [user]);

    return [token];
}

export default useToken;
