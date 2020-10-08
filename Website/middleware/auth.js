const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) { // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (! token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    // Verify token if there is one
    try { // decode using 'verify' and then place in decode object
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // User was previously attached in the payload of the token
        // We can then use this user in our protected routes
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'});
    }

}


// Notes about this and other auth.js: Protected routes, or all routes for the sake of simplicity, get passed an authentication token.
// This is important if you want to know who the user that you're working with is. Fetching user specific content for example.
// This middleware (processes information -- in the middle --) function checks the header for the PROVIDED token. This should have been
// provided in the request on the front end. It does error checking. If no token - get 401 error. Otherwise, verify the token using
// jwt.verify given the secret string found in the config file.


// Question - What is a middleware function?
// Answer - A function that has access to the (req, res) cycle/objects and next is call back that we have to run so that it moves onto the next piece of middleware
