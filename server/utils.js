import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";


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
    process.env.BASE_URL ?
        process.env.BASE_URL : process.env.NODE_ENV !== 'production'
            ? 'http://localhost:5173'
            : 'https://shop-io-app.onrender.com';



export const sendEmail = (userMail, resetToken) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PWD_EMAIL
            }
        });

        const mailOptions = {
            from: EMAIL,
            to: userMail,
            subject: "Shop.io Reset password",
            html: `<h1>Congratulation</h1> <h2> You successfully sent Email </h2>
                         <a href="${baseUrl()}/reset-password/${resetToken}">Reset Password</a>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error)
            } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({ status: 201, info, message: 'We sent reset password link to your email.' })
            }
        })

        return;
    } catch (error) {
        console.log("Error" + error);
        res.status(401).json({ status: 401, error })

        return;
    }
}