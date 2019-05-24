import React from "react";
import {Container, Grid, Typography} from "@material-ui/core";

const Home = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1">Home</Typography>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            cum voluptate perferendis corrupti voluptatem veritatis laboriosam
            aspernatur, quaerat optio provident culpa facilis laborum quidem
            excepturi, doloribus officia vero ea asperiores.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ad
            ratione distinctio nobis nostrum reprehenderit rerum inventore,
            provident excepturi dicta autem aperiam ducimus ab aliquam fugiat
            adipisci perferendis quibusdam amet.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero est,
            nam beatae dolor recusandae nulla voluptates nemo possimus sint
            architecto veritatis, consequuntur accusantium enim corporis atque
            deleniti ipsum fugit maiores?
          </p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
