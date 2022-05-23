function Review({ review }) {
    const { name, reviews } = review;
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="text-2xl font-bold">{name}</h2>
                <h2 className="font-bold">Review</h2>
                <p className="text-xs">{reviews.slice(0, 150)}...</p>
                <h2 className="font-bold">Ratings</h2>

                <div className="rating">
                    <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                    />
                </div>
            </div>
        </div>
    );
}

export default Review;
