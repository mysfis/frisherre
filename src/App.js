import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'layout/theme'

import { useAuth } from 'context/auth';
import { FullPageSpinner } from 'layout/FullPageSpinner';

const loadAuthenticatedLayout = () => import('layout/AuthenticatedLayout')
const AuthenticatedLayout = React.lazy(loadAuthenticatedLayout)
const AnonymousdLayout = React.lazy(() => import('layout/AnonymousLayout'))

function App () {
    const { authData } = useAuth()
    React.useEffect(()=> { loadAuthenticatedLayout() }, [])
    
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <React.Suspense fallback={<FullPageSpinner />} >
            { authData.isAuthenticated ?
                <AuthenticatedLayout />
            :
                <AnonymousdLayout />
            }
            </React.Suspense>
        </MuiThemeProvider>
    )
}

export default App