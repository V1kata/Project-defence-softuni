import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { request } from "../../utils/bidItemUtils";

export function Edit({ onSubmit }) {
    const { itemId } = useParams();
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
        typeOfPurchase: ''
    });

    useEffect(() => {
        async function requestHandler() {
            const data = await request('get', `/bidItems/${itemId}`);

            setFormValues(state => ({...data}));
        }

        requestHandler();
    }, [itemId]);

    const onChangeHandler = (e) => {
        const target = e.target;

        setFormValues(state => ({...state, [target.name]: target.value}));
    }

    return (
        <section className="forms">

            <form onSubmit={(e) => onSubmit(e, 'put', `/bidItems/${itemId}`, formValues, `/details/${itemId}`)}>
                <h3>Edit</h3>

                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" className="box" value={formValues.title} onChange={onChangeHandler} />

                <label htmlFor="description">description</label>
                <input type="text" id="description" name="description" className="box" value={formValues.description} onChange={onChangeHandler} />

                <label htmlFor="price">Price</label>
                <input type="number" id="Price" name="price" className="box" value={formValues.price} onChange={onChangeHandler} />

                <label htmlFor="imageUrl">Image</label>
                <input type="text" id="imageUrl" name="imageUrl" className="box" value={formValues.imageUrl} onChange={onChangeHandler} />

                <label htmlFor="typeOfPurchase">Type of purchase</label>
                <select name="typeOfPurchase" id="typeOfPurchase" className="box" value={formValues.typeOfPurchase} onChange={onChangeHandler}>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                </select>

                <input type="submit" className="btn" value="Edit" />
            </form>
        </section>
    )
}