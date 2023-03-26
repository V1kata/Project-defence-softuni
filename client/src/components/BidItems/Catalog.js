import { Link } from "react-router-dom";
import { BidItem } from "./BidItem";

export function Catalog({ bidItems }) {
    return (
        <>
            <section className="container">
                {bidItems.length ?
                    bidItems.map(x => <BidItem key={x._id} {...x} />) :
                    <p className="noposts">There are no posts yet, try and create some here {'=>'} <Link to="/create">Create</Link></p>}
            </section>
        </>
    )
}