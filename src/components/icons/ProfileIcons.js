import React from 'react';
import loadable from '@loadable/component'
import { makeStyles } from '@material-ui/core/styles';
import { blue, red, green } from '@material-ui/core/colors';

const Man01 = loadable(() => import('./profile/man-01'))
const Man02 = loadable(() => import('./profile/man-02'))
const Man03 = loadable(() => import('./profile/man-03'))
const Man04 = loadable(() => import('./profile/man-04'))
const Man05 = loadable(() => import('./profile/man-05'))
const Man06 = loadable(() => import('./profile/man-06'))
const Man07 = loadable(() => import('./profile/man-07'))
const Man08 = loadable(() => import('./profile/man-08'))
const Man09 = loadable(() => import('./profile/man-09'))
const Man10 = loadable(() => import('./profile/man-10'))
const Man11 = loadable(() => import('./profile/man-11'))
const Man12 = loadable(() => import('./profile/man-12'))
const Man13 = loadable(() => import('./profile/man-13'))
const Man14 = loadable(() => import('./profile/man-14'))
const Man15 = loadable(() => import('./profile/man-15'))
const Man16 = loadable(() => import('./profile/man-16'))
const Man17 = loadable(() => import('./profile/man-17'))
const Man18 = loadable(() => import('./profile/man-18'))
const Man19 = loadable(() => import('./profile/man-19'))
const Man20 = loadable(() => import('./profile/man-20'))
const Man21 = loadable(() => import('./profile/man-21'))
const Man22 = loadable(() => import('./profile/man-22'))
const Man23 = loadable(() => import('./profile/man-23'))
const Man24 = loadable(() => import('./profile/man-24'))
const Man25 = loadable(() => import('./profile/man-25'))

const Woman01 = loadable(() => import('./profile/woman-01'))
const Woman02 = loadable(() => import('./profile/woman-02'))
const Woman03 = loadable(() => import('./profile/woman-03'))
const Woman04 = loadable(() => import('./profile/woman-04'))
const Woman05 = loadable(() => import('./profile/woman-05'))
const Woman06 = loadable(() => import('./profile/woman-06'))
const Woman07 = loadable(() => import('./profile/woman-07'))
const Woman08 = loadable(() => import('./profile/woman-08'))
const Woman09 = loadable(() => import('./profile/woman-09'))
const Woman10 = loadable(() => import('./profile/woman-10'))
const Woman11 = loadable(() => import('./profile/woman-11'))
const Woman12 = loadable(() => import('./profile/woman-12'))
const Woman13 = loadable(() => import('./profile/woman-13'))
const Woman14 = loadable(() => import('./profile/woman-14'))
const Woman15 = loadable(() => import('./profile/woman-15'))
const Woman16 = loadable(() => import('./profile/woman-16'))
const Woman17 = loadable(() => import('./profile/woman-17'))
const Woman18 = loadable(() => import('./profile/woman-18'))
const Woman19 = loadable(() => import('./profile/woman-19'))
const Woman20 = loadable(() => import('./profile/woman-20'))
const Woman21 = loadable(() => import('./profile/woman-21'))
const Woman22 = loadable(() => import('./profile/woman-22'))
const Woman23 = loadable(() => import('./profile/woman-23'))
const Woman24 = loadable(() => import('./profile/woman-24'))
const Woman25 = loadable(() => import('./profile/woman-25'))

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
	red: {
		backgroundColor: red[100]
	},
	blue: {
		backgroundColor: blue[100]
	},
	green: {
		backgroundColor: green[100]
	},
  }));

const ProfileIcon = props => {
	const classes = useStyles();
	let avatarClass = `${classes.avatar}`
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
	console.log(avatarClass)
	switch(props.color) {
		case 'red':
			avatarClass = `${avatarClass} ${classes.red}`
			break;
		case 'blue':
			avatarClass = `${avatarClass} ${classes.blue}`
			break;
		case 'green':
			avatarClass = `${avatarClass} ${classes.green}`
			break;
		default:
			break;
	}

	switch (props.name) {
		case 'man01': return <Man01 className={avatarClass}/>
		case 'man02': return <Man02 className={avatarClass}/>
		case 'man03': return <Man03 className={avatarClass}/>
		case 'man04': return <Man04 className={avatarClass}/>
		case 'man05': return <Man05 className={avatarClass}/>
		case 'man06': return <Man06 className={avatarClass}/>
		case 'man07': return <Man07 className={avatarClass}/>
		case 'man08': return <Man08 className={avatarClass}/>
		case 'man09': return <Man09 className={avatarClass}/>
		case 'man10': return <Man10 className={avatarClass}/>
		case 'man11': return <Man11 className={avatarClass}/>
		case 'man12': return <Man12 className={avatarClass}/>
		case 'man13': return <Man13 className={avatarClass}/>
		case 'man14': return <Man14 className={avatarClass}/>
		case 'man15': return <Man15 className={avatarClass}/>
		case 'man16': return <Man16 className={avatarClass}/>
		case 'man17': return <Man17 className={avatarClass}/>
		case 'man18': return <Man18 className={avatarClass}/>
		case 'man19': return <Man19 className={avatarClass}/>
		case 'man20': return <Man20 className={avatarClass}/>
		case 'man21': return <Man21 className={avatarClass}/>
		case 'man22': return <Man22 className={avatarClass}/>
		case 'man23': return <Man23 className={avatarClass}/>
		case 'man24': return <Man24 className={avatarClass}/>
		case 'man25': return <Man25 className={avatarClass}/>

		case 'woman01': return <Woman01 className={avatarClass}/>
		case 'woman02': return <Woman02 className={avatarClass}/>
		case 'woman03': return <Woman03 className={avatarClass}/>
		case 'woman04': return <Woman04 className={avatarClass}/>
		case 'woman05': return <Woman05 className={avatarClass}/>
		case 'woman06': return <Woman06 className={avatarClass}/>
		case 'woman07': return <Woman07 className={avatarClass}/>
		case 'woman08': return <Woman08 className={avatarClass}/>
		case 'woman09': return <Woman09 className={avatarClass}/>
		case 'woman10': return <Woman10 className={avatarClass}/>
		case 'woman11': return <Woman11 className={avatarClass}/>
		case 'woman12': return <Woman12 className={avatarClass}/>
		case 'woman13': return <Woman13 className={avatarClass}/>
		case 'woman14': return <Woman14 className={avatarClass}/>
		case 'woman15': return <Woman15 className={avatarClass}/>
		case 'woman16': return <Woman16 className={avatarClass}/>
		case 'woman17': return <Woman17 className={avatarClass}/>
		case 'woman18': return <Woman18 className={avatarClass}/>
		case 'woman19': return <Woman19 className={avatarClass}/>
		case 'woman20': return <Woman20 className={avatarClass}/>
		case 'woman21': return <Woman21 className={avatarClass}/>
		case 'woman22': return <Woman22 className={avatarClass}/>
		case 'woman23': return <Woman23 className={avatarClass}/>
		case 'woman24': return <Woman24 className={avatarClass}/>
		case 'woman25': return <Woman25 className={avatarClass}/>
		default: 
			return <Man01 className={avatarClass} />
	}
}

export default ProfileIcon