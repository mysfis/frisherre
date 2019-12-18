import React from 'react';
import loadable from '@loadable/component'

const IceskatingIcon = loadable(() => import('./skating_sport/iceskating'))
const RollerbladeIcon = loadable(() => import('./skating_sport/rollerblades-person'))
const SkateboardIcon = loadable(() => import('./skating_sport/skateboard-person-1'))
const HockeyIcon = loadable(() => import('./skating_sport/sport-hockey'))

const SkatingSportIcon = props => {
	switch (props.name) {
		case "iceskating": return <IceskatingIcon {...props} className={props.className} />
		case "rollerblade": return <RollerbladeIcon {...props} className={props.className} />
		case "skateboard": return <SkateboardIcon {...props} className={props.className} />
		case "hockey": return <HockeyIcon {...props} className={props.className} />
		default: return <RollerbladeIcon {...props} className={props.className} />
	}
}

export default SkatingSportIcon