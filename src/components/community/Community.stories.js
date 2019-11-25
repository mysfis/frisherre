import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import CommunityCard from 'components/community/CommunityCard'
import CommunityGrid from 'components/community/CommunityGrid'

export const community = {
    url: 'http://localhost:8000/api/community/1/',
    name: 'Omnisport La Pom',
    location: 'La Pommeraye',
    description: "Ecole omnisport pour les enfants et les adultes qui veulent jouer avec",
    category:"sport",
    icon:"swimming",
}

export const invitedCommunity = {...community, state: "INVITED", icon:"party",}
export const joinedCommunity = {...community, state: "JOINED", icon:"pingpong",}
export const otherCommunity = {...community, icon:"football2",}
// delete joinedCommunity.location

export const actions = {
    // handleEdit: action('handleEdit'),
    // handleDelete: action('handleDelete'),
    join: action('join'),
    leave: action('leave'),
    contact: action('contact'),
    viewMembers: action('viewMembers'),
    apply: action('apply'),
}

storiesOf('Community', module)
    .add('Grid default', () => 
        <CommunityGrid 
            communities={[community, invitedCommunity, joinedCommunity, otherCommunity]}
            actions={actions} />)
    .add('Grid loading', () => 
        <CommunityGrid loading
            communities={[]}
            actions={actions} />)
    .add('Grid empty', () => 
        <CommunityGrid 
            communities={[]}
            actions={actions}
            data={[community, invitedCommunity, joinedCommunity]} />)
    .add('default', () => <CommunityCard community={community} actions={actions} />)
    .add('invited', () => <CommunityCard community={invitedCommunity} actions={actions} />)
    .add('joined', () => <CommunityCard community={joinedCommunity} actions={actions} />)
