import React from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const renderTooltip = props=> {
    return (
    <Tooltip id={props.info.id} {...props} >
        {props.info.title}
    </Tooltip>
);}

const CustomTooltip = props => {
    return (
        ['top', 'right', 'bottom', 'left'].map((placement) => (
            <OverlayTrigger
                key={placement}
                placement={placement}
                overlay={
                    <Tooltip id={`tooltip-${placement}`}>
                    Tooltip on <strong>{placement}</strong>.
                    </Tooltip>
                }
            >
                <Button variant="secondary">
                    <FontAwesomeIcon
                        icon='plus-circle'
                        onClick={ () => this.sessionCreateHandler(this.props.workout._id)}
                        />
                </Button>

            </OverlayTrigger>
        ))
    )
}


export default CustomTooltip;
