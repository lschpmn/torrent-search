'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import MyTable from './MyTable';

class Body extends Component {
  /**
   * @param {torrentResult[]} _props.results
   */
  constructor(_props) {
    super(_props);
    this.props = _props;
  }
  
  render() {
    return <div style={styles.container}>
      <h1 style={styles.title}>Search Results</h1>
    
      <MyTable results={this.props.results}/>
    </div>;
  }
}

export default connect(({results}) => ({results}))(Body);

const styles = {
  container: {
    margin: '0 auto',
    width: '950px'
  },
  
  title: {
    textAlign: 'center'
  }
};