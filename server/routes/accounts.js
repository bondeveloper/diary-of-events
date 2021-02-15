const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Account = require('../models/Account');
const { signupValidation, signinValidation } = require('../utilities/validation');


router.post('/signup', async ( req, res ) => {

    const { error } = signupValidation(req.body);

    if (error) return res.status(400).send({ errors: error.details });

    const exists = await Account.findOne({ email: req.body.email });
    if ( exists ) return res.status(400).send({ errors: [{message: 'Account with the same email already exists!' }] });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const account = new Account({
        email: req.body.email,
        password: hash
    });

    try {
        const saved = await account.save();
        res.status(201).send({ account: saved._id});
    } catch( err ) {
        res.status.apply(400).send({ errors: err });
    }

});


router.post('/signin', async ( req, res ) => {

    const { error } = signinValidation(req.body);

    if ( error ) return res.status(400).send({ errors: error.details });

    const account = await Account.findOne({ email: req.body.email });
    if ( !account ) return res.status(400).send({ errors: [{message: 'Invalid email or password!' }] });

    const validPass = await bcrypt.compare(req.body.password, account.password);

    if ( !validPass ) return res.status(400).send({ errors: [{message: 'Invalid email or password!' }] });

    const token = jwt.sign({ _id: account._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({ token : token });
});

module.exports = router;
