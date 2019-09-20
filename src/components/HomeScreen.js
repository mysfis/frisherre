import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


const HomeScreen = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant={'overline'}>Bruno Cochard vous présente</Typography>
    <Typography weight={'bold'} variant={'h4'} gutterBottom>
      <Link underline={'none'}>Keluno</Link> - le Copinage de Voisinage
    </Typography>
    <Typography gutterBottom>
      <b>Version Beta</b>
    </Typography>
    <Typography indent={'small'}>
      Keluno est une plateforme de bon voisinage pour partager les déplacements
      du quotidien, les outils d'entretien, et les apéros.
    </Typography>
    <br />
    <br />
    <br />
    <Typography weight={'bold'} variant={'h5'} gutterBottom>
      {"Pourquoi une telle plateforme"}
    </Typography>
    <Typography gutterBottom>
      <b>Il y a trop de voiture roulant avec une seule personne</b>
    </Typography>
    <Typography component={'div'}>
      <ol>
        <li>
          Mon fils va au sport dans la ville d'à côté avec des enfants de mon voisinage, mais 9 fois sur 10 nous ne pensons pas a nous arranger pour le tranport
        </li>
        <li>
          Mes parents sont dans une association sportive et doivent arranger les transports vers le lieu des competitions car les membres du club ne le font pas.
        </li>
        <li>
          Les voisins ne se connaissent plus comme avant, et les plateformes classiques ne permettent pas de les rencontrer.
        </li>
      </ol>
    </Typography>
    <br />
    <br />
    <br />
  </div>
)

HomeScreen.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};
HomeScreen.defaultProps = {
};

export default HomeScreen;
