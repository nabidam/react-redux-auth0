import React, {Component} from "react";
import {Grid, Card, CardContent, Typography, CardActions, Paper, Button, Avatar} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import GiftIcon from "@material-ui/icons/CardGiftcard";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    textAlign: "right",
    height: "100%",
    display: "flex"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 0,
    // minWidth: 275,
  },
  subtitle: {
    fontSize: "0.7em"
  },
  giftIcon: {
    color: "#3c3c3c"
  }
}));

const UpgradePremium = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.grow}>
      <Paper className={classes.card} component={Button} variant="contained">
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar><GiftIcon className={classes.giftIcon}/></Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography variant="body2" component="p">
              ارتقاء سرویس
            </Typography>
            <Typography variant="subtitle2" className={classes.subtitle}>
              ۱۴ روز رایگان
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" className={classes.plus}>
              +
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default UpgradePremium;
