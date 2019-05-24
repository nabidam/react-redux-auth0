import React from "react";
import {Container, Grid, Typography} from "@material-ui/core";

const About = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1">About</Typography>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui sit
            non tenetur voluptatum hic cum optio suscipit, nulla ratione
            reprehenderit quam cupiditate odit expedita eaque dicta repellat
            deleniti error id.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            quo eos unde exercitationem perspiciatis eius numquam optio. Ullam,
            architecto vel animi ipsum natus beatae odit, cum fugiat eaque
            quisquam nihil?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            beatae dolorum amet, quis doloribus dolores odit distinctio ut
            corrupti ab fuga voluptatum laborum id vitae eos molestias possimus?
            Laudantium, consequatur.
          </p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
