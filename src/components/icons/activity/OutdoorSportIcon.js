import React from 'react';
import loadable from '@loadable/component'

const BikingIcon = loadable(() => import('./outdoor_sport/biking-person.js'))
const ClimbingIcon = loadable(() => import('./outdoor_sport/climbing-mountain'))
const GolfIcon = loadable(() => import('./outdoor_sport/golf-hole-aim'))

const OutdoorSportIcon = props => {
	switch (props.name) {
		case "biking": return <BikingIcon {...props} className={props.className} />
		case "climbing": return <ClimbingIcon {...props} className={props.className} />
		case "golf": return <GolfIcon {...props} className={props.className} />
		default: return <BikingIcon {...props} className={props.className} />
	}
}

export default OutdoorSportIcon