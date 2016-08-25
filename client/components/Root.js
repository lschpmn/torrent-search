'use strict';

import React, {Component} from 'react';
import Body from './Body';
import Head from './Head';

export default class Root extends Component {
  render() {
    return <div style={styles.container}>
      <div style={{display: 'flex'}}>
        <Head />
      </div>
      
      <div>
        <Body />
      </div>
    </div>;
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
};