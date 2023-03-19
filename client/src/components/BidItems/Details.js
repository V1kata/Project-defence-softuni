import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { request } from "../../utils/bidItemUtils";

export function Details() {
    const { itemId } = useParams();
    const [item, setItem] = useState({});

    useEffect(() => {
        async function requestHandler() {
            const data = await request('get', `/bidItems/${itemId}`);
      
            setItem(data);
        }

          requestHandler();
    }, [itemId]);

    const bids = item?.bids;
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
                            <a href={"/edit/" + item._id} className="btn-edit">Edit</a>
                            <a href={"/delete/" + item._id} className="btn-delete">Delete</a> </> :
                        <></>}

                        <p className="wish-pub">You have already bidded to this item</p>
                        <a href={"/bid/" + item._id} className="btn-wish">Bid 100$</a>
                    </div>
                </article>

                <article className="details-card-image">
                    <img src={item.imageUrl} alt={item.title} />
                </article>

            </article>
        </section>
    )
}