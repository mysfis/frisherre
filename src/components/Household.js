import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const householdData = [
    {
        "url": "",
        "first_name": "",
        "last_name": "",
        "birth_date": "",
        "account": {
            "url": "",
            "houselhold_name": "",
            "address_line1": "",
            "address_line2": "",
            "country": "",
            "city": "",
            "zip": ""
        }
    }
]

const Household = ({ token, classes }) => {
  const [household, setHousehold] = useState(householdData)

  const getHousehold = React.useCallback(() => {
    if (token !== null) {
      axios.defaults.headers= {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      }
      axios
          .get("/api/profile/")
          .then(res => setHousehold(res.data))
          .catch(err => console.log(err));
    }
  }, [token])
  useEffect(() => getHousehold(), [getHousehold]);

  return (
    <div className={classes.root}>
      <Typography weight={'bold'} variant={'h4'} gutterBottom>
        <Link underline={'none'}>{household[0].account.houselhold_name}</Link>
      </Typography>
      <Typography variant={'overline'}>
        <b>{household[0].account.address_line1} {household[0].account.address_line2}</b>
      </Typography>
      <Typography indent={'small'}>
        ({household.length} membres)
      </Typography>
      <br />
      <Typography weight={'bold'} variant={'h5'} gutterBottom>
        {"Composition"}
      </Typography>
      <Typography component={'div'}>
        <ol>
        {household.map(profile => (
            <li key={profile.url}>{profile.first_name}</li>
        ))}
        </ol>
      </Typography>
      <br />
      <br />
      <br />
    </div>
  )
}

Household.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};
Household.defaultProps = {
};


const mapStateToProps = (state) => {
  return {
    token: state.token,
  }
}

export default connect(mapStateToProps)(Household);
