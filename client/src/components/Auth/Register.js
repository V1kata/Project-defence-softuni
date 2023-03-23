import { useContext } from "react";
import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";

export function Register() {
    const { onRegisterSubmit } = useContext(AuthContext);

    const { formValues, onChangeHandler, onSubmit} = useForm({
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        phoneNumber: '',
        password: '',
        rePass: ''
    }, onRegisterSubmit);

    return (
        <section className="forms">

            <form onSubmit={onSubmit}>
                <h3>Register</h3>
                <label htmlFor="firstName">First name</label>
                <input type="text" name="firstName" className="box" id="firstName" value={formValues.firstName} onChange={onChangeHandler}/>

                <label htmlFor="lastName">Last name</label>
                <input type="text" name="lastName" className="box" id="lastName" value={formValues.lastName} onChange={onChangeHandler}/>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" className="box" id="email" value={formValues.email} onChange={onChangeHandler}/>

                <label htmlFor="imageUrl">Image</label>
                <input type="text" name="imageUrl" className="box" id="imageUrl" value={formValues.imageUrl} onChange={onChangeHandler}/>

                <label htmlFor="phoneNumber">Phone</label>
                <input type="number" name="phoneNumber" className="box" id="phoneNumber" value={formValues.phoneNumber} onChange={onChangeHandler}/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="box" id="password" value={formValues.password} onChange={onChangeHandler}/>

                <label htmlFor="rePass">Repeat password</label>
                <input type="password" name="rePass" className="box" id="rePass" value={formValues.rePass} onChange={onChangeHandler}/>

                <input type="submit" value="Login" className="btn" />
                <p>Don't have an account ? <Link to="/login">Create one</Link></p>
            </form>
        </section>
    )
}