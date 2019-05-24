import React from "react";
import {Container, Grid, Typography} from "@material-ui/core";

const Dashboard = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1">Dashboard</Typography>
          <Typography variant="h4">You are logged in :)</Typography>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            atque aliquid quisquam eius cumque eligendi sint voluptatibus quae
            voluptatum hic nemo error perspiciatis tempore impedit nisi,
            voluptates porro, doloremque consectetur.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
            aspernatur repellat cum beatae harum? Nemo vel perferendis fugit
            quidem beatae, accusamus veniam cumque enim dignissimos sint
            explicabo facere, quae harum!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            vel similique quasi et iure, sunt ex molestias aliquid, corrupti a
            neque laudantium voluptatibus numquam, dignissimos consequatur
            autem. Quo, vel voluptatibus.
          </p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
