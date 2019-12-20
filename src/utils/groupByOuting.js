const groupByOuting = (outings, my_profile, house_profiles) => { 
    return outings.reduce((prev, curr) => {
        const my_attendance = curr.attendances.filter(attendance => attendance.profile.url===my_profile.url)
        const mine = my_attendance.length !== 0
        if (!mine) {
            const house_profiles_url = house_profiles.reduce((list, item) => ([...list, item.url]), [])
            const house_attendance = curr.attendances.filter(attendance => house_profiles_url.includes(attendance.profile.url))
            const not_house_attendance = curr.attendances.filter(attendance => !house_profiles_url.includes(attendance.profile.url))
            return ([...prev, {...curr, mine: false, participation: house_attendance[0], attendees: not_house_attendance} ])
        }
        const other_attendance = curr.attendances.filter(attendance => attendance.profile.url!==my_profile.url)
        return ([...prev, {...curr, mine: true, participation: my_attendance[0], attendees: other_attendance} ])
        }, [] )
}

export default groupByOuting