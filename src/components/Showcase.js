import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

function Showcase() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get("data.json");
            setItems(res.data);
        })();
    }, []);

    return (
        <section className="w-4/5 mx-auto my-10 py-5">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-20">
                Products That We Manufacture
            </h1>

            <div className="my-10 grid lg:grid-cols-3 md:grid-cols-2 gap-2.5">
                {items.map((item) => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}

export default Showcase;
