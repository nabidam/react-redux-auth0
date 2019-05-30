import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import history from "../history";
import loginSuccess from "../actions/loginSuccess";
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
  componentDidMount = () => {
    let access_token = localStorage.getItem("access_token");
    let id_token = localStorage.getItem("id_token");
    let expires_at = localStorage.getItem("expires_at");

    if (!access_token && !id_token && new Date().getTime() > expires_at) {
      this.props.auth.authorize();
    }else{
        const authResult = {
            access_token,
            id_token,
            expires_at
        };
        this.props.loginSuccess(authResult);
        history.replace("/dashboard");
    }
  };

  render() {
    return <p>Logging in...</p>;
  }
}

const mapStateToProps = state => {
  return {auth: state.auth, isAuthenticated: state.isAuthenticated};
};

const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: () => dispatch(loginSuccess())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
