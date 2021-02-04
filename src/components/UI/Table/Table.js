import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { transformUnderscoreCaseToSentenceCase, excludeKeyFromObj } from '../../../shared/utility';

import classes from './Table.module.css';

class CustomTable extends Component {

    onClickedHandler = ( data ) => {
        this.props.viewClicked( data );
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
                <tr key={ key + valuesCopy[key] }>
                    {tableData}
                    <td key={'action' + key}>
                        <Button variant='link' key={pk} onClick={ () => this.onClickedHandler( values ) }>view</Button>
                    </td>
                </tr>
            );
        });
    };
    
    renderTableColumnNames = (data, key, exclude) => {
        return [...data].slice(0,1).map( values => {
            let valuesCopy = {...values};
                
            for ( let x of exclude ) {
                delete valuesCopy[x];
            }

            const tableColumnNames = Object.keys( valuesCopy ).map( key => {
    
                return (
                    <th key={key}>{ transformUnderscoreCaseToSentenceCase( key ) }</th>
                    )
                });
            return (
                <tr key={ key + values[key] }>
                    {tableColumnNames}
                    <th key={'action' + values[key]}></th>
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