import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import {PDFDownloadLink, Document, Page, View, Text} from "@react-pdf/renderer";
import {
  CssBaseline,
  Tooltip,
  Snackbar,
  SnackbarContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Button
} from "@material-ui/core";

import Header from "./Header";
import Sidebar from "./Sidebar";
import ReactEcharts from "echarts-for-react";
import {connect} from "react-redux";
import changeSelectedQuery from "../../actions/changeSelectedQuery";
import ReactExport from "react-data-export";
import LatestQueriesPDF from "./LatestQueriesPDF";
import MainDashboard from "./MainDashboard";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AddQuery from "./AddQuery";
import changeSnackbarStatus from "../../actions/changeSnackbarStatus";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {green} from "@material-ui/core/colors";
import SecondHeader from "./SecondHeader";
import QueriesDashboard from "./QueriesDashboard";
import QueriesSidebar from "./QueriesSidebar";
import TrafficAnalysis from "./TrafficAnalysis";
import Influencers from "./Influencers";
import Accounts from "./Accounts";
import Projects from "./Projects";
import Trends from "./Trends";
import Queries from "./Queries";
import AddTrafficAnalysis from "./AddTrafficAnalysis";
import AddTrafficAnalysisHeader from "./AddTrafficAnalysisHeader";
import AddQueries from "./AddQueries";
import AddQueriesHeader from "./AddQueriesHeader";
import AddProjects from "./AddProjects";
import AddProjectsHeader from "./AddProjectsHeader";
import AddPosts from "./AddPosts";
import AddPostsHeader from "./AddPostsHeader";
import EditQueries from "./EditQueries";
import EditQueriesHeader from "./EditQueriesHeader";
import EditProjects from "./EditProjects";
import EditProjectsHeader from "./EditProjectsHeader";
import EditTrafficAnalysis from "./EditTrafficAnalysis";
import EditTrafficAnalysisHeader from "./EditTrafficAnalysisHeader";
import Fab from "@material-ui/core/Fab";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import Badge from "@material-ui/core/Badge";
import Popover from "@material-ui/core/Popover";
import AddIcon from "@material-ui/icons/Add";
import goToAddQuery from "../../actions/goToAddQuery";
import goToAddTrafficAnalysis from "../../actions/goToAddTrafficAnalysis";
import selectPage from "../../actions/selectPage";
import changeBagItemStatus from "../../actions/changeBagItemStatus";
import checkAllBagItemStatus from "../../actions/checkAllBagItemStatus";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    overflow: "hidden"
  },
  close: {
    padding: theme.spacing(0.5)
  },
  success: {
    backgroundColor: green[600]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  },

  fab: {
    position: "fixed",
    left: 18,
    bottom: 18,
    backgroundColor: "#fc4c81",
    boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.28)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#f54581"
    }
  },
  badge: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 22,
    height: 22,
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "50%"
  },
  popover: {
    width: 280,
    // height: 335,
    bordeRadius: 5,
    boxShadow: "0 2px 15px 0 rgba(0, 0, 0, 0.1)"
  },
  popoverHeader: {
    height: 56,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "#08080d",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 15px"
  },
  closeIcon: {
    fontSize: "1rem",
    color: "#fff",
    padding: 0
  },
  popoverActions: {
    display: "flex",
    justifyContent: "space-between",
    padding: 15
  },
  newAnalysisBtn: {
    width: 110,
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
  newQueryBtn: {
    width: 110,
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
  popoverList: {
    margin: "0px 15px"
  },
  popoverListItem: {
    height: 40,
    padding: 0,
    borderBottom: "1px solid #e4e8ed"
  },
  popoverListItemBody: {
    marginRight: 0
  },
  popoverCheckbox: {
    padding: 0
  },
  popoverListItemText: {
    marginRight: 10,
    fontSize: 12
  },
  checkAllBtn: {
    fontSize: 10,
    maxWidth: 100,
    "&:hover": {
      cursor: "pointer"
    }
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainHeaderPages: [
        "queries",
        "traffic-analysis",
        "influencers",
        "accounts",
        "projects",
        "trends"
      ],

      isPopoverOpen: false,
      popoverAnchorEl: null,

      allBagItemsChecked: false
    };

    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  handleCloseSnackbar = () => {
    this.props.changeSnackbarStatus({
      open: false,
      msg: ""
    });
  };

  handlePopoverClick = event => {
    this.setState({
      popoverAnchorEl: event.currentTarget,
      isPopoverOpen: Boolean(event.currentTarget)
    });
  };

  handleClosePopover = () => {
    this.setState({
      popoverAnchorEl: null,
      isPopoverOpen: false
    });
  };

  handleClickAddAnalysis = () => {
    this.setState({
      popoverAnchorEl: null,
      isPopoverOpen: false
    });
    this.props.goToAddTrafficAnalysis();
    this.props.selectPage("traffic-analysis/add");
  };

  handleClickAddQueries = () => {
    this.setState({
      popoverAnchorEl: null,
      isPopoverOpen: false
    });
    this.props.goToAddQuery();
    this.props.selectPage("queries/add");
  };

  handleClickBagItem = item => {
    this.props.changeBagItemStatus(item.name);
  };

  handleCheckAllBagItems = () => {
    this.props.checkAllBagItemStatus(!this.state.allBagItemsChecked);
    this.setState({
      allBagItemsChecked: !this.state.allBagItemsChecked
    });
  };

  componentDidMount = () => {
    var c = 0;
    this.props.myBag.map((item, index) => {
      if (item.selected) {
        c++;
      }
    });
    if (c == this.props.myBag.length) {
      this.setState({
        allBagItemsChecked: true
      });
    }
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        {this.state.mainHeaderPages.indexOf(this.props.selectedPage) == -1 ? (
          ""
        ) : (
          <SecondHeader />
        )}
        <Route
          exact
          path="/dashboard/traffic-analysis/add"
          component={AddTrafficAnalysisHeader}
        />
        <Route
          exact
          path="/dashboard/traffic-analysis/edit"
          component={EditTrafficAnalysisHeader}
        />
        <Route
          exact
          path="/dashboard/queries/add"
          component={AddQueriesHeader}
        />
        <Route
          exact
          path="/dashboard/queries/edit"
          component={EditQueriesHeader}
        />
        <Route
          exact
          path="/dashboard/projects/add"
          component={AddProjectsHeader}
        />
        <Route
          exact
          path="/dashboard/projects/edit"
          component={EditProjectsHeader}
        />
        <Route
          exact
          path="/dashboard/accounts/add-post"
          component={AddPostsHeader}
        />
        {/* <SecondHeader /> */}
        {/* <Route exact path="/dashboard" component={Header} />
        <Route path="/dashboard/" component={SecondHeader} /> */}
        {/* <Header /> */}
        {this.props.selectedQueryDashboardItem != null ? (
          <Route exact path="/dashboard/queries" component={QueriesSidebar} />
        ) : (
          ""
        )}
        <Route exact path="/dashboard" component={Sidebar} />
        {/* <Sidebar /> */}
        {/* <Route exact path="/dashboard/add-query" component={AddQuery} /> */}
        {this.props.selectedQueryDashboardItem == null ? (
          <Route exact path="/dashboard/queries" component={Queries} />
        ) : (
          <Route exact path="/dashboard/queries" component={QueriesDashboard} />
        )}
        <Route exact path="/dashboard/queries/add" component={AddQueries} />
        <Route exact path="/dashboard/queries/edit" component={EditQueries} />
        <Route
          exact
          path="/dashboard/traffic-analysis"
          component={TrafficAnalysis}
        />
        <Route
          exact
          path="/dashboard/traffic-analysis/add"
          component={AddTrafficAnalysis}
        />
        <Route
          exact
          path="/dashboard/traffic-analysis/edit"
          component={EditTrafficAnalysis}
        />
        <Route exact path="/dashboard/influencers" component={Influencers} />
        <Route exact path="/dashboard/accounts" component={Accounts} />
        <Route exact path="/dashboard/accounts/add-post" component={AddPosts} />
        <Route exact path="/dashboard/projects" component={Projects} />
        <Route exact path="/dashboard/projects/add" component={AddProjects} />
        <Route exact path="/dashboard/projects/edit" component={EditProjects} />
        <Route exact path="/dashboard/trends" component={Trends} />
        <Route exact path="/dashboard" component={MainDashboard} />
        <Fab
          className={classes.fab}
          onClick={event => this.handlePopoverClick(event)}
        >
          <CallToActionIcon />
          <div className={classes.badge}>4</div>
        </Fab>
        <Popover
          open={this.state.isPopoverOpen}
          onClose={() => this.handleClosePopover()}
          anchorEl={this.state.popoverAnchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          classes={{
            paper: classes.popover
          }}
        >
          <div className={classes.popoverHeader}>
            <Typography
              variant="body2"
              onClick={() => this.handleCheckAllBagItems()}
              className={classes.checkAllBtn}
            >
              {this.state.allBagItemsChecked ? "حذف همه" : "انتخاب همه"}
            </Typography>
            <Typography
              variant="body2"
              style={{fontSize: 12, fontWeight: "bold"}}
            >
              خورجین من
            </Typography>
            <IconButton onClick={() => this.handleClosePopover()}>
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          </div>
          <List component="nav" className={classes.popoverList}>
            {this.props.myBag.map((item, index) => {
              return (
                <ListItem
                  className={classNames(classes.popoverListItem)}
                  key={item.id}
                  button
                >
                  <Checkbox
                    value={item.name}
                    checked={item.selected}
                    color="primary"
                    className={classes.popoverCheckbox}
                    onChange={() => this.handleClickBagItem(item)}
                  />
                  <Typography
                    variant="body2"
                    className={classes.popoverListItemText}
                  >
                    {item.name}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
          <div className={classes.popoverActions}>
            <Button
              color="primary"
              className={classes.newQueryBtn}
              onClick={() => this.handleClickAddQueries()}
            >
              ساخت ردیاب
            </Button>
            <Button
              color="primary"
              className={classes.newAnalysisBtn}
              onClick={() => this.handleClickAddAnalysis()}
            >
              ساخت تحلیل
            </Button>
          </div>
        </Popover>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.props.isSnackbarOpen}
          autoHideDuration={6000}
          onClose={() => this.handleCloseSnackbar()}
        >
          <SnackbarContent
            className={classes.success}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <CheckCircleIcon
                  className={classNames(classes.icon, classes.iconVariant)}
                />
                {this.props.snackbarMessage}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => this.handleCloseSnackbar()}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSnackbarOpen: state.isSnackbarOpen,
    snackbarMessage: state.snackbarMessage,
    selectedPage: state.selectedPage,
    selectedQueryDashboardItem: state.selectedQueryDashboardItem,
    myBag: state.myBag
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSnackbarStatus: data => dispatch(changeSnackbarStatus(data)),
    selectPage: page => dispatch(selectPage(page)),
    goToAddTrafficAnalysis: () => dispatch(goToAddTrafficAnalysis()),
    goToAddQuery: () => dispatch(goToAddQuery()),
    changeBagItemStatus: item => dispatch(changeBagItemStatus(item)),
    checkAllBagItemStatus: status => dispatch(checkAllBagItemStatus(status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Dashboard));
