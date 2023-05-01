import express from "express";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils.js";
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

const userRoute = router
export default userRoute