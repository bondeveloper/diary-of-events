const express = require('express');
const Workout = require('../models/Workout');
const router = express.Router();
const verifyAuth = require('./token');
const { workoutValidation, workoutSessionValidation } = require('../utilities/validation');
// const { workoutSessionSanitizer } = require('../utilities/sanitizer');

router.post('/', verifyAuth, async ( req, res ) => {
    const { error } = workoutValidation(req.body);

    if ( error ) return res.status(400).send({ errors: error.details });

    const workout = new Workout({
        name: req.body.name,
        description: req.body.description,
        _account: req.account._id
    });

    try {
        const saved = await workout.save();
        res.status(201).send( { workout: saved });

    } catch ( err ) {
        res.status(400).send({ error: err });
    }
});

router.get('/', verifyAuth, async ( req, res) => {
    try {
        const workouts = await Workout.find({'_account': req.account._id}, ( err, w) => {
            if ( err ) return res.status(400).send({ error: err });
            return w;
        });
        res.status(200).send({ workouts : workouts});

    }catch ( err ) {
        return res.status(400).send({ error: err });
    }

});


router.get('/:workoutId', verifyAuth, async ( req, res ) => {
    try {
        const workout = await Workout.findById(req.params.workoutId).where({ '_account': req.account._id });
        res.status(200).send({ workout: workout });

    } catch( err ) {
        res.status(400).send({ error: err });
    }

});


router.delete('/:workoutId', verifyAuth, async ( req, res ) => {
    try {
        const deleted = await Workout.remove({ _id: req.params.workoutId} ).where({ '_account': req.account._id });
        res.status(200).send({ workout: deleted });

    } catch( err ) {
        res.status(400).send({ error: err });
    }

});

router.patch('/:workoutId', verifyAuth, async ( req, res ) => {
    const { error } = workoutValidation( req.body );
    if ( error ) return res.status(400).send({ errors: error.details });

    try {
        const updated = await Workout.updateOne({ _id: req.params.workoutId }, {
            $set: {
                name: req.body.name,
                description: req.body.description,
            }
        }).where({ '_account': req.account._id });

        res.status(200).send({ workout: updated });

    } catch( err ) {
        res.status(400).send({ error: err });
    }

});


// Session Routes

router.post('/:workoutId/sessions', verifyAuth, async ( req, res ) => {
    const { error } = workoutSessionValidation( req.body );

    if ( error )  return res.status(400).send({ errors: error.details });

    try {
        const workout = await Workout.findById(req.params.workoutId).where({ '_account': req.account._id });
        if ( !workout ) return res.status(404).send({ error: 'Not Found!'});

        workout.sessions.push(req.body);
        workout.save();

        res.status(200).send({ workout: workout });


    } catch ( err ) {
        res.status(400).send({ error: err });
    }
});


router.delete('/:workoutId/sessions/:sessionId', verifyAuth, async ( req, res ) => {

    try {
        const workout = await Workout.findById(req.params.workoutId).where({ '_account': req.account._id });
        if ( !workout ) return res.status(404).send({ error: 'Not Found!'});

        workout.sessions.pull(req.params.sessionId);
        await workout.save();

        res.status(200).send({ workout: workout });


    } catch ( err ) {
        res.status(400).send({ error: err });
    }
});

router.patch('/:workoutId/sessions/:sessionId', verifyAuth, async ( req, res ) => {
    try {
        const start = req.body.start ? req.body.start : null;
        const end = req.body.end ? req.body.end : null;

        let workout = await Workout.findOneAndUpdate({'_id':req.params.workoutId, '_account': req.account._id},
         {'$set' : {
                'sessions.$[el].start': start ,
                'sessions.$[el].end': end
            }
        },
        {
             arrayFilters: [{'el._id': req.params.sessionId}],
             new: true
        }, async (err, suc) => {
            console.log(err);
            if (err) return res.status(404).send({ error: 'Not Found!'});

            return res.status(200).send({ workout: suc });
        });

    }catch ( err ) {
        res.status(400).send({ error: err });

    }
})


module.exports = router;
