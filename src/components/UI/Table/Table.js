import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Toast from 'react-bootstrap/Toast';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { transformUnderscoreCaseToSentenceCase, excludeKeyFromObj } from '../../../shared/utility';

import classes from './Table.module.css';

class CustomTable extends Component {
    state = {
        show: true
    };

    onClickedHandler = ( data, action ) => {
        switch ( action ) {
            case 'view' :
                this.props.viewClicked( data );
                break;
            case 'delete':
                this.props.deleteClicked( data );
        }
    }

    renderTableData = (data, key, exclude) => {
        return [...data].map( values => {
            const pk = values[key];
            let valuesCopy = {...values};
            
            for ( let x of exclude ) {
                delete valuesCopy[x];
            }

            const tableData = Object.keys( valuesCopy ).map( id => {
                return (
                    <td key={id}>{ values[id] }</td>
                )
            });
            return (
                <tr key={ key + pk }>
                    {tableData}
                    <td key={`action' + ${key}`} className={classes.Actions}>
                        <FontAwesomeIcon icon='eye' size='sm' className={classes.ViewBtnIcon} onClick={ () => this.onClickedHandler( values, 'view' ) } />
                        <FontAwesomeIcon icon='trash-alt' size='sm' className={classes.DeleteBtnIcon} onClick={ () => this.onClickedHandler( pk, 'delete' ) }/>
                    </td>
                </tr>
            );
        });
    };
    
    renderTableColumnNames = (data, key, exclude) => {
        return [...data].slice(0,1).map( values => {
            const pk = values[key];
            let valuesCopy = {...values};
                
            for ( let x of exclude ) {
                delete valuesCopy[x];
            }

            const tableColumnNames = Object.keys( valuesCopy ).map( x => {
    
                return (
                    <th key={x}>{ transformUnderscoreCaseToSentenceCase( x ) }</th>
                    )
                });
            return (
                <tr key={ key + pk }>
                    {tableColumnNames}
                    <th key={'action' + pk}></th>
                </tr>
            );
        });
    }

    toggleShow = () => this.setState({ show: !this.state.show});

    render () {
             
        const table = this.props.data && this.props.data.length > 0 ? (
            <Table striped bordered hover responsive="sm">
                <thead>
                    {this.renderTableColumnNames(this.props.data, this.props.keyValue, this.props.excludeFromTable)}
                </thead>
                <tbody>
                    {this.renderTableData(this.props.data, this.props.keyValue, this.props.excludeFromTable)}
                </tbody>
            </Table>
        ) : (
            <Toast show={this.state.show} onClose={this.toggleShow}>
                <Toast.Header>
                <strong className="mr-auto">Oops!</strong>
                </Toast.Header>
                <Toast.Body>You currently don't have any workouts</Toast.Body>
            </Toast>
            )

        return (
            <div className={classes.Table}>
                {this.props.tableHeader}
                {table}
            </div>
        );
    }
}


export default CustomTable;