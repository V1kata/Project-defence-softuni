import { useForm } from "../../hooks/useForm";

export function Create() {
    const { formValues, onChangeHandler, onSubmit } = useForm({
        title: '',
        desciption: '',
        price: 0,
        imageUrl: '',
        typeOfPurchase: 'Sell'
    }, (values) => {
        console.log(values);
    });

    return (
        <section className="forms">

            <form method="" onSubmit={onSubmit}>
                <h3>Create</h3>

                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" className="box" value={formValues.title} onChange={onChangeHandler} />

                <label htmlFor="desciption">Desciption</label>
                <input type="text" id="desciption" name="desciption" className="box" value={formValues.desciption} onChange={onChangeHandler} />

                <label htmlFor="price">Price</label>
                <input type="number" id="Price" name="price" className="box" value={formValues.price} onChange={onChangeHandler} />

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