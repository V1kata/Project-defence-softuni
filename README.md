# This is my Bid site for the ReactJS course
My name is Viktor Hristov and this is my project:

1) First start the server - <strong>cd server</strong>

- <strong>npm install</strong> - to install all the dependencies
- <strong>Nodemon tool:</strong>
* <storng>npm run dev</strong> - with nodemon;
* <strong>npm start</strong> - without nodemon.

2) Go to client with <strong>cd client</strong> and run the command <strong>npm install</strong>, to install all the dependencies
- Since the server is made with express and mongoDB i'm giving you some premade users and bidItems in the users.json and bidItems.json
- There are 3 users, just like in the training server: 
    * peter@abv.bg : 123456
    * george@abv.bg : 123456
    * admin@abv.bg : admin

## After we have started all things, here is a brief description of the site

- ## There are public and private parts as required the public are the main page, the create and details page, if you want to create you need to register or login first

- ## After we create something we can view it and edit or delete if we want and nobody has bidded on it

- ### The bidding is available to people who are logged and haven't bidded yet, they can only bid one time, the last bidder is the winner, even though they don't win because there is no time limit

- To bid just click the button "Bid" and a mini form will appear, there just type the money you want to bid and the new price will update as well as it will say that you are the winner

- ## The last dynamic page is the profile, where you can see your image, name, email, number of posts and the picture of the items you have created, if clicked it goes directly to the details of the product
