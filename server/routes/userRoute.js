import express from "express";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import { generateToken, isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
const router = express.Router()

router.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users)
})


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


const userRoute = router
export default userRoute