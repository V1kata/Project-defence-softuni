export function Profile() {
    return (
        <section>
            <div className="data">
                <div className="profile-img">
                    <img src="/images/person.png" alt="Blank profile" />
                </div>

                <div className="personal-data">
                    <p>Name: Viktor Hristov</p>
                    <p>Email: viktor.burboran@gmail.com</p>
                    <p>2 posts</p>
                </div>
            </div>

            <div className="auction-images">
                <div className="photo">
                    <a href="/details/">
                        <img src="/images/TruckBid.jpg" alt="Truck" />
                    </a>
                </div>
            </div>
        </section>
    );
}