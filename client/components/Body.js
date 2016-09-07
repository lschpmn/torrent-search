'use strict';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import moment from 'moment';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Body extends Component {
  /**
   * @param {torrentResult[]} _props.results
   */
  constructor(_props) {
    super(_props);
    this.props = _props;
    this.state = {
      sortProp: 'seed',
      sortDirection: false //false is descending, true is ascending
    };
  }
  
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
  
  /**
   * @param {String} sortProp - The property on the torrentResult object that will be sorted
   * @private
   */
  _sort(sortProp) {
    if(this.state.sortProp === sortProp) this.setState({sortDirection: !this.state.sortDirection});
    else this.setState({sortDirection: false, sortProp});
  }
  
  /**
   * Reads from state and displays arrow if item is sorted, as well as renders proper arrow direction
   * @param {String} sortProp
   * @private
   */
  _renderSortArrow(sortProp) {
    if(this.state.sortProp !== sortProp) return null;
    const rotate = this.state.sortDirection ? 'rotate(90deg)' : 'rotate(270deg)';
    
    return <div style={{
      WebkitTransform: rotate,
      MsTransform: rotate,
      MozTransform: rotate,
      transform: rotate,
      display: 'inline-block',
      fontWeight: 'bold',
      fontSize: '1.2em'
    }}>&lt;</div>;
  }
  
  render() {
    console.log(this.state);
    const rows = this.props.results
      .sort((resultA, resultB) => {
        return this.state.sortDirection 
          ? resultA[this.state.sortProp] - resultB[this.state.sortProp]
          : resultB[this.state.sortProp] - resultA[this.state.sortProp];
      })
      .map(/**torrentResult*/ result => {
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
    
    //template for all sortable headers
    const header = (sortProp, display, style) => <TableHeaderColumn style={style}>
      <div onClick={() => this._sort(sortProp)} style={{cursor: 'pointer', WebkitUserSelect: 'none', MsUserSelect: 'none', MozUserSelect: 'none', userSelect: 'none'}}>
        {display} {this._renderSortArrow(sortProp)}
      </div>
    </TableHeaderColumn>;
  
    return <div style={styles.container}>
      <h1 style={styles.title}>Search Results</h1>
    
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={styles.tableName}>Name</TableHeaderColumn>
            
            {header('date', 'Age', styles.tableDateSize)}
            {header('size', 'Size', styles.tableDateSize)}
            {header('seed', 'Seeds', styles.tableLeechSeed)}
            {header('leech', 'Leeches', styles.tableLeechSeed)}
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