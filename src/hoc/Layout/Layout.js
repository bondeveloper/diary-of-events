import React from 'react';
import Aux from '../Aux/Aux';

import Toolsbar from '../../Navigation/Toolsbar/Toolsbar';

const layout = props => (
    <Aux>
        <Toolsbar />
        <p>Sidedrawer</p>
        <main>
            {props.children}
        </main>
    </Aux>
)

export default layout