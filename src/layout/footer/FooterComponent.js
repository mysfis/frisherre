import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Copyright from 'components/copyright'

const FooterComponent = () => (
  <div style={{ maxWidth: 700, margin: "auto", textAlign: "center" }}>
    <Copyright />
    <Divider style={{ margin: "24px auto", width: 60 }} />
    <Grid container justify={"center"} spacing={2}>
      <Grid item xs={4} sm={4} md={4}>
        <Typography align={"center"} gutterBottom color={"textSecondary"}>
          A propos
        </Typography>
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
        <Typography align={"center"} gutterBottom color={"textSecondary"}>
          Conditions
        </Typography>
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
        <Typography align={"center"} gutterBottom color={"textSecondary"}>
        Contact
          {/* <Link color="inherit" href="mailto:bruno.cochard@gmail.com?Subject=Keluno%20demande">Contact</Link> */}
        </Typography>
      </Grid>
    </Grid>
  </div>
);

FooterComponent.propTypes = {};
FooterComponent.defaultProps = {};

export default FooterComponent;
