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
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import CalenderComponent from "./CalenderCompnent";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {Calendar} from "react-modern-calendar-datepicker";

const months = [
  "",
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند"
];

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
  },

  tagWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    overflow: "hidden",
    minHeight: 44,
    position: "relative",
    borderRadius: 22,
    backgroundColor: "#edf1f6",
    border: "none",
    padding: "8px 22px",
    color: "#a2a5a9",
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    flexWrap: "wrap",
    "&::placeholder": {
      color: "#a2a5a9"
    }
  },
  tagHolder: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    marginTop: 1,
    marginBottom: 1,
    borderRadius: 22,
    height: 26,
    color: "#fff",
    marginLeft: 10,
    backgroundColor: "#4753ff"
  },
  tag: {
    fontSize: 12,
    marginLeft: 5
  },
  tagRemove: {
    backgroundColor: "#fff",
    color: "#4753ff",
    width: 16,
    height: 16,
    borderRadius: "50%",
    "&:hover": {
      cursor: "pointer"
    }
  },
  tagRemoveIcon: {
    fontSize: "1rem"
  },
  tagInput: {
    flexGrow: 1,
    border: "none",
    backgroundColor: "#edf1f6",
    color: "#a2a5a9",
    "&:focus": {
      outline: "none"
    }
  },

  socialMediaIconBox: {
    position: "relative"
  },
  checkIconTiny: {
    color: "#fff",
    backgroundColor: "#03d588",
    width: 14,
    height: 14,
    borderRadius: 22,
    position: "absolute",
    top: 2,
    right: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  instagramIconBtn: {
    color: "#fff",
    backgroundColor: "#da2b72",
    minWidth: 44,
    height: 44,
    borderRadius: 22,
    margin: "0px 10px",
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    padding: 0,
    "&:hover": {
      opacity: 0.7,
      backgroundColor: "#da2b72"
    }
  },
  twitterIconBtn: {
    color: "#fff",
    backgroundColor: "#1da1f2",
    minWidth: 44,
    height: 44,
    borderRadius: 22,
    margin: "0px 10px",
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    padding: 0,
    "&:hover": {
      opacity: 0.7,
      backgroundColor: "#1da1f2"
    }
  },

  dayIsSelected: {
    color: "#08080d"
  }
});

class AddQueries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instagramUsers: [],
      twitterUsers: [],
      hashtags: [],
      keywords: [],

      twitter: 0,
      instagram: 0,

      isLocationEnable: false,

      isSelectProjectOpen: false,
      selectProjectAnchorEl: null,
      selectedProject: null,

      isCalenderOpen: false,
      calenderAnchorEl: null,

      selectedDay: {
        from: null,
        to: null
      },
      isDaySelected: false
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

  handleCalenderClick = event => {
    this.setState({
      calenderAnchorEl: event.currentTarget,
      isCalenderOpen: Boolean(event.currentTarget)
    });
  };

  handleCloseCalender = () => {
    this.setState({
      calenderAnchorEl: null,
      isCalenderOpen: false
    });
  };

  handleSelectedDay = day => {
    // console.log(day);
    this.setState({
      selectedDay: day,
      isDaySelected: true
    });
  };

  handleAddInstagramUser = e => {
    if (e.keyCode == 13 && e.target.value != "") {
      this.setState({
        instagramUsers: [...this.state.instagramUsers, e.target.value]
      });
      e.target.value = "";
    }
  };

  handleRemoveInstagramUser = id => {
    var removed_list = [];
    this.state.instagramUsers.map((item, index) => {
      if (index != id) {
        removed_list.push(item);
      }
    });
    this.setState({
      instagramUsers: removed_list
    });
  };

  handleAddTwitterUser = e => {
    if (e.keyCode == 13 && e.target.value != "") {
      this.setState({
        twitterUsers: [...this.state.twitterUsers, e.target.value]
      });
      e.target.value = "";
    }
  };

  handleRemoveTwitterUser = id => {
    var removed_list = [];
    this.state.twitterUsers.map((item, index) => {
      if (index != id) {
        removed_list.push(item);
      }
    });
    this.setState({
      twitterUsers: removed_list
    });
  };

  handleAddHashtag = e => {
    if (e.keyCode == 13 && e.target.value != "") {
      this.setState({
        hashtags: [...this.state.hashtags, e.target.value]
      });
      e.target.value = "";
    }
  };

  handleRemoveHashtag = id => {
    var removed_list = [];
    this.state.hashtags.map((item, index) => {
      if (index != id) {
        removed_list.push(item);
      }
    });
    this.setState({
      hashtags: removed_list
    });
  };

  handleAddKeyword = e => {
    if (e.keyCode == 13 && e.target.value != "") {
      this.setState({
        keywords: [...this.state.keywords, e.target.value]
      });
      e.target.value = "";
    }
  };

  handleRemoveKeyword = id => {
    var removed_list = [];
    this.state.keywords.map((item, index) => {
      if (index != id) {
        removed_list.push(item);
      }
    });
    this.setState({
      keywords: removed_list
    });
  };

  handleTwitterClick = () => {
    this.setState({
      twitter: !this.state.twitter
    });
  };

  handleInstagramClick = () => {
    this.setState({
      instagram: !this.state.instagram
    });
  };

  handleEnableLocation = () => {
    this.setState({
      isLocationEnable: !this.state.isLocationEnable
    });
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
                </Popover>
              </Grid>
            </Grid>
            <Grid container className={classes.root} spacing={2}>
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
              <Grid item md={6} sm={6} xs={12}>
                <div className={classes.labelBox}>
                  <i
                    className={classNames(classes.bulbIcon, "far fa-lightbulb")}
                  ></i>
                  <Typography variant="body2">
                    یک بازه زمانی برای ردیاب خود انتخاب کنید
                  </Typography>
                </div>
                <Button
                  className={classNames(
                    classes.input,
                    this.state.isDaySelected ? classes.dayIsSelected : ""
                  )}
                  onClick={event => this.handleCalenderClick(event)}
                >
                  {this.state.isDaySelected == false
                    ? "انتخاب بازه زمانی"
                    : this.state.selectedDay.from.day +
                      " " +
                      months[this.state.selectedDay.from.month] +
                      " " +
                      this.state.selectedDay.from.year +
                      " - " +
                      (this.state.selectedDay.to
                        ? this.state.selectedDay.to.day +
                          " " +
                          months[this.state.selectedDay.to.month] +
                          " " +
                          this.state.selectedDay.to.year
                        : "")}
                  <div className={classes.chevronDownIcon}>
                    <i className="fas fa-chevron-down" />
                  </div>
                </Button>
                <Popover
                  open={this.state.isCalenderOpen}
                  onClose={() => this.handleCloseCalender()}
                  anchorEl={this.state.calenderAnchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  classes={{
                    paper: classes.calenderPopover
                  }}
                >
                  <Calendar
                    value={this.state.selectedDay}
                    onChange={day => this.handleSelectedDay(day)}
                    shouldHighlightWeekends
                    isPersian
                  />
                </Popover>
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
                    <div className={classes.socialMediaIconBox}>
                      <IconButton
                        className={
                          this.state.instagram
                            ? classes.instagramIconBtn
                            : classes.socialMediaIcon
                        }
                        onClick={() => this.handleInstagramClick()}
                      >
                        <i className="fab fa-instagram fa-sm"></i>
                      </IconButton>
                      {this.state.instagram ? (
                        <span className={classes.checkIconTiny}>
                          <CheckIcon style={{fontSize: "0.9rem"}} />
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </Grid>
                  <Grid item md={5}>
                    <div className={classes.tagWrapper}>
                      {this.state.instagramUsers.map((item, index) => {
                        return (
                          <div className={classes.tagHolder} key={index}>
                            <div className={classes.tag}>{item}</div>
                            <div
                              className={classes.tagRemove}
                              onClick={() =>
                                this.handleRemoveInstagramUser(index)
                              }
                            >
                              <ClearIcon className={classes.tagRemoveIcon} />
                            </div>
                          </div>
                        );
                      })}
                      <input
                        type="text"
                        className={classes.tagInput}
                        placeholder="نام کاربری فرد موثر برای ردیابی"
                        id="instagram-users"
                        onKeyUp={e => this.handleAddInstagramUser(e)}
                      />
                    </div>
                  </Grid>
                  <Grid item md={1}>
                    <div className={classes.socialMediaIconBox}>
                      <IconButton
                        className={
                          this.state.twitter
                            ? classes.twitterIconBtn
                            : classes.socialMediaIcon
                        }
                        onClick={() => this.handleTwitterClick()}
                      >
                        <i className="fab fa-twitter fa-sm"></i>
                      </IconButton>
                      {this.state.twitter ? (
                        <span className={classes.checkIconTiny}>
                          <CheckIcon style={{fontSize: "0.9rem"}} />
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </Grid>
                  <Grid item md={5}>
                    <div className={classes.tagWrapper}>
                      {this.state.twitterUsers.map((item, index) => {
                        return (
                          <div className={classes.tagHolder} key={index}>
                            <div className={classes.tag}>{item}</div>
                            <div
                              className={classes.tagRemove}
                              onClick={() =>
                                this.handleRemoveTwitterUser(index)
                              }
                            >
                              <ClearIcon className={classes.tagRemoveIcon} />
                            </div>
                          </div>
                        );
                      })}
                      <input
                        type="text"
                        className={classes.tagInput}
                        placeholder="نام کاربری فرد موثر برای ردیابی"
                        id="twitter-users"
                        onKeyUp={e => this.handleAddTwitterUser(e)}
                      />
                    </div>
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
                    <div className={classes.tagWrapper}>
                      {this.state.hashtags.map((item, index) => {
                        return (
                          <div className={classes.tagHolder} key={index}>
                            <div className={classes.tag}>{item}</div>
                            <div
                              className={classes.tagRemove}
                              onClick={() => this.handleRemoveHashtag(index)}
                            >
                              <ClearIcon className={classes.tagRemoveIcon} />
                            </div>
                          </div>
                        );
                      })}
                      <input
                        type="text"
                        className={classes.tagInput}
                        placeholder="نام کاربری فرد موثر برای ردیابی"
                        id="instagram-users"
                        onKeyUp={e => this.handleAddHashtag(e)}
                      />
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <div className={classes.tagWrapper}>
                      {this.state.keywords.map((item, index) => {
                        return (
                          <div className={classes.tagHolder} key={index}>
                            <div className={classes.tag}>{item}</div>
                            <div
                              className={classes.tagRemove}
                              onClick={() => this.handleRemoveKeyword(index)}
                            >
                              <ClearIcon className={classes.tagRemoveIcon} />
                            </div>
                          </div>
                        );
                      })}
                      <input
                        type="text"
                        className={classes.tagInput}
                        placeholder="نام کاربری فرد موثر برای ردیابی"
                        id="instagram-users"
                        onKeyUp={e => this.handleAddKeyword(e)}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {this.state.isLocationEnable != true ? (
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
                    onClick={() => this.handleEnableLocation()}
                  >
                    انتخاب محدوده جغرافیایی
                  </Button>
                </Grid>
              ) : (
                ""
              )}
              {this.state.isLocationEnable ? (
                <Grid item md={12} sm={12} xs={12}>
                  <div className={classes.labelBox}>
                    <i
                      className={classNames(
                        classes.bulbIcon,
                        "far fa-lightbulb"
                      )}
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
                        <Typography
                          variant="body2"
                          className={classes.textMute}
                        >
                          هشتگ یا کلمه کلیدی مرتبط پیدا نشده است
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                ""
              )}
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
