import { Link } from "react-router-dom";

export function BidItem({ _id, price, imageUrl, typeOfPurchase, title, description }) {
    return (
        <div className="auction-item">
            <div className="info-container">
                <img src={imageUrl} alt={title} />
                <div>
                    <h1>{description}</h1>
                    <h2>Price: {price}$</h2>
                    <h3>Type: {typeOfPurchase}</h3>
                </div>
            </div>
            <div className="details-btn">
                <Link to={`/details/${_id}`} className="details">Details</Link>
            </div>
        </div>
    )
}