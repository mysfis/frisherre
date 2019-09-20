import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import CustomRoot from './layout/CustomRoot';
import CustomHeader from './layout/CustomHeader';
import CustomHeaderAnon from './layout/CustomHeaderAnon';
import CustomNav from './layout/CustomNav';
import CustomContent from './layout/CustomContent';
import CustomFooter from './layout/CustomFooter';
import theme from './layout/theme'
import Login from './components/Login'

import { connect } from 'react-redux';
import * as actions from './store/actions/auth';

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutopSignup();
  }
  render() {
    if (this.props.isAuthenticated) {
      return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
          <CustomRoot >
            <CustomHeader />
            <CustomNav />
            <CustomContent />
            <CustomFooter />
          </CustomRoot>
        </MuiThemeProvider>
      );
    } else {
      return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
            <CustomRoot >
              <CustomHeaderAnon />
              <Login />
              <CustomFooter />
            </CustomRoot>
        </MuiThemeProvider>
  );}
}
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutopSignup: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
