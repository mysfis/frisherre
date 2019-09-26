import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import RootLayout from './layout/RootLayout';
import HeaderUserContainer from './layout/HeaderUserContainer';
import HeaderAnonContainer from './layout/HeaderAnonContainer';
import NavContainer from './layout/NavContainer';
import ContentContainer from './layout/ContentContainer';
import FooterContainer from './layout/FooterContainer';
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
          <RootLayout >
            <HeaderUserContainer />
            <NavContainer />
            <ContentContainer />
            <FooterContainer />
          </RootLayout>
        </MuiThemeProvider>
      );
    } else {
      return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
            <RootLayout >
              <HeaderAnonContainer />
              <Login />
              <FooterContainer />
            </RootLayout>
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
