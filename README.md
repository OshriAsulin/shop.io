# shop.io
This Ecommerce application provides a seamless online shopping experience with client and admin panels. The server is built with Node.js and Express, using JWT for authentication. Integration of PayPal and Stripe APIs ensures secure payment processing. The app includes features such as a purchase summary and sending it by email, as well as a password reset functionality that sends a recovery email using Nodemailer. MongoDB serves as the database with the Mongoose ODM for easy interaction.



<h2>🔥 Built With</h2>

- [![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
- [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
- [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
- [![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

- [![PayPal API](https://img.shields.io/badge/PayPal%20API-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://developer.paypal.com/)
- [![Stripe API](https://img.shields.io/badge/Stripe%20API-008CDD?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
<!-- - [![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/) -->


<h2>🚀 Getting Started</h2>

This is the introduction to getting started with your project...




## Installation

To get started with the application, follow these steps:


```bash
git clone <url-clone>
```
install node_modules in server
```bash
cd server
npm install
npm start
```
install node_modules in frontend
```bash
cd frontend
npm install
npm run dev
```
add .env file
```bash
PORT = 
MONGODB_CONNECTION=
JWT_SECRET= 

# for connect to Paypal api
PAYPAL_CLIENT_ID=
BASE_URL=

# for send a email from code 
EMAIL=
PWD_EMAIL=

# for connect to Stripe api
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# for store the images in cloud
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

```
## Highlights



## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)








