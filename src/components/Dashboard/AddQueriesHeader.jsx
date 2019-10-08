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

const styles = theme => ({
  wrapper: {
    width: "100vw",
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
    paddingTop: 10
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
          <Container maxWidth="xs" className={classes.container}>
            <Grid container className={classes.root} spacing={4}>
              <Grid item md={12} sm={12} xs={12}>
                <div className={classes.labelBox}>
                  <i
                    className={classNames(classes.bulbIcon, "far fa-lightbulb")}
                  ></i>
                  <Typography variant="body2">
                    فواصل زمانی ردیاب خود را انتخاب کنید
                  </Typography>
                </div>
                <Button className={classes.input}>
                  انتخاب فاصله زمانی تحلیل
                  <div className={classes.chevronDownIcon}>
                    <i className="fas fa-chevron-down" />
                  </div>
                </Button>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <div className={classes.labelBox}>
                  <i
                    className={classNames(classes.bulbIcon, "far fa-lightbulb")}
                  ></i>
                  <Typography variant="body2">
                    محدوده جغرافیایی که می‌خواهید تحلیل ترافیکی شود را انتخاب
                    کنید
                  </Typography>
                </div>
                <input
                  type="text"
                  className={classes.input}
                  placeholder="نام محدوده مورد نظر"
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <div className={classes.mapBox}>
                  <Map
                    google={this.props.google}
                    zoom={8}
                    className={classes.map}
                    initialCenter={{lat: 47.444, lng: -122.176}}
                  />
                </div>
              </Grid>
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
