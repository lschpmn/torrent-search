'use strict';

import CircularProgress from 'material-ui/CircularProgress';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import MyTable from './MyTable';

class Body extends Component {
  /**
   * @param {Boolean} _props.isLoading
   * @param {String} _props.searchTerm
   * @param {torrentResult[]} _props.results
   */
  constructor(_props) {
    super(_props);
    this.props = _props;
    this.state = {seal: true};
  }
  
  componentWillReceiveProps({isLoading, searchTerm}) {
    //when first search is done loading, seal is broken
    if(this.state.seal && searchTerm !== '' && !isLoading) this.setState({seal: false});
  }
  
  render() {
    const resultsBody = <span>
      <h1 style={styles.title}>Search Results</h1>
        
      <MyTable results={this.props.results}/>
    </span>;
    
    return <div style={styles.container}>
      {this.props.isLoading //loading indicator
        ? <div style={styles.loadingIconContainer}><CircularProgress style={styles.loadingIcon} /></div> : null}
        
      {this.state.seal //if seal isn't broke, displays welcome message
        ? <div style={styles.largeText}>Welcome</div> 
        : this.props.results.length === 0
          ? <div style={styles.largeText}>No Results Found</div> 
          : resultsBody}
    </div>;
  }
}

export default connect(({isLoading, results, searchTerm}) => ({isLoading, results, searchTerm}))(Body);

const styles = {
  container: {
    margin: '0 auto',
    width: '950px',
    position: 'relative'
  },
  
  largeText: {
    textAlign: 'center',
    fontSize: '2em',
    fontWeight: 'bold'
  },
  
  loadingIcon: {
    margin: '0 auto',
    display: 'block'
  },
  
  loadingIconContainer: {
    marginTop: '75px',
    position: 'absolute',
    width: '100%'
  },
  
  title: {
    textAlign: 'center'
  }
};