'use strict';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import moment from 'moment';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Body extends Component {
  /**
   * @param {Number} bytes
   * @private
   */
  _convertBytes(bytes) {
    const labels = ['', 'K', 'M', 'G', 'T', 'P'];
    let label = 0;
    
    while (bytes >= 1000) {
      bytes /= 1024;
      label++;
    }
    
    return `${bytes.toPrecision(4)} ${labels[label]}B`;
  }
  
  /**
   * @param {Number} timestamp
   * @private
   */
  _convertTimestamp(timestamp) {
    const age = Date.now() - timestamp;
    if(age < 0) return 'Recent';
    
    return moment(timestamp).fromNow();
  }
  
  render() {
    console.log(this.props.results);
    const rows = this.props.results.map(/**torrentResult*/ result => {
      return <TableRow 
        key={result.magnetLink} 
        hoverable={true}
        selectable={false}
      >
        <TableRowColumn style={styles.tableName}>
          {result.name}
          <a href={result.magnetLink}><FileCloudDownload style={styles.icon}/></a>
        </TableRowColumn>
        <TableRowColumn style={styles.tableDateSize}>{this._convertTimestamp(result.date)}</TableRowColumn>
        <TableRowColumn style={styles.tableDateSize}>{this._convertBytes(result.size)}</TableRowColumn>
        <TableRowColumn style={styles.tableLeechSeed}>{result.seed}</TableRowColumn>
        <TableRowColumn style={styles.tableLeechSeed}>{result.leech}</TableRowColumn>
      </TableRow>;
    });
  
    return <div style={styles.container}>
      <h1 style={styles.title}>Search Results</h1>
    
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={styles.tableName}>Name</TableHeaderColumn>
            <TableHeaderColumn style={styles.tableDateSize}>Age</TableHeaderColumn>
            <TableHeaderColumn style={styles.tableDateSize}>Size</TableHeaderColumn>
            <TableHeaderColumn style={styles.tableLeechSeed}>Seeds</TableHeaderColumn>
            <TableHeaderColumn style={styles.tableLeechSeed}>Leeches</TableHeaderColumn>
          </TableRow>
        </TableHeader>
      
        <TableBody displayRowCheckbox={false} showRowHover={true}>
          {rows}
        </TableBody>
      </Table>
    </div>;
  }
}

export default connect(({results}) => ({results}))(Body);

const styles = {
  container: {
    margin: '0 auto',
    width: '950px'
  },
  
  icon: {
    float: 'right',
    paddingRight: '30px'
  },
  
  title: {
    textAlign: 'center'
  },
  
  tableName: {
    width: '60%',
    paddingLeft: 0,
    paddingRight: 0
  },
  
  tableDateSize: {
    width: '12.5%',
    paddingLeft: 0,
    paddingRight: 0
  },
  
  tableLeechSeed: {
    width: '7.5%',
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0
  }
};