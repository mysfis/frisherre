import React from 'react';
import loadable from '@loadable/component'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
	avatar: {
	  width: 36,
	  height: 36,
	  borderRadius: 10,
	  fontSize: '0.8em',
	},
	big: {
        padding: 0,
        width: 92,
        height: 92,
	  	borderRadius: 45,
	},
	medium: {
		width: 48,
		height: 48,
		borderRadius: 24,
	},
	small: {
		width: 36,
		height: 36,
		borderRadius: 16,
	},
	highlight: {
		border: '2px solid',
		borderColor: theme.palette.secondary.main,
		color: theme.palette.secondary.main,
		// backgroundColor: theme.palette.primary.main,
	}
  }));

const FitnessIcon = loadable(() => import('./activity/FitnessIcon'))
const GameIcon = loadable(() => import('./activity/GameIcon'))
const IndividualSportIcon = loadable(() => import('./activity/IndividualSportIcon'))
const MartialArtIcon = loadable(() => import('./activity/MartialArtIcon'))
const OutdoorSportIcon = loadable(() => import('./activity/OutdoorSportIcon'))
const OutingIcon = loadable(() => import('./activity/OutingIcon'))
const RacketSportIcon = loadable(() => import('./activity/RacketSportIcon'))
const SkatingSportIcon = loadable(() => import('./activity/SkatingSportIcon'))
const TeamSportIcon = loadable(() => import('./activity/TeamSportIcon'))
const WaterSportIcon = loadable(() => import('./activity/WaterSportIcon'))

const CategoryIcon = props => {
	const classes = useStyles();
	let avatarClass = props.className? props.className : `${classes.avatar}`
	switch(props.size) {
		case 'big':
			avatarClass = `${avatarClass} ${classes.big}`
			break;
		case 'medium':
			avatarClass = `${avatarClass} ${classes.medium}`
			break;
		case 'small':
			avatarClass = `${avatarClass} ${classes.small}`
			break;
		default:
		 	break;
	  }
	if(props.highlight) {
		avatarClass = `${avatarClass} ${classes.highlight}`}

	switch (props.category) {
		case "fitness": return <FitnessIcon {...props} className={avatarClass} />
		case "game": return <GameIcon {...props} className={avatarClass} />
		case "individualsport": return <IndividualSportIcon {...props} className={avatarClass} />
		case "martialart": return <MartialArtIcon {...props} className={avatarClass} />
		case "outdoorsport": return <OutdoorSportIcon {...props} className={avatarClass} />
		case "outing": return <OutingIcon {...props} className={avatarClass} />
		case "racketsport": return <RacketSportIcon {...props} className={avatarClass} />
		case "skatingsport": return <SkatingSportIcon {...props} className={avatarClass} />
		case "teamsport": return <TeamSportIcon {...props} className={avatarClass} />
		case "watersport": return <WaterSportIcon {...props} className={avatarClass} />
		default: return <OutingIcon {...props} className={avatarClass} />
	}
}

export default CategoryIcon