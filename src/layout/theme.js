import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: { main: '#00BFA5', contrastText: '#ffffff' },
    secondary: { main: '#FF7043', contrastText: '#ffffff' },
    info: { main: '#0080f3', contrastText: '#ffffff', light: "#2196f3" }
  },
  overrides: {
    MuiIconButton: {
      root: {
        color: 'white',
        '&:hover': {
          color: '#3f51b5'
        }
      }
    }
  }
})
