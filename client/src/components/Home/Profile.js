import { useState, useEffect, useContext } from "react";
import { useService } from "../../hooks/useService";
import { authServiseFactory } from "../../services/authService";
import { AuthContext } from "../../contexts/AuthContext";
import { ProfileItem } from "./ProfileItem";

export function Profile() {
    const [user, setUser] = useState({});
    const { userId } = useContext(AuthContext);
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
                    <p>{posts} posts</p>
                </div>
            </div>

            <div className="auction-images">
                {user['posters'] && user['posters'].map(x => <ProfileItem key={x._id} {...x} />)}
            </div>
        </section>
    );
}