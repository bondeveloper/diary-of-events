const workoutSessionSanitizer = data => {
    Object.keys( data ).map(  key => {
        switch ( key ) {
            case 'weight' :
            case 'waist' :
                data[key] = parseFloat(data[key]);
        }
    });

    return data;
    
}

module.exports.workoutSessionSanitizer = workoutSessionSanitizer