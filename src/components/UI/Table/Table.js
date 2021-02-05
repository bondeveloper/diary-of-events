import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { transformUnderscoreCaseToSentenceCase, excludeKeyFromObj } from '../../../shared/utility';

import classes from './Table.module.css';

class CustomTable extends Component {

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
                    <td key={`action' + ${key}`}>
                        <Button variant='link'  onClick={ () => this.onClickedHandler( values, 'view' ) }>view</Button>
                        <Button variant='link'  onClick={ () => this.onClickedHandler( pk, 'delete' ) }>delete</Button>
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
        ) : <span>Nothing to display!</span>

        return (
            <div className={classes.Table}>
                {this.props.tableHeader}
                {table}
            </div>
        );
    }
}


export default CustomTable;