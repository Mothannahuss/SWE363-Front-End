const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

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
}

module.exports = { handleRefreshToken }