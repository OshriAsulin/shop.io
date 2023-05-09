import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { baseUrl, generateToken, sendEmail } from '../utils.js';
import crypto from 'crypto'


export async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).send(users)
    } catch (err) {
        res.status(500).json({ message: "error from send the users" })
    }
}

export async function updateUserDetails(req, res) {
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
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({ message: error.message });
    }
}


export async function forgetPassword(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            const resetToken = crypto.randomBytes(32).toString('hex');
            const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
            console.log(passwordResetToken)
            user.resetToken = passwordResetToken;
            await user.save();

            // reset link
            console.log('link', `${baseUrl()}/reset-password/${passwordResetToken}`)

            sendEmail(user.email, user.resetToken)
      
            // check all the details to where is send the mail 
            res.send({ message: 'We sent reset password link to your email.' });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({ message: error.message });
    }

}

export async function resetPassword(req, res) {
    try {
        const user = await User.findOne({ resetToken: req.body.token })
        if (!user) {
            res.status(404).send({ message: 'User not found' });
        }
        else {
            if (req.body.password) {

                user.password = bcrypt.hashSync(req.body.password, 8);
                await user.save();
                res.send({
                    message: 'Password reseted successfully',
                });
            }
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

    // add validation if its not work 
    // add function in utils for send email with the link for reset password !! 
    // mova all user function to controllers

}

export async function signUp(req, res) {
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
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export async function signIn(req, res) {
    try {
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
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message })
    }
}