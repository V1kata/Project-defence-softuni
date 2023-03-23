import { Link } from "react-router-dom";

export function ProfileItem({ imageUrl, _id, title }) {
    return (
        <div className="photo">
            <Link to={`/details/${_id}`}>
                <img src={imageUrl} alt={title} />
            </Link>
        </div>
    )
}