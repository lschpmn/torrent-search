'use strict';

import './index.html';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './components/Root';

injectTapEventPlugin();

const App = () => <MuiThemeProvider>
  <Root />
</MuiThemeProvider>;

ReactDom.render(<App />, document.getElementById('main'));