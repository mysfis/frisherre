import React from 'react'
import { connect } from 'react-redux';

import * as actions from 'store/actions/auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import RootLayout from 'layout/RootLayout';
import HeaderUserContainer from 'layout/header/HeaderUserContainer';
import HeaderAnonContainer from 'layout/header/HeaderAnonContainer';
import NavContainer from 'layout/nav/NavContainer';
import ContentContainer from 'layout/content/ContentContainer';
import FooterContainer from 'layout/footer/FooterContainer';
import theme from 'layout/theme'
import Login from 'components/auth/Login'

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
