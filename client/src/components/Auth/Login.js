import { Link } from "react-router-dom";
import { useForm } from '../../hooks/useForm';

export function Login() {
    const { formValues, onChangeHandler } = useForm({
        email: '',
        password: ''
    });

    return (
        <section className="forms">

            <form method="post">
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