import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';


const Schedule = ({ classes }) => (
  <div className={classes.root}>
    <Typography weight={'bold'} variant={'h5'} gutterBottom>
      Analyse du besoin
    </Typography>
    <Typography component={'div'}>
      <ol>
        <li>
          Parce que les enfants de mon voisinage ont les meme activités que mon enfant, pour lesquelles il faut les emmener en voiture.
        </li>
        <li>
          Parce que les activités sont beaucoup plus diverses et éloignées et nécessite la voiture
        </li>
        <li>
          Parce qu’on ne demande pas a ses voisins si ils y vont aussi
        </li>
        <li>
          Parce que les voisins ne se parlent plus comme avant
        </li>
        <li>
          Parce que l’on ne connait plus forcement ses voisins ou allons leur parler
        </li>
        <li>
          Parce que nos capacités sociales se sont atrophiées comme Tinder pour les rencontres
        </li>
      </ol>
    </Typography>
    <br />
    <br />
    <br />
  </div>
)

Schedule.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};
Schedule.defaultProps = {
};

export default Schedule;
