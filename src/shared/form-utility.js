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


export const workoutSessionForm = {
    weight:  input('number', 'Weight', 'Weight'),
    weightUnit: select( heaviness, 'Select unit' ),
    waist: input('number', 'Waist', 'Waist'),
    waistUnit: select( thickness, 'Select unit' ),
};

export const workoutForm = {
    name:  input('number', 'Name', 'name'),
    description: input('textarea', 'Description', 'description'),
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


