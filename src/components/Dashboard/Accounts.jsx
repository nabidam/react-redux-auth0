import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import {PDFDownloadLink, Document, Page, View, Text} from "@react-pdf/renderer";
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
import Slider from "@material-ui/lab/Slider";
// import {Slider} from "material-ui-slider";
import ExcelDownload from "./ExcelDownload";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import HistoryIcon from "@material-ui/icons/History";
import Traffic from "@material-ui/icons/Traffic";
import Whatshot from "@material-ui/icons/Whatshot";
import People from "@material-ui/icons/People";
import ChatBubble from "@material-ui/icons/ChatBubble";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ReactEcharts from "echarts-for-react";
import {
  ResponsiveContainer,
  BarChart,
  Brush,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";
import {connect} from "react-redux";
import changeSelectedQuery from "../../actions/changeSelectedQuery";
import selectAnalysisType from "../../actions/selectAnalysisType";
import changeAnalysisStatus from "../../actions/changeAnalysisStatus";
import ReactExport from "react-data-export";
import LatestQueriesPDF from "./LatestQueriesPDF";
import moment from "moment";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ClearIcon from "@material-ui/icons/Clear";

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
  newAnalysisBtn: {
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
  postsItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textMute: {
    color: "#adb2b9"
  },
  analysisName: {
    fontSize: 22,
    textAlign: "right",
    marginBottom: 11
  },
  analysisListActions: {
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
  postsContainer: {
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
  postStats: {
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
  }
});

class Accounts extends React.Component {
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
                    حساب‌های شما
                  </Typography>
                  <Button color="primary" className={classes.newAnalysisBtn}>
                    افزودن حساب
                  </Button>
                </div>
                <Grid container className={classes.root} spacing={4}>
                  {this.props.accounts.map(item => (
                    <Grid item md={6} sm={6} xs={6} center>
                      <div className={classes.account}>
                        <Grid
                          container
                          className={classes.username}
                          spacing={1}
                        >
                          <Grid
                            item
                            md={4}
                            sm={4}
                            xs={4}
                            className={classes.tableUsernamePart}
                          >
                            <Avatar
                              alt="Remy Sharp"
                              src="https://material-ui.com/static/images/avatar/1.jpg"
                              className={classes.avatar}
                            />
                            {item.social_media == "twitter" ? (
                              <span className={classes.twtterIconAvatar}>
                                <i className="fab fa-twitter fa-sm"></i>
                              </span>
                            ) : (
                              <span className={classes.instagramIconAvatar}>
                                <i className="fab fa-instagram fa-sm"></i>
                              </span>
                            )}
                          </Grid>
                          <Grid
                            item
                            md={8}
                            sm={8}
                            xs={8}
                            className={classes.tableUsernamePart}
                          >
                            <span>{item.name}</span>
                            <span className={classes.textMute}>
                              @{item.username}
                            </span>
                          </Grid>
                        </Grid>
                        <Divider className={classes.accountsDivider} />
                        <div className={classes.accountStatusBox}>
                          <div className={classes.accountStatusNumber}>
                            {item.followers}
                          </div>
                          <div
                            className={classNames(
                              classes.accountStatusTitle,
                              classes.textMute
                            )}
                          >
                            فالوور
                          </div>
                        </div>
                        <div className={classes.accountStatusBox}>
                          <div className={classes.accountStatusNumber}>
                            {item.followings}
                          </div>
                          <div
                            className={classNames(
                              classes.accountStatusTitle,
                              classes.textMute
                            )}
                          >
                            فاووینگ
                          </div>
                        </div>
                        <div className={classes.accountStatusBox}>
                          <div className={classes.accountStatusNumber}>
                            {item.posts}
                          </div>
                          <div
                            className={classNames(
                              classes.accountStatusTitle,
                              classes.textMute
                            )}
                          >
                            پست‌ها
                          </div>
                        </div>
                        <div className={classes.accountAction}>
                          <Button className={classes.deleteBtn}>
                            <ClearIcon className={classes.clearIcon} />
                          </Button>
                        </div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {/* <Grid item md={3} sm={3} xs={3} center>
                <List className={classes.typeOfAnalysis}>
                  <ListItem
                    className={classNames(
                      classes.listItem,
                      this.props.selectedAnalysisType == 1
                        ? classes.selectedAnalysisType
                        : ""
                    )}
                    onClick={() => this.props.selectAnalysisType(1)}
                  >
                    <ListItemText
                      primary="تحلیل‌های فعال"
                      className="list-item-right"
                    />
                  </ListItem>
                  <ListItem
                    className={classNames(
                      classes.listItem,
                      this.props.selectedAnalysisType == 0
                        ? classes.selectedAnalysisType
                        : ""
                    )}
                    onClick={() => this.props.selectAnalysisType(0)}
                  >
                    <ListItemText
                      primary="تحلیل‌های متوقف شده"
                      className="list-item-right"
                    />
                  </ListItem>
                </List>
              </Grid> */}
              {/* <Grid item md={9} sm={9} xs={9} center>
                <List className={classes.activeAnalysis}>
                  <Divider fullWidth />
                  {this.props.analysis.map(item => {
                    if (item.active == this.props.selectedAnalysisType) {
                      return (
                        <div>
                          <ListItem
                            className={classNames(
                              classes.listItem,
                              classes.listAnalysisItem
                            )}
                            onClick={() =>
                              this.props.changeAnalysisStatus(item.id)
                            }
                          >
                            {console.log(this.props.analysis)}
                            <div className={classes.analysisListText}>
                              <Typography
                                variant="h1"
                                className={classes.analysisName}
                              >
                                {item.name}
                              </Typography>
                              <Typography
                                variant="body"
                                className={classes.textMute}
                              >
                                ساخته شده در: {item.date}, ساعت: {item.time}
                              </Typography>
                            </div>

                            <div className={classes.analysisListActions}>
                              {item.active == 1 ? (
                                <Button className={classes.pauseBtn}>
                                  <PauseIcon className={classes.activeIcon} />
                                </Button>
                              ) : (
                                <Button className={classes.playBtn}>
                                  <PlayArrowIcon
                                    className={classes.activeIcon}
                                  />
                                </Button>
                              )}
                              <Typography
                                variant="body"
                                className={classes.edit}
                              >
                                ویرایش
                              </Typography>
                            </div>
                          </ListItem>
                          <Divider fullWidth />
                        </div>
                      );
                    }
                  })}
                </List>
              </Grid> */}
            </Grid>
            <Grid container className={classes.root}>
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
                    مدیریت پست‌ها
                  </Typography>
                  <Button color="primary" className={classes.newAnalysisBtn}>
                    ایجاد پست جدید
                  </Button>
                </div>
              </Grid>
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                center
                className={classes.postsContainer}
              >
                <List className={classes.posts}>
                  <Divider fullWidth />
                  {this.props.posts.map(item => {
                    return (
                      <div>
                        <ListItem
                          className={classNames(
                            classes.listItem,
                            classes.postsItem
                          )}
                        >
                          <div>
                            <img
                              src="https://placekitten.com/200/200"
                              alt=""
                              className={classes.postImage}
                            />
                          </div>
                          <Typography variant="p" className={classes.postText}>
                            {item.post}
                          </Typography>
                          <div className={classes.postStats}>
                            <p>{item.date}</p>
                            <p>{item.time}</p>
                            <p className={classes.textMute}>زمان ارسال</p>
                          </div>
                          <div className={classes.socialMedia}>
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
                          </div>
                          <div className={classes.hashtagsBox}>
                            <div className={classes.hashtags}>
                              {item.hashtags.map(tag => {
                                return (
                                  <span className={classes.tag}>
                                    #{tag.tag}
                                  </span>
                                );
                              })}
                            </div>
                            <p className={classes.textMute}>هشتگ مرتبط</p>
                          </div>
                        </ListItem>
                        <Divider fullWidth />
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

Accounts.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    latestQueries: state.latestQueries,
    selectedQuery: state.selectedQuery,
    accounts: state.accounts,
    posts: state.myPosts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedQuery: id => dispatch(changeSelectedQuery(id)),
    selectAnalysisType: type => dispatch(selectAnalysisType(type)),
    changeAnalysisStatus: analysis => dispatch(changeAnalysisStatus(analysis))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Accounts));
