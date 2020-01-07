const groupByCommunity = memberships => {
    return memberships.reduce((prev, curr) => ([...prev, {...curr.community, status:curr.status} ]), [] )
}

export default groupByCommunity