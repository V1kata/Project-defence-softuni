import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function NavBar() {
    const { isAuth } = useContext(AuthContext);
    
    return (
        <nav>
            <Link to="/"><img src="/images/HomeImage.png" alt="Bidding-system" /></Link>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/catalog">Catalog</Link></li>
                {isAuth ?
                    <>
                        <li><Link to="/create">Create</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link>Logout</Link></li>
                    </> :
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                }
            </ul>
        </nav>
    );
}