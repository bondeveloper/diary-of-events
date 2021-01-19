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