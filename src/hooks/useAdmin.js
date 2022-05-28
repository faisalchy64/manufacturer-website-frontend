import axios from "axios";
import { useEffect, useState } from "react";

function useAdmin(email) {
    const [admin, setAdmin] = useState(false);
    const [adminLoad, setAdminLoad] = useState(true);
    useEffect(() => {
        if (email) {
            (async () => {
                const res = await axios.get(
                    `http://localhost:5000/admin/${email}`,
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                );
                setAdmin(res.data.admin);
                setAdminLoad(false);
            })();
        } else {
            setAdminLoad(false);
        }
    }, []);

    return [admin, adminLoad];
}

export default useAdmin;
