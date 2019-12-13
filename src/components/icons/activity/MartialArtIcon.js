import React from 'react';
import loadable from '@loadable/component'

const BoxingIcon = loadable(() => import('./martial_art/boxing-boxer-bag'))
const FencingIcon = loadable(() => import('./martial_art/fencing-person'))
const KarateIcon = loadable(() => import('./martial_art/martial-arts-karate.js'))


const MartialArtIcon = props => {
	switch (props.name) {
		case "boxing": return <BoxingIcon {...props} className={props.className} />
		case "fencing": return <FencingIcon {...props} className={props.className} />
		case "karate": return <KarateIcon {...props} className={props.className} />

		default: return <KarateIcon {...props} className={props.className} />
	}
}

export default MartialArtIcon