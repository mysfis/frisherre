import React from 'react'
import RootLayout from 'layout/RootLayout';
import HeaderUserContainer from 'layout/header/HeaderUserContainer';
import NavContainer from 'layout/nav/NavContainer';
import ContentContainer from 'layout/content/ContentContainer';
import FooterContainer from 'layout/footer/FooterContainer';

function AuthenticatedLayout() {
    return (
        <RootLayout >
            <HeaderUserContainer />
            <NavContainer />
            <ContentContainer />
            <FooterContainer />
        </RootLayout>
    )
}

export default AuthenticatedLayout