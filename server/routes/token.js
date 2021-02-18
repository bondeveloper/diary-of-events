const jwt = require('jsonwebtoken');

module.exports = ( req, res, next) => {
    const token = req.header('auth-token');
    if ( !token ) return res.status(401).send({ error: 'Access Denied' });


    try {
        req.account = jwt.verify( token, process.env.TOKEN_SECRET);
        next();

    } catch ( err ) {
        res.status(400).send({ error: 'Invalid Token' });
    }
};
