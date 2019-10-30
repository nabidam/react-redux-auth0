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
import selectPage from "../../actions/selectPage";
import history from "../../history";
import {connect} from "react-redux";
import triggerDrawer from "../../actions/triggerDrawer";
import SecondHeaderProfile from "./SecondHeaderProfile";
import SecondHeaderNotifications from "./SecondHeaderNotifications";
import UpgradePremium from "./UpgradePremium";
import {Divider} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {Button, Grid} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import TrafficIcon from "@material-ui/icons/Traffic";
import PeopleIcon from "@material-ui/icons/People";
import CloseIcon from "@material-ui/icons/Close";
import cancelCreate from "../../actions/cancelCreate";
import createProject from "../../actions/createProject";

const styles = theme => ({
  root: {
    display: "flex"
  },
  grow: {
    flexGrow: 1,
    textAlign: "right"
  },
  appBar: {
    height: 80,
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginRight: drawerWidth,
    backgroundColor: "#fff",
    color: "#3c3c3c",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolBar: {
    display: "flex",
    // justifyContent: "space-between",
    height: "100%"
  },
  textBlack: {
    color: "#3c3c3c"
  },
  titlePaper: {
    padding: "0px 0px",
    fontSize: 12,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    color: "#08080d",
    margin: "0px 25px",
    backgroundColor: "#fff",
    borderRadius: 0,
    boxShadow: "none"
  },
  headerPaper: {
    padding: "0px 0px",
    fontSize: 18,
    height: "100%",
    display: "flex",
    alignItems: "center",
    color: "#08080d",
    margin: "0px 25px",
    backgroundColor: "#fff",
    borderRadius: 0,
    boxShadow: "none",
    borderBottom: "2px solid #edf1f6"
    // height: "89%",
    // borderRight: "solid 1px #edf1f6"
    // minWidth: 78,
  },
  selectedHeaderPaper: {
    color: "#4753ff",
    "&::after": {
      content: `""`,
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: 4,
      background: "#4753ff",
      borderTopLeftRadius: "2.5px",
      borderTopRightRadius: "2.5px"
    }
  },
  headerItemIcon: {
    marginLeft: 17
  },
  cardText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "right"
  },
  headerItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "right"
  },
  primaryText: {
    fontSize: 18,
    textAlign: "center"
  },
  headerItemText: {
    fontSize: 18,
    textAlign: "left"
  },
  notification: {
    flexGrow: 1
  },
  profile: {},
  newAnalysisBtn: {
    width: 170,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#4753ff",
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0500cb"
    },
    "&:active": {
      opacity: 0.7
    }
  },
  closePaper: {
    padding: "0px 0px",
    fontSize: 12,
    color: "#08080d",
    margin: "0px 25px",
    backgroundColor: "#fff",
    borderRadius: 0,
    boxShadow: "none"
  },
  headerContainer: {
    height: "100%"
  },
  titleGrid: {
    display: "flex",
    justifyContent: "center"
  },
  closeIconGrid: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: " center",
    padding: "0px 36px"
  },
  closeIcon: {
    fontSize: "2rem",
    color: "#08080d"
  }
});

class AddProjectsHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClickAddProject = () => {
    const addProject = this.props.addProject;
    if (addProject.name != "") {
      this.props.createProject();
      this.props.selectPage("projects");
    }
  };

  render() {
    const {classes} = this.props;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Grid container className={classes.headerContainer}>
            <Grid item md={4} sm={4} xs={4}>
              <Paper className={classes.titlePaper}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item xs zeroMinWidth className={classes.cardText}>
                    <Button
                      color="primary"
                      className={classes.newAnalysisBtn}
                      onClick={() => this.handleClickAddProject()}
                    >
                      ایجاد پروژه
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item md={4} sm={4} xs={4} className={classes.titleGrid}>
              <Paper className={classNames(classes.headerPaper)}>
                <Grid container wrap="nowrap">
                  <Grid item xs zeroMinWidth className={classes.headerItem}>
                    <Typography
                      variant="body1"
                      component="p"
                      className={classes.headerItemText}
                    >
                      ساخت پروژه جدید
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item md={4} sm={4} xs={4} className={classes.closeIconGrid}>
              <IconButton onClick={() => this.props.selectPage("projects")}>
                <CloseIcon className={classes.closeIcon} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    isAuthenticated: state.isAuthenticated,
    isDrawerOpen: state.isDrawerOpen,
    selectedPage: state.selectedPage,
    addProject: state.addProject
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestLogout: () => dispatch(requestLogout()),
    triggerDrawer: () => dispatch(triggerDrawer()),
    selectPage: page => dispatch(selectPage(page)),
    createProject: () => dispatch(createProject())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(AddProjectsHeader));
