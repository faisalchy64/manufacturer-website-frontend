import { useEffect, useState } from "react";
import axios from "axios";
import Review from "./Review";

function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(
                "https://manufacturer-website-backend.onrender.com/reviews"
            );
            setReviews(res.data?.reverse());
        })();
    }, []);

    return (
        <section className="w-4/5 mx-auto my-5 py-5">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
                Customer Reviews
            </h1>

            <div className="my-5 grid lg:grid-cols-3 md:grid-cols-2 gap-2.5">
                {reviews.map((review) => (
                    <Review key={review._id} review={review} />
                ))}
            </div>
        </section>
    );
}

export default Reviews;
