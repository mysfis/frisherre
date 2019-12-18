import React from 'react';
import loadable from '@loadable/component'


const AmusementParkIcon = loadable(() => import('./outing/amusement-park-electric-cars'))
const CampingIcon = loadable(() => import('./outing/camping-tent-forest'))
const ConcertIcon = loadable(() => import('./outing/concert-microphone'))
const MarketIcon = loadable(() => import('./outing/farmer-market-kiosk'))
const MovieIcon = loadable(() => import('./outing/movie-cinema-watch-1'))
const Partycon = loadable(() => import('./outing/party-confetti'))

const OutingIcon = props => {
	
	switch (props.name) {
		case "amusement-park": return <AmusementParkIcon {...props} className={props.className} />
		case "camping": return <CampingIcon {...props} className={props.className} />
		case "concert": return <ConcertIcon {...props} className={props.className} />
		case "market": return <MarketIcon {...props} className={props.className} />
		case "movie": return <MovieIcon {...props} className={props.className} />
		case "party": return <Partycon {...props} className={props.className} />
		default: return <Partycon {...props} className={props.className} />
	}
}

export default OutingIcon