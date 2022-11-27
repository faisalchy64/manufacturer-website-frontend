import axios from "axios";
import { useEffect, useState } from "react";

function useAdmin(email) {
    const [admin, setAdmin] = useState(false);
    const [adminLoad, setAdminLoad] = useState(true);
    useEffect(() => {
        if (email) {
            (async () => {
                const res = await axios.get(
                    `https://manufacturer-website-backend.onrender.com/admin/${email}`,
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
        }
    }, [email]);

    return [admin, adminLoad];
}

export default useAdmin;
