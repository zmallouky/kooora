const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]; // retrive beror from header (convetion)
		const decodeToken = jwt.verify(token, "secret_this_should_be_longer"); //decode the token to get original value 
		req.userData = { email: decodeToken.email, userId: decodeToken.userId }; //append it on request
		next();// allow request to continue exectue
	} catch (error) {
		res.status(401).json({ message: "Auth failed --token!" });
	}
};