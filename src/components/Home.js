import React from 'react'

import { useAuth } from 'context/auth'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'

function HomeScreen (props) {
    
    const { authData } = useAuth()

    return (
    <Container component="main" p={{ xs: 2, sm: 3, md: 4 }} >
        <Typography variant={'overline'}>Bruno Cochard vous présente</Typography>
        <Typography weight={'bold'} variant={'h4'} gutterBottom>
        <Link underline={'none'}>Keluno</Link> - le Copinage de Voisinage
        </Typography>
        <Typography gutterBottom>
        <b>Version Beta for </b>
        {authData.profile?
            authData.profile.first_name
            :
            ""}
        </Typography>
        <Typography indent={'small'}>
        Keluno est une plateforme de bon voisinage pour réduire ensemble l'empreinte carbone de nos communautés.
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
            Mon fils est dans un club sportif dans la ville d'à côté avec des 
            enfants de mon voisinage, mais 9 fois sur 10 je ne pense pas a
            m'arranger avec leurs parents pour le tranport
            </li>
            <li>
            Je mene une association et doit arranger les transports vers le 
            lieu des rencontres, sinon chaque parent ne conduit que son enfant
            </li>
            <li>
            Je vais seul au supermarché de la ville d'à coté alors que 
            plusieurs de mes voisins y vont aussi seuls
            </li>
            <li>
            Je veux acheter des produits de fermiers locaux mais ils ne peuvent
             pas me livrer si j'achete seul
            </li>
            <li>
            J'ai besoin d'une tondeuse mais je ne tond ma pelouse qu'une fois 
            par mois et cela me prend 30 min
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
            Parce que les voisins ne s'arrangent pas entre eux d'eux meme
            </li>
            <li>
            Parce que les voisins ne se parlent plus comme avant
            </li>
            <li>
            Parce que l’on ne connait plus forcement ses voisins ou allons leur parler
            </li>
            <li>
            Parce que nos capacités sociales se sont atrophiées avec les reseaux sociaux
            </li>
        </ol>
        </Typography>
        <br />
    </Container>)
    }

    HomeScreen.propTypes = {

    };
    HomeScreen.defaultProps = {
    };
    // const mapStateToProps = (state) => {
    // return {
    //     token: state.token,
    //     profile: state.profile
    // }
    // }

    // export default connect(mapStateToProps)(HomeScreen);
    export default HomeScreen;

