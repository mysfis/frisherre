import React from 'react';
import loadable from '@loadable/component'

const SwimmingIcon = loadable(() => import('./water_sport/swimming'))
const WaterpoloIcon = loadable(() => import('./water_sport/swimming-waterpolo'))


const WaterSportIcon = props => {
	switch (props.name) {
		case "swimming": return <SwimmingIcon {...props} className={props.className} />
		case "waterpolo": return <WaterpoloIcon {...props} className={props.className} />
		default: return <SwimmingIcon {...props} className={props.className} />
	}
}

export default WaterSportIcon