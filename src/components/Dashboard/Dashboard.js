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
  IconButton
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
      ]
    };

    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  handleCloseSnackbar = () => {
    this.props.changeSnackbarStatus({
      open: false,
      msg: ""
    });
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
        <Route exact path="/dashboard/influencers" component={Influencers} />
        <Route exact path="/dashboard/accounts" component={Accounts} />
        <Route exact path="/dashboard/accounts/add-post" component={AddPosts} />
        <Route exact path="/dashboard/projects" component={Projects} />
        <Route exact path="/dashboard/projects/add" component={AddProjects} />
        <Route exact path="/dashboard/trends" component={Trends} />
        <Route exact path="/dashboard" component={MainDashboard} />
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
    selectedQueryDashboardItem: state.selectedQueryDashboardItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSnackbarStatus: data => {
      dispatch(changeSnackbarStatus(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Dashboard));
