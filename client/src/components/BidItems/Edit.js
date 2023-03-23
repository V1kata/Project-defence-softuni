import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { useServise } from '../../hooks/useService';
import { request } from '../../utils/bidItemUtils';
import { bidItemRequest } from "../../services/bidItemService";

export function Edit({ onEdit }) {
    const { itemId } = useParams();
    const bidItemServise = useServise(bidItemRequest);
    const {formValues, onChangeHandler, onSubmit, changeValues} = useForm({
        _id: '',
        title: '',
        description: '',
        price: '',
        imageUrl: '',
        typeOfPurchase: ''
    }, onEdit);

    useEffect(() => {
        async function requestHandler() {
            const data = await bidItemRequest.getById(itemId);

            changeValues(data);
        }

        requestHandler();
    }, [itemId]);

    return (
        <section className="forms">

            <form onSubmit={onSubmit}>
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