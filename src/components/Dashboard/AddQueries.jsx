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
import MapComponent from "./MapComponent";
import Popover from "@material-ui/core/Popover";
import AddIcon from "@material-ui/icons/Add";
import selectPage from "../../actions/selectPage";

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
    border: "2px solid #e4e8ed",
    borderRadius: 3,
    height: 180,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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

  mapOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    opacity: "0.4"
  },

  changeMapBtn: {
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
  enableMapGrid: {
    display: "flex",
    justifyContent: "center"
  },
  enableMapBtn: {
    width: 215,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    border: "solid 2px #08080d",
    color: "#08080d",
    "&:hover": {
      backgroundColor: "#fff"
    },
    "&:active": {
      opacity: 0.7
    }
  },
  paperSP: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 440,
    borderBottomLeftRadius: "unset",
    borderBottomRightRadius: "unset",
    boxShadow: "unset",
    borderBottom: "6px solid #edf1f6"
  },
  popover: {
    borderRadius: 22,
    width: 440
  },
  listItem: {
    heigth: 40,
    fontSize: 12,
    "&:hover": {
      color: "#4753ff",
      cursor: "pointer"
    },
    "&::after": {
      content: `""`,
      display: "block",
      margin: "auto",
      position: "absolute",
      right: 16,
      bottom: 0,
      width: 404,
      height: 2,
      background: "#e2e6ea"
    },
    // paddingLeft: 24,
    // paddingRight: 24,
    "&:last-child::after": {
      display: "none"
    }
  },
  listItemNewProject: {
    color: "#3340ff"
  },
  iconAddProject: {
    minWidth: "unset",
    color: "#3340ff"
  },
  openSelectProjectInput: {
    border: "solid 4px #e3e5ff"
  },
  projectIsSelected: {
    color: "#08080d"
  }
});

class AddQueries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectProjectOpen: false,
      selectProjectAnchorEl: null,
      selectedProject: null
    };
  }

  handleSelectProjectClick = event => {
    this.setState({
      selectProjectAnchorEl: event.currentTarget,
      isSelectProjectOpen: Boolean(event.currentTarget)
    });
  };

  handleCloseSelectProject = () => {
    this.setState({
      selectProjectAnchorEl: null,
      isSelectProjectOpen: false
    });
  };

  handleSeletProject = project => {
    this.setState({
      selectedProject: project
    });

    this.handleCloseSelectProject();
  };

  handleClickChangeMap = () => {
    var mapOverlay = document.getElementById("map-overlay");
    mapOverlay.parentNode.removeChild(mapOverlay);
    var mapBtn = document.getElementById("map-btn");
    mapBtn.parentNode.removeChild(mapBtn);
    var mapBox = document.getElementById("map-box");
    mapBox.style.borderColor = "#4753ff";
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
                    در صورت تمایل این ردیاب را به یک پروژه اضافه کنید
                  </Typography>
                </div>
                <input
                  type="hidden"
                  name="project_id"
                  id={
                    this.state.selectedProject == null
                      ? 0
                      : this.state.selectedProject.id
                  }
                />
                <Button
                  className={classNames(
                    classes.input,
                    this.state.isSelectProjectOpen
                      ? classes.openSelectProjectInput
                      : "",
                    this.state.selectedProject ? classes.projectIsSelected : ""
                  )}
                  onClick={event => this.handleSelectProjectClick(event)}
                >
                  {this.state.selectedProject == null
                    ? "انتخاب یک پروژه"
                    : this.state.selectedProject.name}
                  <div className={classes.chevronDownIcon}>
                    <i className="fas fa-chevron-down" />
                  </div>
                </Button>
                <Popover
                  open={this.state.isSelectProjectOpen}
                  onClose={() => this.handleCloseSelectProject()}
                  anchorEl={this.state.selectProjectAnchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  classes={{
                    paper: classes.popover
                  }}
                >
                  <List component="nav" className={classes.selectQueryList}>
                    <ListItem
                      className={classNames(
                        classes.listItem,
                        classes.listItemNewProject
                      )}
                      key="0"
                      button
                      onClick={() => this.props.selectPage("projects/add")}
                    >
                      <ListItemText className="list-item-right">
                        پروژه جدید
                      </ListItemText>
                      <ListItemIcon className={classes.iconAddProject}>
                        <AddIcon />
                      </ListItemIcon>
                    </ListItem>
                    {this.props.projects.map((item, index) => {
                      return (
                        <ListItem
                          className={classNames(classes.listItem)}
                          key={item.id}
                          button
                          onClick={() => this.handleSeletProject(item)}
                        >
                          <ListItemText className="list-item-right">
                            {item.name}
                          </ListItemText>
                        </ListItem>
                      );
                    })}
                  </List>
                  <div className="popover">
                    {/* <IconButton
                        className={classes.iconButtonSQ}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                      <InputBase
                        value={this.state.searchQueryString}
                        onChange={this.handleChangeSearchQueryString}
                        className={classes.inputSQ}
                        placeholder="جستجو در ردیاب‌ها"
                        inputProps={{"aria-label": "search queries"}}
                      />
                      <IconButton
                        color="primary"
                        className={classNames(
                          classes.iconButtonSQ,
                          this.state.searchQueryString != ""
                            ? classes.showClearBtn
                            : classes.hideClearBtn
                        )}
                        onClick={this.handleClearSearchQueryString}
                        aria-label="clear"
                      >
                        <CloseIcon />
                      </IconButton> */}
                    {/* <List component="nav" className={classes.selectQueryList}>
                      {this.state.searchQueryString != ""
                        ? this.state.seachedQueries.map((item, index) => {
                            return (
                              <ListItem
                                className={classNames(classes.listItemx)}
                                key={item.id}
                                button
                                onClick={() => this.handleSelectQueryMenu(item)}
                              >
                                <ListItemText className="list-item-right">
                                  {item.name}
                                </ListItemText>
                                <ListItemText
                                  className={classes.listItemTextMeta}
                                >
                                  {item.created_at}
                                </ListItemText>
                                <ListItemIcon
                                  className={classes.iconChevronList}
                                >
                                  <ChevronLeft />
                                </ListItemIcon>
                              </ListItem>
                            );
                          })
                        : this.props.latestQueries.map((item, index) => {
                            return (
                              <ListItem
                                className={classNames(classes.listItemx)}
                                key={item.id}
                                button
                                onClick={() => this.handleSelectQueryMenu(item)}
                              >
                                <ListItemText className="list-item-right">
                                  {item.name}
                                </ListItemText>
                                <ListItemText
                                  className={classes.listItemTextMeta}
                                >
                                  {item.created_at}
                                </ListItemText>
                                <ListItemIcon
                                  className={classes.iconChevronList}
                                >
                                  <ChevronLeft />
                                </ListItemIcon>
                              </ListItem>
                            );
                          })}
                    </List> */}
                  </div>
                </Popover>
              </Grid>
            </Grid>
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
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                className={classes.enableMapGrid}
              >
                <Button
                  color="primary"
                  className={classes.enableMapBtn}
                  // onClick={() => this.showMapBox()}
                >
                  انتخاب محدوده جغرافیایی
                </Button>
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
                    <div className={classes.mapBox} id="map-box">
                      <MapComponent />
                      <div
                        id="map-overlay"
                        className={classes.mapOverlay}
                      ></div>
                      <Button
                        id="map-btn"
                        color="primary"
                        className={classes.changeMapBtn}
                        onClick={() => this.handleClickChangeMap()}
                      >
                        انتخاب محدوده
                      </Button>
                    </div>
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
    selectedQueriesType: state.selectedQueriesType,
    projects: state.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectQuery: id => dispatch(selectQuery(id)),
    selectQueriesType: type => dispatch(selectQueriesType(type)),
    changeQueryStatus: query => dispatch(changeQueryStatus(query)),
    selectPage: page => dispatch(selectPage(page))
  };
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(
//   withStyles(styles, {withTheme: true})(
//     GoogleApiWrapper({
//       apiKey: "AIzaSyA8W4yPrXzLkbPNOAoq5e2sGIcsjucBM1A"
//     })(AddQueries)
//   )
// );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(AddQueries));
