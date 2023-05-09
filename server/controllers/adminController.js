import User from "../models/userModel.js";


export async function getAllUsers(req, res) {
    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch (err) {
        res.status(500).json({ message: "error from send the users" })
    }
}

export async function deleteUser(req, res) {
    try {
        const user = await User.deleteOne({_id: req.params.id})
        
        if (!user) {
            res.status(500).send({ message: "Use rNot found" })
            return
        } else {
            res.status(200).send({ message: `User has been deleted, ${user._id}` })
        }

    } catch (error) {
        res.status(500).send({ message: error.message })

    }
}