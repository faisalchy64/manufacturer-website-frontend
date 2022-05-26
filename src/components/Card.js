import { useNavigate } from "react-router-dom";

function Card({ item }) {
    const { _id, name, img, description, minimum, available, price } = item;

    const navigate = useNavigate();

    const handlePurchase = () => {
        navigate(`/purchase/${_id}`);
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img className="w-full h-60 object-contain" src={img} alt="" />
            </figure>
            <div className="card-body">
                <h2 className="text-xl md:text-3xl font-bold mb-2.5">{name}</h2>
                <h2 className="font-bold">Description</h2>
                <p className="text-xs">{description.slice(0, 150)}...</p>
                <h2 className="font-bold">Minimum Order : {minimum} Pieces</h2>
                <h2 className="font-bold">
                    Available Quantity : {available} Pieces
                </h2>
                <h2 className="font-bold">Price : ${price} (Per Piece)</h2>
                <div className="mt-5 card-actions justify-end">
                    <button onClick={handlePurchase} className="btn btn-primary">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
