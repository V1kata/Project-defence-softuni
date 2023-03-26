import { useState, useEffect, useContext } from "react";
import { useService } from "../../hooks/useService";
import { authServiseFactory } from "../../services/authService";
import { AuthContext } from "../../contexts/AuthContext";
import { ProfileItem } from "./ProfileItem";
import { Link } from "react-router-dom";

export function Profile() {
    const { userId, isAuthMiddleware } = useContext(AuthContext);
    isAuthMiddleware();
    const [user, setUser] = useState({});
    const authService = useService(authServiseFactory);

    useEffect(() => {
        async function request() {
            const data = await authService.getUser(userId);

            setUser(data.user);
        }

        request();
    }, []);

    const name = user?.firstName + ' ' + user?.lastName;
    const posts = user.posters?.length;

    return (
        <section>
            <div className="data">
                <div className="profile-img">
                    <img src={user.imageUrl} alt={name} />
                </div>

                <div className="personal-data">
                    <p>Name: {name}</p>
                    <p>Email: {user.email}</p>
                    <p>{posts} {posts === 1 ? 'post' : 'posts'}</p>
                </div>
            </div>

            <div className="auction-images">
                {user['posters']?.length ?
                    user['posters'].map(x => <ProfileItem key={x._id} {...x} />) :
                    <p className="noposts">You have no posts yet! Try and create some here {'=>'} <Link to="/create">Create</Link></p>
                }
            </div>
        </section>
    );
}