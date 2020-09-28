const jwt = require('jsonwebtoken');
const webToken = process.env.JWT_SECRET_KEY;


const authUser = (req, res, next) => {
    const token = req.header('auth-token')  // -> this is how we can access our token -> can be anyname
    console.log("Token: ", token )
    try{
        // Check for token 
        if(!token){
            return res.status(401).json( {msg: 'no token, authorization denied'}); 
        }
        // Verify token
        const decoded = jwt.verify(token, webToken);

        // Add user from payload
        req.user = decoded;
        next();

    } catch(e){
        res.status(400).json({msg: 'token is not valid'});

    }

}

module.exports = authUser;