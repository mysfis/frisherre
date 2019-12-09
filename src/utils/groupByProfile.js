const groupByProfile = registers => {
    return registers.reduce((prev, curr) => ([...prev, {...curr.profile, role:curr.role} ]), [] )
}

export default groupByProfile