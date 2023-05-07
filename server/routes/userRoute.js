import express from "express";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import { baseUrl, generateToken, isAuth, mg } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";


const router = express.Router()

// add isAdmin validation 
// add all functions of admin 

router.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

router.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8)
            }

            const updatedUser = await user.save()

            res.status(200)
                .send({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    isAdmin: updatedUser.isAdmin,
                    token: generateToken(updatedUser)
                })
            console.log(updatedUser, 'userupdated')
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (err) {
        console.log(err)
    }
}))


router.post('/forget-password', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    console.log('user: ', user)
    if (user) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' })
        user.resetToken = token;
        console.log('token',token)
        await user.save();

        //reset link
        console.log(`${baseUrl()}/reset-password/${token}`)



        // check all the details to where is send the mail 
       
       
        
            mg.messages().send(
                {
                    from: 'shop.io <me@mg.yourdomain.com>',
                    to: `${user.email}`,
                    subject: `Reset Password`,
                    html: `<p>Please Click the following link to reset your password:</p> 
                           <a href="${baseUrl()}/reset-password/${token}"}>Reset Password</a>`
               },
                (error, body) => {
                    console.log('err',error);
                    console.log('err body',body);
                }
            );


        res.send({ message: 'We sent reset password link to your email.' });
    } else {
        res.status(404).send({ message: 'User not found' });
    }

}))

router.post('/reset-password', expressAsyncHandler(async (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET,
        async (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' });
            } else {
                const user = await User.findOne({ resetToken: req.body.token });
                if (user) {
                    if (req.body.password) {
                        user.password = bcrypt.hashSync(req.body.password, 8);
                        await user.save();
                        res.send({
                            message: 'Password reseted successfully',
                        });
                    }
                } else {
                    res.status(404).send({ message: 'User not found' });
                }
            }
        }
    );
})
);




router.post('/signup', async (req, res) => {
    try {
        const currentUser = await User.findOne({ email: req.body.email })
        if (currentUser) {
            res.status(401).send({ message: 'have an account with this email' });
        }
        else {

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
            })
            const user = await newUser.save()
            res.status(200);
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
            return;
        }
        //     console.log(newUser)
        //     res.status(200)
        //     res.send(newUser)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err.message })
    }
})


router.post('/signin', async (req, res) => {
    const currentUser = await User.findOne({ email: req.body.email })
    if (currentUser) {
        const comparePassword = bcrypt.compareSync(req.body.password, currentUser.password)
        if (comparePassword) {
            res.send({
                _id: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                isAdmin: currentUser.isAdmin,
                token: generateToken(currentUser)
            })
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password' });
})



const userRoute = router
export default userRoute