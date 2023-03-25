import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { useService } from '../../hooks/useService';
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";
import { bidItemRequest } from "../../services/bidItemService";
import { authServiseFactory } from "../../services/authService";

export function Details() {
    const { itemId } = useParams();
    const { userId, userPosts } = useContext(AuthContext);
    const [item, setItem] = useState({});
    const [bid, setBid] = useState(false);
    const [lastBidder, setLastBidder] = useState('');
    const bidItemServise = useService(bidItemRequest);
    const authService = useService(authServiseFactory);

    const onBid = async (formValues) => {
        console.log(formValues);
        item.price += Number(formValues.bidMoney);
        item.bids.push(userId);

        try {
            const response = await bidItemServise.editItem(itemId, item);
            console.log(response);

            setItem(response);
        } catch (err) {
            console.log(err);
        }
    }

    const { formValues, onChangeHandler, onSubmit } = useForm({ bidMoney: '' }, onBid);

    useEffect(() => {
        async function requestHandler() {
            const data = await bidItemServise.getById(itemId);

            setItem(data);
        }

        requestHandler();
    }, [itemId, item]);

    const bids = item?.bids;
    const owner = userPosts?.find(x => x === itemId);
    let winnersId = bids?.slice(-1);
    
    if (winnersId) {
        const request = async () => {
            let { user } = await authService.getUser(winnersId);
            setLastBidder(user['firstName'] + " " + user['lastName']);
        }
        
        request();
    }
    let canBid;

    if (bids) {
        canBid = bids.find(x => x === userId);
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
                    <h3>Last bidder's name: {lastBidder}</h3>

                    <div className="buttons">
                        {!bids?.length && owner ? <>
                            <Link to={"/edit/" + item._id} className="btn-edit">Edit</Link>
                            <Link to={"/delete/" + item._id} className="btn-delete">Delete</Link> </> :
                            <></>
                        }

                        {owner || !userId ?
                            <></> :
                            !canBid ?
                                <>
                                    <Link onClick={() => setBid(true)} className="btn-wish">Bid</Link>
                                </> :
                                <>
                                    <p className="wish-pub">You have already bidded to this item</p>
                                </>
                        }

                    </div>
                </article>

                <article className="details-card-image">
                    <img src={item.imageUrl} alt={item.title} />
                </article>

            </article>

            {bid ?
                <>
                    <div className="bidForm-container">
                        <form onSubmit={onSubmit}>
                            <input type="number" name="bidMoney" id="bidItem-input" placeholder="Money you want to bid"
                                value={formValues.bidMoney} onChange={onChangeHandler} />
                            <button type="submit">Bid</button>
                            <button className="close" onClick={() => setBid(false)}>Close</button>
                        </form>
                    </div>
                </> :
                <></>
            }
        </section>
    )
}