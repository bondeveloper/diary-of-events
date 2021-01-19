const Joi = require('joi');


const signupValidation = data =>  {
    const schema = Joi.object({
        password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                    .required(),
        repeat_password: Joi.ref('password'),
        email: Joi.string()
                .email()
                .required()            
    });

    return schema.validate( data );
};

const signinValidation = data =>  {
    const schema = Joi.object({
        password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
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

const workSessionValidation = data => {
    const schema = Joi.object({
        start: Joi.date().required(),
        end: Joi.date().required(),
        weight: Joi.number().required(),
        weight_measure: Joi.string().required(),
    });

    return schema.validate( data );
}


module.exports.signupValidation  = signupValidation;
module.exports.signinValidation  = signinValidation;
module.exports.workoutValidation  = workoutValidation;
module.exports.workSessionValidation  = workSessionValidation;