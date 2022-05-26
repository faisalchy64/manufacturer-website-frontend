import { useState } from "react";

function useAdmin() {
    const [admin, setAdmin] = useState(true);

    return [admin];
}

export default useAdmin;
