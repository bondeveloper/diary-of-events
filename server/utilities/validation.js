const Joi = require('joi');


const signupValidation = data =>  {
    const schema = Joi.object({
        password: Joi.string()
                    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'))
                    .required(),
        repeat_password: Joi.ref('password'),
        email: Joi.string()
                .email()
                .required()
    }).options({ allowUnknown: true });

    return schema.validate( data );
};

const signinValidation = data =>  {
    const schema = Joi.object({
        password: Joi.string()
                    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'))
                    .required(),
        email: Joi.string()
                .email()
                .required()
    });

    return schema.validate( data );
}

const workoutValidation = data => {
    const schema = Joi.object({
        name: Joi.string().required().max(255),
        description: Joi.string().required().max(255)
    });

    return schema.validate( data );
}

const workoutSessionValidation = data => {
    const schema = Joi.object({
        start: Joi.date(),
        end: Joi.date(),
        weight: Joi.number().required(),
        weight_unit: Joi.string().required(),
        waist: Joi.number(),
        waist_unit: Joi.string(),
    });

    return schema.validate( data );
}


module.exports.signupValidation  = signupValidation;
module.exports.signinValidation  = signinValidation;
module.exports.workoutValidation  = workoutValidation;
module.exports.workoutSessionValidation  = workoutSessionValidation;
