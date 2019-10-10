import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import {connect} from "react-redux";
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
  TextField,
  Input
} from "@material-ui/core";
import {Map, GoogleApiWrapper} from "google-maps-react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  wrapper: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#fff"
  },
  root: {
    display: "flex",
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    height: 80,
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  content: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    // direction: "rtl",
    flexGrow: 1,
    // padding: theme.spacing(3),
    marginRight: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },

  container: {
    paddingTop: 10,
    paddingBottom: 40
  },
  labelBox: {
    display: "flex",
    flexDirection: "row",
    padding: "20px 0px"
  },
  input: {
    width: "100%",
    height: 44,
    position: "relative",
    borderRadius: 22,
    backgroundColor: "#edf1f6",
    border: "none",
    padding: "0px 22px",
    color: "#a2a5a9",
    display: "flex",
    justifyContent: "right",
    "&::placeholder": {
      color: "#a2a5a9"
    }
  },
  bulbIcon: {
    width: 22,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#adb2b9"
  },
  map: {
    width: "100%",
    height: "100%"
  },
  mapBox: {
    height: 180,
    position: "relative"
  },
  chevronDownIcon: {
    display: "flex",
    position: "absolute",
    left: "19px",
    color: "#08080d"
  },
  socialMediaIcon: {
    width: 44,
    height: 44,
    marginLeft: 20,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "solid 5px rgba(0, 0, 0, 0.02)",
    borderRadius: 22,
    backgroundColor: "#edf1f6",
    color: "rgba(8, 8, 13, 0.5)"
  },
  box: {
    width: "100%",
    height: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    border: "solid 2px #e4e8ed"
  },
  textMute: {
    color: "#adb2b9"
  },
  queriesContainer: {
    borderRadius: 3,
    border: "solid 2px #e4e8ed",
    padding: 14
  },
  queriesItem: {
    width: "100%",
    height: 44,
    position: "relative",
    borderRadius: 3,
    backgroundColor: "#edf1f6",
    border: "none",
    padding: "0px 22px",
    color: "#a2a5a9",
    display: "flex",
    justifyContent: "right",
    "&::placeholder": {
      color: "#a2a5a9"
    }
  },
  addIcon: {
    display: "flex",
    position: "absolute",
    left: "19px",
    fontSize: "0.75em",
    color: "rgba(8, 8, 13, 0.33)"
  },
  textAreaInput: {
    width: "100%",
    height: 180,
    resize: "none",
    position: "relative",
    borderRadius: 22,
    backgroundColor: "#edf1f6",
    border: "none",
    padding: "8px 22px",
    color: "#a2a5a9",
    display: "flex",
    justifyContent: "right",
    "&::placeholder": {
      color: "#a2a5a9"
    }
  },
  uploadBox: {
    width: "100%",
    height: 180,
    resize: "none",
    position: "relative",
    borderRadius: 22,
    backgroundColor: "#edf1f6",
    border: "none",
    padding: "0px 22px",
    color: "#a2a5a9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  uploadBtn: {
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
  socialIconBox: {
    display: "flex",
    flexDirection: "row"
  }
});

class AddPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //   componentDidMount = () => {
  //     console.log(
  //       moment()
  //         .subtract(10, "days")
  //         .format("Do")
  //     );
  //   };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.wrapper}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container maxWidth="md" className={classes.container}>
            <Grid container className={classes.root} spacing={2}>
              <Grid item md={6} sm={6} xs={12}>
                <div className={classes.labelBox}>
                  <i
                    className={classNames(classes.bulbIcon, "far fa-lightbulb")}
                  ></i>
                  <Typography variant="body2">
                    متن پست مورد نظر برای انتشار را وارد کنید
                  </Typography>
                </div>
                <textarea
                  type="text"
                  className={classes.textAreaInput}
                  multiline={true}
                  rows="4"
                  placeholder="متن پست"
                ></textarea>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <div className={classes.labelBox}>
                  <i
                    className={classNames(classes.bulbIcon, "far fa-lightbulb")}
                  ></i>
                  <Typography variant="body2">
                    هشتگ مرتبط با پست را وارد کنید
                  </Typography>
                </div>
                <div className={classes.uploadBox}>
                  <Button color="primary" className={classes.uploadBtn}>
                    آپلود تصویر
                  </Button>
                </div>
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <div className={classes.labelBox}>
                  <i
                    className={classNames(classes.bulbIcon, "far fa-lightbulb")}
                  ></i>
                  <Typography variant="body2">
                    هشتگ مرتبط با پست را وارد کنید
                  </Typography>
                </div>
                <input
                  type="text"
                  className={classes.input}
                  placeholder="هشتگ‌ها"
                />
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <div className={classes.labelBox}>
                  <i
                    className={classNames(classes.bulbIcon, "far fa-lightbulb")}
                  ></i>
                  <Typography variant="body2">
                    زمان ارسال پست را انتحاب کنید
                  </Typography>
                </div>
                <Button className={classes.input}>
                  انتخاب زمان ارسال
                  <div className={classes.chevronDownIcon}>
                    <i className="fas fa-chevron-down" />
                  </div>
                </Button>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <div className={classes.labelBox}>
                  <i
                    className={classNames(classes.bulbIcon, "far fa-lightbulb")}
                  ></i>
                  <Typography variant="body2">
                    انتخاب شبکه اجتماعی برای پست
                  </Typography>
                </div>
                <div className={classes.socialIconBox}>
                  <IconButton className={classes.socialMediaIcon}>
                    <i className="fab fa-instagram fa-sm"></i>
                  </IconButton>
                  <IconButton className={classes.socialMediaIcon}>
                    <i className="fab fa-twitter fa-sm"></i>
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

AddPosts.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    latestQueries: state.latestQueries,
    selectedQuery: state.selectedQuery,
    queries: state.queries,
    selectedQueriesType: state.selectedQueriesType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectQuery: id => dispatch(selectQuery(id)),
    selectQueriesType: type => dispatch(selectQueriesType(type)),
    changeQueryStatus: query => dispatch(changeQueryStatus(query))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(AddPosts));
