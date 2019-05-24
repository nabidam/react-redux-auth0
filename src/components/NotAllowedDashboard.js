import React from "react";
import {Container, Grid, Typography} from "@material-ui/core";

const NotAllowedDashboard = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">
            You don't have permission to be here!!!
          </Typography>
          <Typography variant="h6">You should first log in :)</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotAllowedDashboard;
