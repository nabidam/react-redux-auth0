import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import classNames from "classnames";
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
  Collapse
} from "@material-ui/core";
import {connect} from "react-redux";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import selectPage from "../../actions/selectPage";
import editableProject from "../../actions/editableProject";

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
  paper: {
    display: "flex"
  },
  headerBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20
  },
  newProjectBtn: {
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
  title: {
    fontSize: 22
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#f2f3fb",
    padding: "18px 25px"
  },
  searchInput: {
    width: 410,
    height: 44,
    borderRadius: 22,
    background: "#fff",
    padding: 21,
    border: "1px solid #f2f3fb",
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
  typeOfAnalysis: {
    border: "solid 2px #e4e8ed",
    borderRadius: 3
  },
  listItem: {
    heigth: 44,
    width: "100%",
    "&:hover": {
      // color: "#4753ff",
      cursor: "pointer"
    }
  },
  activeAnalysis: {
    paddingTop: 0
  },
  selectedAnalysisType: {
    color: "#4753ff",
    "&::after": {
      content: `""`,
      position: "absolute",
      left: 24,
      width: 16,
      height: 16,
      background: "#4753ff",
      borderRadius: "50%",
      border: "solid 5px rgba(255, 255, 255, 0.85)"
    }
  },
  projectsList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 92,
    padding: "15px 0px"
  },
  textMute: {
    color: "#adb2b9",
    display: "flex"
  },
  analysisName: {
    fontSize: 22,
    textAlign: "right",
    marginBottom: 11
  },
  projectsListAction: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  pauseBtn: {
    minWidth: 32,
    width: 32,
    height: 32,
    color: "#fff",
    backgroundColor: "#03d588",
    borderRadius: 22,
    marginBottom: 11,
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    "&:hover": {
      opacity: 0.7
    }
  },
  playBtn: {
    minWidth: 32,
    width: 32,
    height: 32,
    color: "#fff",
    backgroundColor: "#f29132",
    borderRadius: 22,
    marginBottom: 11,
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    "&:hover": {
      opacity: 0.7
    }
  },
  activeIcon: {
    fontSize: "0.8em"
  },

  account: {
    height: 80,
    borderRadius: 3,
    border: "solid 1px #e4e8ed",
    padding: "18px 16px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  tableUsernamePart: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  twtterIconAvatar: {
    color: "#fff",
    backgroundColor: "#1da1f2",
    width: 16,
    height: 16,
    borderRadius: 22,
    position: "absolute",
    top: 2,
    left: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  instagramIconAvatar: {
    color: "#fff",
    backgroundColor: "#da2b72",
    width: 16,
    height: 16,
    borderRadius: 22,
    position: "absolute",
    top: 2,
    left: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  accountsDivider: {
    backgroundColor: "#e4e8ed",
    width: 1,
    height: 20,
    marginLeft: 25
  },
  username: {
    width: "35%"
  },
  accountStatusBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    laignItems: "center",
    margin: "0px 10px"
  },
  accountAction: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  deleteBtn: {
    minWidth: 32,
    width: 32,
    height: 32,
    color: "#fff",
    backgroundColor: "#ec373c",
    borderRadius: 22,
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    "&:hover": {
      opacity: 0.7
    }
  },
  clearIcon: {
    fontSize: "0.8em"
  },
  headerContainer: {
    // marginBottom: 40
  },
  postsHeaderBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  projectsContainer: {
    marginBottom: 20
  },
  postImage: {
    width: 68,
    height: 68,
    borderRadius: 3,
    border: "solid 5px #e4e8ed"
  },
  postText: {
    width: "40%",
    height: 63,
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  ProjectStats: {
    width: "15%",
    height: 63,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  socialMedia: {
    width: "15%",
    height: 63,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  hashtagsBox: {
    width: "15%",
    height: 63,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  tag: {
    marginRight: 2,
    marginLeft: 2
  },
  twitter: {
    color: "#1da1f2",
    margin: "0px 5px"
  },
  instagram: {
    color: "#da2b72",
    margin: "0px 5px"
  },
  fullWidthDivider: {
    width: "100%",
    height: 1,
    marginTop: 25
  },
  projectName: {
    fontSize: 22
  },
  projectBadge: {
    backgroundColor: "#edf1f6",
    borderRadius: 3,
    padding: "1px 5px",
    marginRight: 10
  },
  projectTitle: {
    display: "flex",
    flexDirection: "row",
    textAlign: "right",
    marginBottom: 15
  },
  expandBtn: {
    minWidth: 32,
    width: 32,
    height: 32,
    color: "#fff",
    backgroundColor: "#3340ff",
    borderRadius: 22,
    marginBottom: 15,
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    "&:hover": {
      opacity: 0.7
    }
  },
  query: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 92,
    borderRadius: 3,
    backgroundColor: "rgba(237, 241, 246, 0.5)",
    marginBottom: 10
  },
  statsDivider: {
    height: 15,
    width: 1,
    margin: "0px 15px"
  },
  socialIcons: {
    display: "flex",
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center"
  }
});

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open_row: 0
    };

    this.handleExpandProject = this.handleExpandProject.bind(this);
  }

  handleExpandProject = row => {
    this.setState({
      open_row: this.state.open_row == row ? 0 : row
    });
  };

  handleClickAddProject = () => {
    this.props.selectPage("projects/add");
  };

  handleClickEdit = id => {
    this.props.editableProject(id);
    this.props.selectPage("projects/edit");
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
          <Container maxWidth="md">
            <Grid container className={classes.root} spacing={4}>
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                center
                className={classes.headerContainer}
              >
                <div className={classes.headerBox}>
                  <Typography variant="h1" className={classes.title}>
                    پروژه‌ها
                  </Typography>
                  <Button
                    color="primary"
                    className={classes.newProjectBtn}
                    onClick={() => this.handleClickAddProject()}
                  >
                    ساخت پروژه جدید
                  </Button>
                </div>
                <div className={classes.actions}>
                  <input
                    type="text"
                    className={classes.searchInput}
                    placeholder="نام یک پروژه را جستجو کنید."
                  />
                  <Button className={classes.searchIconBtn}>
                    <i className="fa fa-search fa-lg"></i>
                  </Button>
                  <div style={{flexGrow: 1}} />
                  <Typography
                    variant="body1"
                    className={classes.numberOfProjects}
                  >
                    {this.props.projects.length} پروژه ایجاد شده
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid container className={classes.root}>
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                center
                className={classes.projectsContainer}
              >
                <List className={classes.projects}>
                  <Divider className={classes.fullWidthDivider} />
                  {this.props.projects.map(item => {
                    return (
                      <div key={item.id}>
                        <ListItem
                          className={classNames(
                            classes.listItem,
                            classes.projectsList
                          )}
                          onClick={() => this.handleExpandProject(item.id)}
                        >
                          <div className={classes.projectInformation}>
                            <div className={classes.projectTitle}>
                              <Typography
                                variant="h1"
                                className={classes.projectName}
                              >
                                {item.name}
                              </Typography>
                              <span className={classes.projectBadge}>
                                {item.queries.length} ردیاب
                              </span>
                            </div>
                            <div className={classes.textMute}>
                              ساخته شده در {item.date}, ساعت {item.time}
                            </div>
                          </div>
                          {/* <div className={classes.socialMedia}>
                            <div className={classes.socialIcons}>
                              <i
                                className={classNames(
                                  classes.instagram,
                                  "fab fa-instagram fa-lg"
                                )}
                              ></i>
                              <i
                                className={classNames(
                                  classes.twitter,
                                  "fab fa-twitter fa-lg"
                                )}
                              ></i>
                            </div>
                            <p className={classes.textMute}>شبکه‌های ارسال</p>
                          </div> */}
                          <div className={classes.projectsListAction}>
                            {item.id == this.state.open_row ? (
                              <Button className={classes.expandBtn}>
                                <ExpandMoreIcon
                                  className={classes.activeIcon}
                                />
                              </Button>
                            ) : (
                              <Button className={classes.expandBtn}>
                                <ChevronLeftIcon
                                  className={classes.activeIcon}
                                />
                              </Button>
                            )}
                            <Typography
                              variant="body"
                              className={classes.edit}
                              onClick={() => this.handleClickEdit(item.id)}
                            >
                              ویرایش
                            </Typography>
                          </div>
                        </ListItem>
                        <Collapse
                          in={this.state.open_row == item.id ? 1 : 0}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {item.queries.map((q, index) => {
                              return (
                                <ListItem className={classes.query} key={index}>
                                  <div className={classes.projectInformation}>
                                    <div className={classes.projectTitle}>
                                      <Typography
                                        variant="h1"
                                        className={classes.projectName}
                                      >
                                        {q.name}
                                      </Typography>
                                      <div className={classes.socialIcons}>
                                        <i
                                          className={classNames(
                                            classes.instagram,
                                            "fab fa-instagram fa-lg"
                                          )}
                                        ></i>
                                        <i
                                          className={classNames(
                                            classes.twitter,
                                            "fab fa-twitter fa-lg"
                                          )}
                                        ></i>
                                      </div>
                                    </div>
                                    <div className={classes.textMute}>
                                      ساخته شده در {q.date}, ساعت {q.time}
                                      <Divider
                                        className={classes.statsDivider}
                                      />
                                      پست‌های ردیابی شده: {q.retrieved_posts}
                                    </div>
                                  </div>
                                  <div className={classes.projectsListAction}>
                                    {q.active == 1 ? (
                                      <Button className={classes.pauseBtn}>
                                        <PauseIcon
                                          className={classes.activeIcon}
                                        />
                                      </Button>
                                    ) : (
                                      <Button className={classes.playBtn}>
                                        <PlayArrowIcon
                                          className={classes.activeIcon}
                                        />
                                      </Button>
                                    )}
                                    <Typography
                                      variant="body1"
                                      className={classes.edit}
                                    >
                                      ویرایش
                                    </Typography>
                                  </div>
                                </ListItem>
                              );
                            })}
                          </List>
                        </Collapse>
                        <Divider />
                      </div>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectPage: page => dispatch(selectPage(page)),
    editableProject: id => dispatch(editableProject(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Projects));
