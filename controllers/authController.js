const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ "message": "Email and password are required." });

    const user = await User.findOne({ email: email }).exec();
    if (!user) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, user.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "date": user.join_date,
                    "club": user.is_club
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "20m" }
        );
        const refreshToken = jwt.sign(
            {
                "UserInfo": {
                    "date": user.join_date,
                    "club": user.is_club
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        // Saving refreshToken with current user
        user.refreshToken = refreshToken;
        const result = await user.save();
        console.log(result);

        // Creates Secure Cookie with refresh token
        res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: (24 * 60 * 60 * 1000) });
        
        // Send authorization roles and access token to user
        delete user.password;
        delete user.refreshToken;
        if (user.is_club){
            const club = await User.findOne({ user: user._id }).exec();
            if (!club) return res.sendStatus(401); //Unauthorized - No club assigned yet
            res.json({ user, club, accessToken }); 
        } else {
            res.json({ user, accessToken });
        }

    } else {
        res.sendStatus(401);
    }
};

const forgotPassword = async (req, res) => {
    const email = req.body.email;
    const pwd = email.split("@")[0] + ".12345678"
    if (!email) return res.status(400).json({ "message": "Email is required." });

    // check for duplicate usernames in the db
    const user = await User.findOne({ email: email }).exec();
    if (!user) return res.sendStatus(401); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // Saving new password with current user
        user.password = hashedPwd;
        const result = await user.save();

        console.log(result);
        
        // Send new password via email>>> TODO

        res.status(201).json({ "success": `New password Sent to your E-mail!` });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
};

module.exports = { handleLogin, forgotPassword };