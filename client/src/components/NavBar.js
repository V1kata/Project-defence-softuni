import { Link } from 'react-router-dom';

export function NavBar() {
    return (
        <nav>
            <Link to="/"><img src="/images/HomeImage.png" alt="Bidding-system" /></Link>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/catalog">Catalog</Link></li>
                <li><Link to="/create">Create</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link>Logout</Link></li>
            </ul>
        </nav>
    );
}