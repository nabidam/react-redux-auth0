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
import Profile from "./Profile";
import Notifications from "./Notifications";
import UpgradePremium from "./UpgradePremium";

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
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    backgroundColor: "#fff",
    color: "#3c3c3c",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  logoutbtn: {
    marginLeft: 10,
    color: "#fff",
    "&:hover": {
      textDecoration: "none",
      color: "#fff"
    }
  },
  textBlack: {
    color: "#3c3c3c"
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
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Profile />
          <Notifications />
          <UpgradePremium />
          {/* <Tooltip title="خروج" placement="bottom">
            <IconButton
              onClick={() => this.logout()}
              className={classes.logoutbtn}
              aria-label="Logout"
            >
              <ExitIcon className={classes.textBlack} />
            </IconButton>
          </Tooltip> */}
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
