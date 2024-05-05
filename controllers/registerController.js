const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const { email, pwd, repwd, terms, interests } = req.body;
    if (!email || !pwd || !repwd || !terms) return res.status(400).json({ 'message': 'Email and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.status(409).json({'message': 'User already registered.'}); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const hashedRePwd = await bcrypt.hash(repwd, 10);
        if (hashedPwd != hashedRePwd) res.status(401).json({'message': 'Passwords do not match.'});

        //create and store the new user
        const result = await User.create({
            "email": email,
            "password": hashedPwd,
            "intersets": interests,
            "following": []
        });

        console.log(result);

        // Send email about registeration process >>> TODO

        res.status(201).json({ 'success': `New user ${email} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleRegister };