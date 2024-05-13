const User = require("../models/User");
const Club = require("../models/Club");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
    /*
    The request should contain the email and password in BODY part.
    It return if the user is authorized or not.
    */
    if (!req?.body?.email || !req?.body?.password) return res.status(400).json({ "message": "Email and password are required." });

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ "message": "Invalid E-mail." }); //Unauthorized 
        // evaluate password 
        const match = await bcrypt.compare(req.body.password, user.password);
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
                const club = await Club.findOne({ user: user._id });
                if (!club) return res.status(401).json({ "message": "Go to the admin to make Club's account" }); //Unauthorized - No club assigned yet
                res.json({ user, club, accessToken }); 
            } else {
                // res.json({ user, accessToken });
                res.redirect("/home");
            }
        } else {
            res.status(401).json({ "message": "Invalid password." }); //Unauthorized 
        }
    } catch {
        console.log(err);
        res.sendStatus(500);
    }
};

const forgotPassword = async (req, res) => {
    /*
    The request should contain the email in BODY part.
    It return if the user changed or not not.
    */
    if (!req?.body?.email) return res.status(400).json({ "message": "Email is required." });

    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        if (!user) return res.status(401).json({ "message": "Email does not exist." }); //Conflict 
        
        const pwd = req.body.email.split("@")[0] + "!12345678"
        const hashedPwd = await bcrypt.hash(pwd, 10);
        user.password = hashedPwd;
        const result = await user.save();
        console.log(result);
        
        // Send new password via email>>> TODO
    
        res.status(201).json({ "success": `New password Sent to your E-mail!` });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const handleLogout = async (req, res) => {
    /*
    TODO
    */
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    try {
        // Is refreshToken in db?
        const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
        if (!foundUser) {
            res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
            return res.sendStatus(204);
        }
    
        // Delete refreshToken in db
        foundUser.refreshToken = "";
        const result = await foundUser.save();
        console.log(result);
    
        res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const handleRegister = async (req, res) => {
    /*
    TODO
    */
    if (!req?.body?.email || !req?.body?.password || !req?.body?.rePassword || !req?.body?.terms) 
        return res.status(400).json({ "message": "Email, passwords and terms are required." });

    try {
        // check for duplicate usernames in the db
        const duplicate = await User.findOne({ email: req.body.email }).exec();
        if (duplicate) return res.status(409).json({"message": "User already registered."}); //Conflict 
    
        //encrypt the password
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        const hashedRePwd = await bcrypt.hash(req.body.rePassword, 10);
        if (hashedPwd != hashedRePwd) res.status(401).json({"message": "Passwords do not match."});
    
        //create and store the new user
        const result = await User.create({
            "email": req.body.email,
            "password": hashedPwd,
            "interests": (!req?.body?.interests) ? req.body.interests : [],
            "following": []
        });
        console.log(result);
    
        // Send email about registeration process >>> TODO
    
        res.status(201).json({ "success": `New user ${email} created!` });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const handleRefreshToken = async (req, res) => {
    /*
    TODO
    */
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    try {
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser) return res.sendStatus(403); //Forbidden 
        // evaluate jwt 
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "date": foundUser.join_date,
                            "club": foundUser.is_club
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "20m" }
                );
                delete foundUser.password;
                delete foundUser.refreshToken;
                res.json({ foundUser, accessToken })
            }
        );
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

module.exports = { handleLogin, forgotPassword, handleLogout, handleRegister, handleRefreshToken };