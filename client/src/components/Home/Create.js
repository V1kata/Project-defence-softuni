import { useForm } from "../../hooks/useForm";

export function Create({ onCreate }) {
    const { formValues, onChangeHandler, onSubmit } = useForm({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
        typeOfPurchase: 'Sell'
    }, onCreate);

    return (
        <section className="forms">

            <form onSubmit={onSubmit}>
                <h3>Create</h3>

                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" className="box" value={formValues.title} onChange={onChangeHandler} />

                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" className="box" value={formValues.description} onChange={onChangeHandler} />

                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price" className="box" value={formValues.price} onChange={onChangeHandler} />

                <label htmlFor="imageUrl">Image</label>
                <input type="text" id="imageUrl" name="imageUrl" className="box" value={formValues.imageUrl} onChange={onChangeHandler} />

                <label htmlFor="typeOfPurchase">Type of purchase</label>
                <select name="typeOfPurchase" id="typeOfPurchase" className="box" value={formValues.typeOfPurchase} onChange={onChangeHandler}>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                </select>

                <input type="submit" className="btn" value="Create" />
            </form>
        </section>
    )
}