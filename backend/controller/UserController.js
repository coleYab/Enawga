const { encrypt } = require('../utils/password');
const { User } = require('../models/users');

class UserController {
    static async postUser(req, res) {
        const email = req.body ? req.body?.email : null;
        const password = req.body ? req.body?.password : null;

        if (!email) {
            res.status(401).json({ error : "Email missing"});
            return;
        }
        if (!password) {
            res.status(401).json({ error : "Password missing"});
            return;
        }

        // check if user exists
        try {
            const user = await User.findOne({ email });
            if (user) {
                res.status(401).json({ error : "User already exists"});
                return;
            }
        } catch (err) {
            console.log(err)
        }

        const newUser = await User.create({
            email, password: encrypt(password)
        });

        res.status(401).json({ id: newUser.id, email });
    }
}

module.exports = { UserController };
