import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: { main: '#00BFA5', contrastText: '#000000' },
    secondary: { main: '#FF7043', contrastText: '#000000' }
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
