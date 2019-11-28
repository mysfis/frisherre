import React from 'react'
import { AuthProvider } from './auth'
import { UserProvider } from './user'

function ContextProviders ({ children }) {
    return (
        <AuthProvider>
            <UserProvider>{children}</UserProvider>
        </AuthProvider>)
}

export default ContextProviders