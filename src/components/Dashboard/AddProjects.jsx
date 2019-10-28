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
// import {Map, GoogleApiWrapper} from "google-maps-react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";

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
    color: "#08080d",
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

  selectedQueryItem: {
    width: "100%",
    height: 44,
    position: "relative",
    borderRadius: 3,
    backgroundColor: "#d6d9ff",
    border: "solid 2px #4753ff",
    padding: "0px 22px",
    color: "#a2a5a9",
    display: "flex",
    justifyContent: "right",
    "&::placeholder": {
      color: "#a2a5a9"
    }
  },
  divider: {
    width: "100%",
    backgroundColor: "#e4e8ed",
    height: 1,
    marginTop: 22,
    marginBottom: 22
  },
  actions: {
    display: "flex",
    alignItems: "center"
  },
  searchInput: {
    width: "100%",
    height: 44,
    borderRadius: 22,
    background: "#edf1f6",
    padding: 21,
    border: "1px solid #edf1f6",
    "&:focus": {
      background: "#fff",
      border: "1px solid #4753ff",
      outlineWidth: 0
    }
  },
  searchIconBtn: {
    color: "#fff",
    backgroundColor: "#4753ff",
    minWidth: 44,
    height: 44,
    borderRadius: 22,
    margin: "0px 15px",
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    "&:hover": {
      opacity: 0.7,
      backgroundColor: "#4753ff"
    }
  },
  count: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  countText: {
    color: "#08080d",
    fontSize: 12
  }
});

class AddProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      selectedQueries: [],

      searchInput: "",
      searchedQueries: []
    };
  }

  handleChangeName = e => {
    this.setState({
      projectName: e.target.value
    });
  };

  handleClickQuery = id => {
    var selectedQueries = this.state.selectedQueries;
    var removed_list = [];
    if (selectedQueries.includes(id)) {
      selectedQueries.map((item, index) => {
        if (item != id) {
          removed_list.push(item);
        }
      });
      selectedQueries = removed_list;
    } else {
      selectedQueries.push(id);
    }
    this.setState({
      selectedQueries
    });
  };

  handleChangeSearchInput = e => {
    var searched_query = e.target.value.toUpperCase();
    var queries = this.props.queries;
    var searched_queries = [];
    queries.map((item, index) => {
      if (item.name.toUpperCase().indexOf(searched_query) > -1) {
        searched_queries.push(item);
      }
    });

    this.setState({
      searchInput: e.target.value,
      searchedQueries: searched_queries
    });
  };

  handleSearchQueries = e => {
    var searched_query = e.target.value.toUpperCase();
    var queries = this.props.queries;
    var searched_queries = [];
    queries.map((item, index) => {
      if (item.name.toUpperCase().indexOf(searched_query) > -1) {
        searched_queries.push(item);
      }
    });

    this.setState({
      searchInput: e.target.value,
      searchedQueries: searched_queries
    });
  };

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
                    نام پروژه را وارد کنید
                  </Typography>
                </div>
                <input
                  type="text"
                  className={classes.input}
                  placeholder="نام پروژه"
                  value={this.state.projectName}
                  onChange={e => this.handleChangeName(e)}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.root} spacing={2}>
              <Grid item md={12} sm={12} xs={12}>
                <div className={classes.labelBox}>
                  <i
                    className={classNames(classes.bulbIcon, "far fa-lightbulb")}
                  ></i>
                  <Typography variant="body2">
                    ردیاب های مربوط به این پروژه رو از لیست زیر انتخاب کنید
                  </Typography>
                </div>
                <Grid
                  container
                  className={classNames(classes.root, classes.queriesContainer)}
                  spacing={2}
                >
                  <Grid item md={6} className={classes.actions}>
                    <input
                      type="text"
                      className={classes.searchInput}
                      placeholder="نام ردیاب"
                      value={this.state.searchInput}
                      onChange={e => this.handleChangeSearchInput(e)}
                    />
                    <Button
                      className={classes.searchIconBtn}
                      onClick={e => this.handleSearchQueries(e)}
                    >
                      <i className="fa fa-search fa-lg"></i>
                    </Button>
                  </Grid>
                  <Grid item md={6} className={classes.count}>
                    <div className={classes.countList}>
                      {this.state.selectedQueries.length
                        ? this.state.selectedQueries.length +
                          " ردیاب انتخاب شده"
                        : ""}
                    </div>
                  </Grid>
                  <Divider className={classes.divider} />
                  {this.state.searchInput == ""
                    ? this.props.queries.map(query => (
                        <Grid item md={6} key={query.id}>
                          <Button
                            className={
                              this.state.selectedQueries.includes(query.id)
                                ? classes.selectedQueryItem
                                : classes.queriesItem
                            }
                            onClick={() => this.handleClickQuery(query.id)}
                          >
                            {query.name}
                            <div className={classes.addIcon}>
                              {this.state.selectedQueries.includes(query.id) ? (
                                <CheckIcon />
                              ) : (
                                <AddIcon />
                              )}
                            </div>
                          </Button>
                        </Grid>
                      ))
                    : this.state.searchedQueries.map(query => (
                        <Grid item md={6} key={query.id}>
                          <Button
                            className={
                              this.state.selectedQueries.includes(query.id)
                                ? classes.selectedQueryItem
                                : classes.queriesItem
                            }
                            onClick={() => this.handleClickQuery(query.id)}
                          >
                            {query.name}
                            <div className={classes.addIcon}>
                              {this.state.selectedQueries.includes(query.id) ? (
                                <CheckIcon />
                              ) : (
                                <AddIcon />
                              )}
                            </div>
                          </Button>
                        </Grid>
                      ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

AddProjects.propTypes = {
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
)(withStyles(styles, {withTheme: true})(AddProjects));
