import { Rating, Typography } from "@mui/material";

function Review({ review }) {
    const { name, discription, rating } = review;

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="text-2xl font-bold">{name}</h2>
                <h2 className="font-bold">Review</h2>
                <p className="text-xs">{discription?.slice(0, 150)}...</p>
                <Typography component="legend"></Typography>
                <Rating name="read-only" value={parseInt(rating)} readOnly />
            </div>
        </div>
    );
}

export default Review;
