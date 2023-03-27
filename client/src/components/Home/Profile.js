import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ProfileItem } from "./ProfileItem";
import { Link } from "react-router-dom";

export function Profile({ bidItems }) {
    const { userId, userEmail, userPosts, userName, userImage, isAuthMiddleware } = useContext(AuthContext);
    isAuthMiddleware();
    const posts = bidItems.filter(x => x.author === userId);

    return (
        <section>
            <div className="data">
                <div className="profile-img">
                    <img src={userImage} alt={userName} />
                </div>

                <div className="personal-data">
                    <p>Name: {userName}</p>
                    <p>Email: {userEmail}</p>
                    <p>{userPosts?.length} {userPosts?.length === 1 ? 'post' : 'posts'}</p>
                </div>
            </div>

            <div className="auction-images">
                {posts?.length ?
                    posts.map(x => <ProfileItem key={x._id} {...x} />) :
                    <p className="noposts">You have no posts yet! Try and create some here {'=>'} <Link to="/create">Create</Link></p>
                }
            </div>
        </section>
    );
}