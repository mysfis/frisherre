import React from 'react';
import loadable from '@loadable/component'

const BordgameIcon = loadable(() => import('./game/board-game-dice'))
const BowlingIcon = loadable(() => import('./game/bowling-set'))
const CardsIcon = loadable(() => import('./game/card-game-cards'))
const ChessIcon = loadable(() => import('./game/chess-knight'))


const GameIcon = props => {
	switch (props.name) {
		case "boardgame": return <BordgameIcon {...props} className={props.className} />
		case "bowling": return <BowlingIcon {...props} className={props.className} />
		case "cards": return <CardsIcon {...props} className={props.className} />
		case "chess": return <ChessIcon {...props} className={props.className} />
		default: return <CardsIcon {...props} className={props.className} />
	}
}

export default GameIcon