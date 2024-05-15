const User = require("../models/User");
const Club = require("../models/Club");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * The request should contain the email and password in BODY part.
 * @param {Request} req 
 * @param {Response} res 
 * @returns if the user is authorized or not.
 */
const handleLogin = async (req, res) => {
    if (!req?.body?.email || !req?.body?.password) return [400, { "message": "Email and password are required." }, null];//res.status(400).json({ "message": "Email and password are required." });

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return [401, { "message": "Wrong credentials." }, null];//res.status(401).json({ "message": "Wrong credentials." }); //Unauthorized 
        // evaluate password 
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const club = await Club.findOne({ user: user._id });
            if (user.is_club && !club) return [401, { "message": "Go to the admin to make Club's account" }, null];//res.status(401).json({ "message": "Go to the admin to make Club's account" }); //Unauthorized - No club assigned yet
            // create JWTs
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": user.email,
                        "club": (user.is_club) ? club._id : false
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "20m" }
            );
            const refreshToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": user.email,
                        "club": (user.is_club) ? club._id : false
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
            const cookie = ["put", "jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: (24 * 60 * 60 * 1000) }];
            
            // Send authorization roles and access token to user
            delete user.password;
            delete user.refreshToken;
            return (user.is_club) ? [201, { user, club, accessToken }, cookie] : [201, { user, accessToken }, cookie];//res.json({ user, club, accessToken }); 
            //res.json({ user, accessToken });
        } else {
            return [401, { "message": "Wrong credentials." }, null];//res.status(401).json({ "message": "Wrong credentials." }); //Unauthorized 
        }
    } catch {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);
    }
};

/**
 * The request should contain the email in BODY part.
 * @param {Request} req 
 * @param {Response} res 
 * @returns if the user changed or not not.
 */
const forgotPassword = async (req, res) => {
    if (!req?.body?.email) return [400, { "message": "Email is required." }, null];//res.status(400).json({ "message": "Email is required." });

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return [401, { "message": "Email does not exist." }, null];//res.status(401).json({ "message": "Email does not exist." }); //Conflict 
        
        const pwd = req.body.email.split("@")[0] + "!12345678"
        const hashedPwd = await bcrypt.hash(pwd, 10);
        user.password = hashedPwd;
        const result = await user.save();
        console.log(result);
        
        // Send new password via email>>> TODO
    
        return [201, { "message": `New password Sent to your E-mail!` }, null];//res.status(201).json({ "success": `New password Sent to your E-mail!` });
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);
    }
};

/**
 * logout the user, terminate his token.
 * @param {Request} req 
 * @param {Response} res 
 * @returns clear the cookie, to content sent back.
 */
const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return [204, null, null];//res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    try {
        // Is refreshToken in db?
        const foundUser = await User.findOne({ refreshToken: refreshToken });
        const cookie = ["clear", "jwt", { httpOnly: true, sameSite: "None", secure: true }]; // to clear cookie
        if (!foundUser) return [204, null, cookie];//res.sendStatus(204);
    
        // Delete refreshToken in db
        foundUser.refreshToken = "";
        const result = await foundUser.save();
        console.log(result);

        return [204, null, cookie];//res.sendStatus(204);
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);
    }
};

/**
 * Register the user in the database.
 * @param {Request} req 
 * @param {Response} res 
 * @returns the email after success registeration.
 */
const handleRegister = async (req, res) => {
    if (!req?.body?.email || !req?.body?.password || !req?.body?.rePassword || !req?.body?.terms) 
        return [400, { "message": "Email, passwords and terms are required." }, null];//res.status(400).json({ "message": "Email, passwords and terms are required." });

    try {
        // check for duplicate usernames in the db
        const duplicate = await User.findOne({ email: req.body.email });
        if (duplicate) return [409, {"message": "User already registered."}, null];//res.status(409).json({"message": "User already registered."}); //Conflict 
    
        //encrypt the password
        if (req.body.password !== req.body.rePassword) return [409, {"message": "Passwords do not match."}, null];//res.status(401).json({"message": "Passwords do not match."});
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
    
        //create and store the new user
        const result = await User.create({
            "email": req.body.email,
            "password": hashedPwd
        });
        console.log(result);
    
        // Send email about registeration process >>> TODO
    
        return [201, { "message": `New user ${req.body.email} created!` }, null];//res.status(201).json({ "success": `New user ${email} created!` });
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);
    }
};

/**
 * update refresh token
 * @param {Request} req 
 * @param {Response} res 
 * @returns the user object and the access token
 */
const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return [401, null, null];//res.sendStatus(401);
    const refreshToken = cookies.jwt;

    try {
        const foundUser = await User.findOne({ refreshToken: refreshToken });
        if (!foundUser) return [403, null, null];//res.sendStatus(403); //Forbidden
        const club = await Club.findOne({ user: foundUser._id }); 
        // evaluate jwt 
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.email !== decoded.email) return [403, null, null];//res.sendStatus(403);
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "email": foundUser.email,
                            "club": (foundUser.is_club && club) ? club._id : false
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "20m" }
                );
                delete foundUser.password;
                delete foundUser.refreshToken;
                return (foundUser.is_club) ? [200, { foundUser, club, accessToken }, null] : [200, { foundUser, accessToken }, null];//res.json({ foundUser, accessToken })
            }
        );
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);//res.sendStatus(500);
    }
};

module.exports = { handleLogin, forgotPassword, handleLogout, handleRegister, handleRefreshToken };