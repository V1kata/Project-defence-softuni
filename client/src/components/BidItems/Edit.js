export function Edit() {
    return (
        <section className="htmlForms">

            <htmlForm method="post">
                <h3>Edit</h3>

                <label htmlFor="title">Title</label>
                <input type="text" name="title" className="box" />

                <label htmlFor="desciption">Desciption</label>
                <input type="text" name="desciption" className="box" />

                <label htmlFor="price">Price</label>
                <input type="number" name="price" className="box" />

                <label htmlFor="imageUrl">Image</label>
                <input type="text" name="imageUrl" className="box" />

                <label htmlFor="type">Type of purchase</label>
                <select name="type" id="" className="box">
                    <option value="buy">Buy</option>
                    <option value="sell" selected>Sell</option>
                </select>

                <input type="submit" className="btn" value="Create" />
            </htmlForm>
        </section>
    )
}