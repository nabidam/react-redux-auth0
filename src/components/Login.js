import React, {Component} from "react";
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Typography, Button, Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import requestLogin from "../actions/requestLogin";
import requestLogout from "../actions/requestLogout";
import history from "../history";
// import "../styles/styles.css";

const styles = theme => ({
  title: {
    flexGrow: 1
  },
  loginGrid: {
    background: "url(../assets/images/login_bgdark.png) center center"
  },
  button: {
    margin: theme.spacing(1)
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    let access_token = localStorage.getItem("access_token");
    let id_token = localStorage.getItem("id_token");
    let expires_at = localStorage.getItem("expires_at");

    if (!access_token && !id_token && new Date().getTime() > expires_at) {
      this.props.auth.authorize();
    }
  };

  render() {
    return <p>Logging in...</p>;
  }
}

const mapStateToProps = state => {
  return {auth: state.auth, isAuthenticated: state.isAuthenticated};
};

// const mapDispatchToProps = dispatch => {
//   return {
//     requestLogin: () => dispatch(requestLogin()),
//     requestLogout: () => dispatch(requestLogout())
//   };
// };

export default connect(mapStateToProps)(withStyles(styles)(Login));
