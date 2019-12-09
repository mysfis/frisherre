import React from 'react'
import RootLayout from 'layout/RootLayout';
import HeaderAnonContainer from 'layout/header/HeaderAnonContainer';
import FooterContainer from 'layout/footer/FooterContainer';
import Login from 'components/auth/Login'

function AnonymousLayout() {
    return (
        <RootLayout >
            <HeaderAnonContainer />
            <Login />
            <FooterContainer />
        </RootLayout>
    )
}

export default AnonymousLayout