function Review({ review }) {
    const { name, discription, rating } = review;

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="text-2xl font-bold">{name}</h2>
                <h2 className="font-bold">Review</h2>
                <p className="text-xs">{discription?.slice(0, 150)}...</p>
                <h2 className="font-bold">Ratings: {rating}</h2>
            </div>
        </div>
    );
}

export default Review;
