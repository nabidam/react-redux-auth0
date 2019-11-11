import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard/Dashboard';
import WordsCloud from './components/Dashboard/WordsCloud';
import Callback from './components/Callback';
import About from './components/About';
import Login from './components/Login';
import NotAllowedDashboard from './components/NotAllowedDashboard';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import history from './history';
import authenticateChecked from './actions/authenticateChecked';
import PieChart from './components/Dashboard/PieChart';
import MapComponent from './components/Dashboard/MapComponent';
import Boarding from './components/Dashboard/Boarding';

// import AddQuery from "./components/Dashboard/AddQuery";
// import "./styles/fontawesome.css";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class App extends Component {
  componentDidMount = () => {
    let access_token = localStorage.getItem('access_token');
    let id_token = localStorage.getItem('id_token');
    let expires_at = localStorage.getItem('expires_at');

    if (access_token && id_token && new Date().getTime() < expires_at) {
      this.props.authenticateChecked({
        isAuthenticated: true,
        access_token,
        id_token,
        expires_at,
      });
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <Router history={history}>
        <div className={classes.root}>
          {/* <Header /> */}
          {this.props.isAuthenticated}
          <Switch>
            {/* <Route exact path="/" component={Login} /> */}
            <Route
              exact
              path="/"
              render={props =>
                this.props.isAuthenticated ? <Dashboard /> : <Login />
              }
            />
            <Route exact path="/home" component={Home} />
            {/* <Route path="/dashboard" component={Dashboard} /> */}
            <Route
              ecaxt
              path="/dashboard"
              render={props =>
                this.props.isAuthenticated ? <Dashboard /> : <Login />
              }
            />
            <Route exact path="/svg" component={PieChart} />
            <Route
              exact
              path="/map"
              render={() => <MapComponent center={[51.4124, 35.7325]} />}
            />
            <Route exact path="/boarding" component={Boarding} />
            <Route path="/callback" component={Callback} />
            <Route path="/about" component={About} />
            <Route path="/cloud" component={WordsCloud} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticateChecked: () => dispatch(authenticateChecked()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(App));
