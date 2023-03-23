import { Link } from "react-router-dom";
import { useForm } from '../../hooks/useForm';

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Login() {
    const { onLoginSubmit } = useContext(AuthContext);
    const { formValues, onChangeHandler, onSubmit } = useForm({
        email: '',
        password: ''
    }, onLoginSubmit);

    return (
        <section className="forms">

            <form onSubmit={onSubmit}>
                <h3>Login</h3>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" className="box" id="email" value={formValues.email} onChange={onChangeHandler}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="box" id="password" value={formValues.password} onChange={onChangeHandler}/>
                <input type="submit" value="Login" className="btn" />
                    <p>Don't have an account ? <Link to="/register">Create one</Link></p>
            </form>
        </section>
    )
}