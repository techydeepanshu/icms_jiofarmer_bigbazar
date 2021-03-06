const {verifyToken} = require("../authenticate")
module.exports = {
    validateLogin: (req, res, next) => {
        const isVerified = verifyToken(req.headers.authorization);
        if (!isVerified) {
            return res.status(401).send({ error: "You must sign in!" });
        }
        next();
    }
};
