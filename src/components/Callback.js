import React, {Component} from "react";
import {connect} from "react-redux";
import loginSuccess from "../actions/loginSuccess";
import history from "../history";

class Callback extends Component {
  constructor(props) {
    super(props);
    this.setSession = this.setSession.bind(this);
  }
  setSession = authResult => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    localStorage.setItem("expires_at", expiresAt);
  };
  componentDidMount = () => {
    this.props.auth.parseHash((err, authResult) => {
      console.log(authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log("ok");
        this.props.loginSuccess(authResult);
        this.setSession(authResult);
        history.replace("/dashboard");
        // console.log(authResult);
      } else if (err) {
        // console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };

  render() {
    return <h3>logging in........</h3>;
  }
}

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: () => dispatch(loginSuccess())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Callback);
