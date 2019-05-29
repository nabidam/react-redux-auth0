import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import {
  CssBaseline,
  Typography,
  Container,
  Grid,
  Paper
} from "@material-ui/core";
import Header from "./Header";
import Sidebar from "./Sidebar";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
    float: "right"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1
  },
  rtlToolBar: {
    direction: "rtl"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  content: {
    direction: "rtl",
    flexGrow: 1,
    padding: theme.spacing(3),
    marginRight: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  paper: {
    height: "40vh"
    // width: 100
  }
});

class Index extends React.Component {
  render() {
    const {classes, theme} = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container maxWidth="lg">
            {/* <Typography
              component="div"
              style={{backgroundColor: "#cfe8fc", height: "100vh"}}
            /> */}
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={1}>
                  <Grid item xs={6}>
                    <Paper className={classes.paper} />
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className={classes.paper} />
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className={classes.paper} />
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className={classes.paper} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </main>
        <Sidebar />
        {/* <p>1</p> */}
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(Index);
