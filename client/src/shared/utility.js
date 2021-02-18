export const updateObject = ( old, updated = {}) => {
    return { ...old, ...updated };
};

export const mapKeyToValue = data => {
    if (data) {
        return Object.keys(data)
            .map( key => {
                return { [key] : data[key].value };
            })
            .reduce( (result, current) => {
                return Object.assign(result, current);
            }, {}) ;
    }
}

export const formObjectToArray = obj => {
    let arr = [];

    for ( let key in obj) {
        arr.push({
            key: key,
            settings: obj[key]
        });
    }

    return arr;
}

export const tranformPascalCaseToUnderscoreCase = data => {
    return Object.keys(data).map( key => {
        const tranformedKey = key.replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "");
        return { [tranformedKey]: data[key] };
    }).reduce( ( result, current ) => {
        return Object.assign(result, current);
    }, {});
};

export const transformUnderscoreCaseToSentenceCase = key => {
    return key.replace('_', ( x, y ) => {
        return ' ';
    });
}

export const excludeFromArray = ( data, excluded) => {

    for ( let value of data ) {
        for ( let x of excluded ) {
            delete value[x];
        }
    }

    return data;
}

export const excludeKeyFromObj = ( obj, key) => {

   delete obj[key];
   return obj;
}
