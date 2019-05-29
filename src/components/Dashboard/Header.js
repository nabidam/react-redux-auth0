import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {withStyles, withTheme} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitIcon from "@material-ui/icons/ExitToAppRounded";
import Tooltip from "@material-ui/core/Tooltip";
import requestLogout from "../../actions/requestLogout";
import history from "../../history";
import {connect} from "react-redux";
import triggerDrawer from "../../actions/triggerDrawer";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  grow: {
    flexGrow: 1,
    textAlign: "right"
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
    width: theme.spacing.unit * 7 + 1
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
    padding: theme.spacing.unit * 3,
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
    marginRight: drawerWidth - 10
  },
  logoutbtn: {
    marginLeft: 10,
    color: "#fff",
    "&:hover": {
      textDecoration: "none",
      color: "#fff"
    }
  }
});

class MiniDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");

    this.props.auth.logout({
      returnTo: window.location.origin
    });
    history.replace("/");
    this.props.requestLogout();
  };

  render() {
    const {classes} = this.props;

    return (
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: this.props.isDrawerOpen
        })}
      >
        <Toolbar
          disableGutters={!this.props.isDrawerOpen}
          className={classes.rtlToolBar}
        >
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.props.triggerDrawer}
            className={classNames(classes.menuButton, {
              [classes.hide]: this.props.isDrawerOpen
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.grow}
            noWrap
          >
            داشبورد
          </Typography>
          <Tooltip title="خروج" placement="right">
            <IconButton
              onClick={() => this.logout()}
              className={classes.logoutbtn}
              aria-label="Logout"
            >
              <ExitIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  requestLogout: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool,
  triggerDrawer: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    isAuthenticated: state.isAuthenticated,
    isDrawerOpen: state.isDrawerOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestLogout: () => dispatch(requestLogout()),
    triggerDrawer: () => dispatch(triggerDrawer())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(MiniDrawer));
