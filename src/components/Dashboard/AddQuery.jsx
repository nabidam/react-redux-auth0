import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {
  CssBaseline,
  Typography,
  Container,
  Grid,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Modal,
  Button,
  Tooltip as MTooltip,
  TextField
} from "@material-ui/core";
import addQuery from "../../actions/addQuery";
import changeSnackbarStatus from "../../actions/changeSnackbarStatus";
import {connect} from "react-redux";
import history from "../../history";

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  content: {
    direction: "rtl",
    flexGrow: 1,
    padding: theme.spacing(3),
    marginRight: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  paper: {
    // display: "flex",
    // height: "35vh",
    padding: "20px"
    // width: "40%vw"
  },
  container: {
    display: "flex"
    // flexDirection: "column",
    // flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    direction: "ltr"
  },
  submitButton: {
    backgroundColor: "green",
    margin: theme.spacing(1),
    color: "white",
    "&:hover": {
      backgroundColor: "darkgreen"
    }
  }
});

class AddQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryName: "",
      queryUsername: "",
      isUsernameEntered: true,
      isNameEntered: true
    };

    this.handleChangeQueryName = this.handleChangeQueryName.bind(this);
    this.handleChangeQueryUsername = this.handleChangeQueryUsername.bind(this);
    this.handleAddQuery = this.handleAddQuery.bind(this);
  }

  handleChangeQueryName = event => {
    this.setState({queryName: event.target.value});
    if (event.target.value == "") {
      this.setState({isNameEntered: false});
    } else {
      this.setState({isNameEntered: true});
    }
  };

  handleChangeQueryUsername = event => {
    this.setState({queryUsername: event.target.value});
    if (event.target.value == "") {
      this.setState({isUsernameEntered: false});
    } else {
      this.setState({isUsernameEntered: true});
    }
  };

  handleAddQuery = () => {
    if (this.state.queryUsername != "") {
      if (this.state.Name != "") {
        this.setState({queryUsername: "", queryName: ""});
        this.props.addQuery({
          name: this.state.queryName,
          username: this.state.queryUsername
        });
        history.push("/dashboard");
        this.props.changeSnackbarStatus({
          open: true,
          msg: "با موفقیت ثبت شد."
        });
      } else {
        this.setState({isNameEntered: false});
      }
    } else {
      if (this.state.Name != "") {
        this.setState({isNameEntered: false});
      }
      this.setState({isUsernameEntered: false});
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg">
          <Grid container className={classes.root}>
            <Grid item md={12} sm={12} xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item md={12} sm={12} xs={12}>
                    <Typography variant="h6">ایجاد کوئری جدید</Typography>
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <Typography variant="body1">
                      برای ایجاد کوئری جدید، فرم زیر را پر فرمایید.
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <TextField
                      id="outlined-name"
                      label="نام"
                      className={classes.textField}
                      value={this.state.name}
                      onChange={this.handleChangeQueryName}
                      error={!this.state.isNameEntered}
                      required
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <TextField
                      id="outlined-name"
                      label="نام کاربری"
                      className={classes.textField}
                      value={this.state.username}
                      onChange={this.handleChangeQueryUsername}
                      error={!this.state.isUsernameEntered}
                      required
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <Button
                      variant="contained"
                      className={classes.submitButton}
                      onClick={() => this.handleAddQuery()}
                    >
                      ثبت
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addQuery: data => {
      dispatch(addQuery(data));
    },
    changeSnackbarStatus: data => {
      dispatch(changeSnackbarStatus(data));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(AddQuery));
