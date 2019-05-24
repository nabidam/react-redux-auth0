import React, {Component} from "react";
import {Router, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Callback from "./components/Callback";
import About from "./components/About";
import NotAllowedDashboard from "./components/NotAllowedDashboard";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import history from "./history";
import authenticateChecked from "./actions/authenticateChecked";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class App extends Component {
  componentDidMount = () => {
    let access_token = localStorage.getItem("access_token");
    let id_token = localStorage.getItem("id_token");
    let expires_at = localStorage.getItem("expires_at");

    if (access_token && id_token && new Date().getTime() < expires_at) {
      this.props.authenticateChecked({
        isAuthenticated: true,
        access_token,
        id_token,
        expires_at
      });
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <Router history={history}>
        <div className={classes.root}>
          <Header />
          {this.props.isAuthenticated}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            {/* <Route path="/dashboard" component={Dashboard} /> */}
            <Route
              path="/dashboard"
              render={props =>
                this.props.isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <NotAllowedDashboard />
                )
              }
            />
            <Route path="/callback" component={Callback} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticateChecked: () => dispatch(authenticateChecked())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
