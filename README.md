# This is my Bid site for the ReactJS course
My name is Viktor Hristov and this is my project:

1) First start the server - <strong>cd server</strong>

- <strong>npm install</strong> - to install all the dependencies
- <strong>Nodemon tool:</strong>
    * <storng>npm run dev</strong> - with nodemon;
    * <strong>npm start</strong> - without nodemon.
- Since the server is made with express and MongoDB, below you may find a list with 3 predefined users(like in the training server) and bidItems in the <strong>users.json</strong> and <strong>bidItems.json</strong>:
    * peter@abv.bg : 123456
    * george@abv.bg : 123456
    * admin@abv.bg : admin

2) Go to client with <strong>cd client</strong>;
3) Run <strong>npm install</strong>, to install all the dependencies.

## After all things are set and server is up and running, there is a brief description of the site:

- There are public and private parts. As required, the public pages of the site are:
    * Main page;
    * Catalogue page;
    * Details page.
All additional pages are accessible upon registration and login.

- After creating it's own item, the user can view, edit or delete it. Anybody, except the item owner, can bid on that item.
Note: edit, delete operations are available, only if there are no bids on that item.

- Bidding option is available for logged in users who haven't placed a bid on that item. Each use can only bid once per item, as the last bidder is the winner.
Note: there is no time limit implemented, therefore there is no actual winner.

- To place a bid, click the "Bid" button, followed by mini form field shown. Type amount of your choice, place the bid and you WIN ;).

- The last dynamic page is the "Profile". There you can view your image, name, email, number of posts and the image of items you have created. When clicked, you are directly send to the details page of the product.
