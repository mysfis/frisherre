import React from 'react';
import loadable from '@loadable/component'

const BadmingtonIcon = loadable(() => import('./racket_sport/badminton-shuttlecock-racquet'))
const PingpongIcon = loadable(() => import('./racket_sport/ping-pong-paddle'))
const TennisIcon = loadable(() => import('./racket_sport/tennis-net'))

const RacketSportIcon = props => {
	switch (props.name) {
		case "badmington": return <BadmingtonIcon {...props} className={props.className} />
		case "pingpong": return <PingpongIcon {...props} className={props.className} />
		case "tennis": return <TennisIcon {...props} className={props.className} />
		default: return <TennisIcon {...props} className={props.className} />
	}
}

export default RacketSportIcon