import React from 'react';
import loadable from '@loadable/component'

const BicycleIcon = loadable(() => import('./fitness/fitness-bicycle'))
const MachineIcon = loadable(() => import('./fitness/fitness-machine'))
const CobraIcon = loadable(() => import('./fitness/yoga-cobra'))
const MeditateIcon = loadable(() => import('./fitness/yoga-meditate'))

const FitnessIcon = props => {
	
	switch (props.name) {
		case "bicycle": return <BicycleIcon {...props} className={props.className} />
		case "machine": return <MachineIcon {...props} className={props.className} />
		case "cobra": return <CobraIcon {...props} className={props.className} />
		case "meditate": return <MeditateIcon {...props} className={props.className} />
		default: return <MeditateIcon {...props} className={props.className} />
	}
}

export default FitnessIcon