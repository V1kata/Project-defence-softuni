import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { bidItemRequest } from "../../services/bidItemService";
import { useService } from '../../hooks/useService';
import { AuthContext } from "../../contexts/AuthContext";

export function Details() {
    const { itemId } = useParams();
    const [item, setItem] = useState({});
    const bidItemServise = useService(bidItemRequest);
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        async function requestHandler() {
            const data = await bidItemServise.getById(itemId);

            setItem(data);
        }

        requestHandler();
    }, [itemId, item]);

    const onBid = async () => {
        item.price += 100;
        item.bids.push(userId);

        try {
            const response = await bidItemServise.editItem(itemId, item);

            setItem(response);
        } catch (err) {
            console.log(err);
        }
    }

    const bids = item?.bids;
    let canBid;

    if (bids) {
        canBid = bids.find(x => x._id === userId);
    }

    const author = item['author']?.firstName + ' ' + item['author']?.lastName;

    return (
        <section className="details-page">
            <h1>Details</h1>
            <article className="details-card">

                <article className="details-card-text">
                    <h2>Title: {item.title}</h2>
                    <h3>Author: {author}</h3>
                    <h3>Price: {item.price}$</h3>
                    <h3>Bids made: {bids && bids.length}</h3>
                    <h3>Type of purchase: {item.typeOfPurchase}</h3>
                    <h3>Description: {item.description}</h3>

                    <div className="buttons">
                        {!bids?.length ? <>
                            <Link to={"/edit/" + item._id} className="btn-edit">Edit</Link>
                            <Link to={"/delete/" + item._id} className="btn-delete">Delete</Link> </> :
                            <></>}

                        {!canBid ?
                        <>
                            <Link onClick={onBid} className="btn-wish">Bid 100$</Link>
                        </> :
                        <>
                            <p className="wish-pub">You have already bidded to this item</p>
                        </>}
                    </div>
                </article>

                <article className="details-card-image">
                    <img src={item.imageUrl} alt={item.title} />
                </article>

            </article>
        </section>
    )
}