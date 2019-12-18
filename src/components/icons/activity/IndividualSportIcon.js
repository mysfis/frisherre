import React from 'react';
import loadable from '@loadable/component'

const ArcheryIcon = loadable(() => import('./individual_sport/archery-bow-1'))
const AhtleticsIcon = loadable(() => import('./individual_sport/athletics-running'))
const DancingIcon = loadable(() => import('./individual_sport/dancing-ballet-dress'))
const GymnasticsIcon = loadable(() => import('./individual_sport/gymnastics-acrobatic'))
const ShootingIcon = loadable(() => import('./individual_sport/shooting-rifle-target'))
const HorseIcon = loadable(() => import('./individual_sport/sport-horse-riding'))

const IndividualSportIcon = props => {
	switch (props.name) {
		case "archery": return <ArcheryIcon {...props} className={props.className} />
		case "athletics": return <AhtleticsIcon {...props} className={props.className} />
		case "dancing": return <DancingIcon {...props} className={props.className} />
		case "gymnastics": return <GymnasticsIcon {...props} className={props.className} />
		case "gashootingme": return <ShootingIcon {...props} className={props.className} />
		case "horse": return <HorseIcon {...props} className={props.className} />
		default: return <AhtleticsIcon {...props} className={props.className} />
	}
}

export default IndividualSportIcon