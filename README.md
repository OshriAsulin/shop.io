# shop.io
Ecommerce Shop.io website 
a amazing real website in production 

This Ecommerce application provides a seamless online shopping experience with client and admin panels. 
The server built with Node.js and Express, it uses JWT for authentication. The integration of PayPal and Stripe APIs ensures secure payment processing. The app includes a purchase summary and sending by email and a password reset that sends a recovery email using nodemailer. 
MongoDB serves as the database with the mongoose ODM for easy interaction.
For unit testing, Jest framework is used to ensure the reliability and correctness of the codebase.
The frontend is developed using  Vite React, Axios, and for styled i using React Bootstrap and CSS for a more customized appearance.    Overall, this application offers efficient management of orders, users, and products for a smooth e-commerce experience.

## Installation
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

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
