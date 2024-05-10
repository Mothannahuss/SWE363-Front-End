const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
    /*
    TODO
    */
    if (!req?.body?.email || !req?.body?.password || !req?.body?.rePassword || !req?.body?.terms) 
        return res.status(400).json({ "message": "Email, passwords and terms are required." });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: req.body.email }).exec();
    if (duplicate) return res.status(409).json({"message": "User already registered."}); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        const hashedRePwd = await bcrypt.hash(req.body.rePassword, 10);
        if (hashedPwd != hashedRePwd) res.status(401).json({"message": "Passwords do not match."});

        //create and store the new user
        const result = await User.create({
            "email": req.body.email,
            "password": hashedPwd,
            "intersets": (!req?.body?.interests) ? req.body.interests : [],
            "following": []
        });

        console.log(result);

        // Send email about registeration process >>> TODO

        res.status(201).json({ "success": `New user ${email} created!` });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

module.exports = { handleRegister };