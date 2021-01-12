import React from 'react';

import classes from './Toolsbar.css';

const toolsbar = props => {
    console.log(classes);
    return (
        <div className={classes.Toolsbar}>
             <ul>
                 <li>Home</li>
                 <li>Workouts</li>
             </ul>
        </div>
     );
}

export default toolsbar;
