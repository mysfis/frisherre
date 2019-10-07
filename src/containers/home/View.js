import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


const HomeScreen = () => (
  <div >
    <Typography variant={'overline'}>Bruno Cochard vous présente</Typography>
    <Typography weight={'bold'} variant={'h4'} gutterBottom>
      <Link underline={'none'}>Keluno</Link> - le Copinage de Voisinage
    </Typography>
    <Typography gutterBottom>
      <b>Version Beta</b>
    </Typography>
    <Typography indent={'small'}>
      Keluno est une plateforme de bon voisinage pour réduire ensemble l'empreinte ecolo de ses communautés.
    </Typography>
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
          Je mene une association et doit arranger les transports vers le lieu des rencontres car les membres du club ne le font pas.
        </li>
        <li>
          Je vais seul au marché de la ville d'a cote alors que tous mes voisins y vont aussi seuls
        </li>
        <li>
          Je veux acheter des produits de fermiers locaux mais il ne peut livrer si j'achete seul
        </li>
      </ol>
    </Typography>
    <br />
      <Typography weight={'bold'} variant={'h5'} gutterBottom>
        Pourquoi ce besoin
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
  </div>
)

HomeScreen.propTypes = {

};
HomeScreen.defaultProps = {
};

export default HomeScreen;
