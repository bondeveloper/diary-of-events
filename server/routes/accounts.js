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
    if ( exists ) return res.status(400).send("Account with the same email already exists!");

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
        res.status.apply(400).send({ error: err });
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

// Update user details
// router.put('/:id', ( req, res ) => {

//     const account = accounts.find( c => c.id === parseInt(req.params.id) );
//     if (!account) res.status(404).send('Account not found!');

//     const { error } = validateAccount(req.body);

//     if (error) {
//         res.status(400).send(error.details);
//         return;
//     }

//     account.email = req.body.email;
//     account.password = req.body.password;

//     accounts.find( c => {
//         if (c.id === parseInt(req.params.id)) {
//             c = account
//         }
//     } );
//     res.send(account);
// });



module.exports = router;