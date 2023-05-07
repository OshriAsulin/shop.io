import jwt from "jsonwebtoken"
import mailgun from 'mailgun-js';


export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET, { expiresIn: '30d' });
}


export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' })
            } else {
                req.user = decode;
                next();
            }
        })
    } else {
        res.status(401).send({ message: 'No Token' })
    }

}




export const baseUrl = () =>
    process.env.BASE_URL ? process.env.BASE_URL : process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5173'
        : 'https://shop-io-app.onrender.com';



export const mg = mailgun({ apiKey: `${process.env.MAILGUN_API_KEY}` , domain: process.env.MAILGUN_DOMIAN });



