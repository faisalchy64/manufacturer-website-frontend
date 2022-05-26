import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

function Showcase() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get("http://localhost:5000/items");
            setItems(res.data);
        })();
    }, []);

    return (
        <section className="w-4/5 mx-auto mt-10 mb-5 py-5">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
                Products That We Manufacture
            </h1>

            <div className="my-5 grid lg:grid-cols-3 md:grid-cols-2 gap-2.5">
                {items.map((item) => (
                    <Card key={item._id} item={item} />
                ))}
            </div>
        </section>
    );
}

export default Showcase;
