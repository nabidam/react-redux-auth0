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
  Tooltip as MTooltip
} from "@material-ui/core";
import {Map, GoogleApiWrapper} from "google-maps-react";
import IconButton from "@material-ui/core/IconButton";

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
  }
});

class AddQueries extends React.Component {
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
                    یک بازه زمانی برای ردیاب خود انتخاب کنید
                  </Typography>
                </div>
                <Button className={classes.input}>
                  انتخاب بازه زمانی
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
                  <Typography variant="body2">نام ردیاب</Typography>
                </div>
                <input
                  type="text"
                  className={classes.input}
                  placeholder="وارد کردن نام ردیاب"
                />
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <div className={classes.labelBox}>
                  <i
                    className={classNames(classes.bulbIcon, "far fa-lightbulb")}
                  ></i>
                  <Typography variant="body2">
                    شبکه اجتماعی مورد نظر برای ردیاب خود را انتخاب کنید
                  </Typography>
                </div>
                <Grid container className={classes.root} spacing={2}>
                  <Grid item md={1}>
                    <IconButton className={classes.socialMediaIcon}>
                      <i className="fab fa-instagram fa-sm"></i>
                    </IconButton>
                  </Grid>
                  <Grid item md={5}>
                    <input
                      type="text"
                      className={classes.input}
                      placeholder="نام کاربری فرد موثر برای ردیابی"
                    />
                  </Grid>
                  <Grid item md={1}>
                    <IconButton className={classes.socialMediaIcon}>
                      <i className="fab fa-twitter fa-sm"></i>
                    </IconButton>
                  </Grid>
                  <Grid item md={5}>
                    <input
                      type="text"
                      className={classes.input}
                      placeholder="نام کاربری فرد موثر برای ردیابی"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <div className={classes.labelBox}>
                  <i
                    className={classNames(classes.bulbIcon, "far fa-lightbulb")}
                  ></i>
                  <Typography variant="body2">
                    هشتگ یا کلمه کلیدی مرتبط با ردیاب را وارد کنید
                  </Typography>
                </div>
                <Grid container className={classes.root} spacing={2}>
                  <Grid item md={6}>
                    <input
                      type="text"
                      className={classes.input}
                      placeholder="هشتگ مرتبط با ردیاب را وارد کنید"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <input
                      type="text"
                      className={classes.input}
                      placeholder="کلمات کلیدی مرتبط با ردیاب را وارد کنید"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <div className={classes.labelBox}>
                  <i
                    className={classNames(classes.bulbIcon, "far fa-lightbulb")}
                  ></i>
                  <Typography variant="body2">
                    محدوده جغرافیایی مرتبط با ردیاب را انتخاب کنید
                  </Typography>
                </div>
                <Grid container className={classes.root} spacing={2}>
                  <Grid item md={6}>
                    <div className={classes.box}></div>
                  </Grid>
                  <Grid item md={6}>
                    <div className={classes.box}>
                      <Typography variant="body2" className={classes.textMute}>
                        هشتگ یا کلمه کلیدی مرتبط پیدا نشده است
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <div className={classes.labelBox}>
                  <i
                    className={classNames(classes.bulbIcon, "far fa-lightbulb")}
                  ></i>
                  <Typography variant="body2">
                    در صورت تمایل این ردیاب را به یک پروژه اضافه کنید
                  </Typography>
                </div>
                <Button className={classes.input}>
                  انتخاب بازه زمانی
                  <div className={classes.chevronDownIcon}>
                    <i className="fas fa-chevron-down" />
                  </div>
                </Button>
              </Grid>
              {/* <Grid item md={12} sm={12} xs={12}>
                <div className={classes.mapBox}>
                  <Map
                    google={this.props.google}
                    zoom={8}
                    className={classes.map}
                    initialCenter={{lat: 47.444, lng: -122.176}}
                  />
                </div>
              </Grid> */}
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

AddQueries.propTypes = {
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
)(
  withStyles(styles, {withTheme: true})(
    GoogleApiWrapper({
      apiKey: "AIzaSyA8W4yPrXzLkbPNOAoq5e2sGIcsjucBM1A"
    })(AddQueries)
  )
);
