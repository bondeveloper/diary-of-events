import { updateObject } from './utility';

const email = {
    type: 'input',
        config: {
            type: 'email',
            placeholder: 'email'
        },
        value: '',
        label: 'Email'
};

const  password = {
    type: 'input',
    config: {
        type: 'password',
        placeholder: 'password'
    },
    value: '',
    label: 'Password'
};

const repeat_password = {
    type: 'input',
    config: {
        type: 'password',
        placeholder: 'confirm password'
    },
    value: '',
    label: 'Confirm Password'
};

const input = ( configType, placeholder, label ) => {
    return {
        type: 'input',
    config: {
        type: configType,
        placeholder: placeholder
    },
    value: '',
    label: label
    }
}
const select = ( options, placeholder = null, label = '' ) => {
    return {
        type: 'select',
        config: {
            type: 'select',
            placeholder: placeholder,
            options: options
        },
        value: '',
        label: label
    }
}

const heaviness = {
    lbs: 'lbs',
    kg: 'kg'
}

const thickness = {
    lbs: 'cm',
    kg: 'inch'
}
const weight = input('number', 'Weight', 'Weight');
const weightUnit = select( heaviness, 'Select unit' );
const waist = input('number', 'Waist', 'Waist');
const waistUnit = select( thickness, 'Select unit' );

export const workoutSessionForm = {
    weight:  weight,
    weightUnit: weightUnit,
    waist: waist,
    waistUnit: waistUnit
};

export const signinForm = {
    email: email,
    password: password
};

export const signupForm = {
    email: email,
    password: password,
    repeat_password: repeat_password
}

export const formInputChanged = ( form, event, key) => {
    const updatedFormElement = updateObject(form[key], { value: event.target.value});
    return updateObject(form, { [key]: updatedFormElement });
}

export const formObjInputChanged = ( form, event, key) => {
    console.log(form);
    console.log(event);
    console.log(key);
    // const updatedFormElement = updateObject(form[key], 
    //     { 
    //         value: event.target.value
    //         unit: 
    //     });
}

