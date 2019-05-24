import React, {Component} from "react";
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import requestLogin from "../actions/requestLogin";
import requestLogout from "../actions/requestLogout";
import history from "../history";

const styles = theme => ({
  title: {
    flexGrow: 1
  }
});

class Header extends Component {
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
    history.replace("/home");
    this.props.requestLogout();
  };

  render() {
    const {classes} = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Auth0{" "}
            {this.props.isAuthenticated ? "authenticated" : "not authenticated"}
          </Typography>
          <Button
            onClick={() =>
              !this.props.isAuthenticated
                ? this.props.auth.authorize()
                : this.logout()
            }
            color="inherit"
          >
            {this.props.isAuthenticated ? "Logout" : "Login"}
          </Button>
          <Button component={Link} to="/dashboard" color="inherit">
            Dashboard
          </Button>
          <Button component={Link} to="/about" color="inherit">
            About
          </Button>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {auth: state.auth, isAuthenticated: state.isAuthenticated};
};

const mapDispatchToProps = dispatch => {
  return {
    requestLogin: () => dispatch(requestLogin()),
    requestLogout: () => dispatch(requestLogout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
