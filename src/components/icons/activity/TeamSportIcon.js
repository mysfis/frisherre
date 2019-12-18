import React from 'react';
import loadable from '@loadable/component'

const BasketballIcon = loadable(() => import('./team_sport/basketball-hoop'))
const FootballIcon = loadable(() => import('./team_sport/football'))
const RugbyIcon = loadable(() => import('./team_sport/rugby-goal'))
const VolleyballIcon = loadable(() => import('./team_sport/volleyball-ball'))

const TeamSportIcon = props => {
	switch (props.name) {
		case "basketball": return <BasketballIcon {...props} className={props.className} />
		case "football": return <FootballIcon {...props} className={props.className} />
		case "rugby": return <RugbyIcon {...props} className={props.className} />
		case "volleyball": return <VolleyballIcon {...props} className={props.className} />
		default: return <BasketballIcon {...props} className={props.className} />
	}
}

export default TeamSportIcon