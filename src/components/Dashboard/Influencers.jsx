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
  Tooltip as MTooltip
} from "@material-ui/core";
import {connect} from "react-redux";
import selectGroup from "../../actions/selectGroup";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import BootstrapTooltip from "./BSTooltip";
import ViewStreamOutlinedIcon from "@material-ui/icons/ViewStreamOutlined";
import ViewModuleOutlinedIcon from "@material-ui/icons/ViewModuleOutlined";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ListPosts from "./ListPosts";
import GridPosts from "./GridPosts";

const styles = theme => ({
  wrapper: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#ebeff4"
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
    display: "flex",
    padding: 20
  },
  topNavbar: {
    marginTop: -3,
    padding: 0,
    marginBottom: 20
  },
  topNavbarTitleBox: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  topNavbarTitleText: {
    color: "#08080d",
    fontSize: 32
  },
  topNavbarMeta: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  instagramIconBtn: {
    color: "#fff",
    backgroundColor: "#da2b72",
    minWidth: 44,
    height: 44,
    borderRadius: 22,
    margin: "0px ",
    border: "solid 5px rgba(255, 255, 255, 0.85)",
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
    "&:hover": {
      opacity: 0.7,
      backgroundColor: "#1da1f2"
    }
  },

  chartContainer: {
    paddingRight: 50,
    paddingLeft: 50,
    paddingBottom: 20
  },
  chartBox: {
    height: 150
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
  avatar: {
    width: 32,
    height: 32,
    marginLeft: 10,
    marginBottom: 5,
    color: "#3c3c3c"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },

  paper: {
    display: "flex",
    padding: 20
    // height: "35vh"
    // width: "40%vw"
  },
  columnPaper: {
    flexDirection: "column"
  },
  paperHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  paperHeaderGuideIcon: {
    color: "#adb2b9",
    "&:hover": {
      color: "#f29132",
      cursor: "pointer"
    }
  },

  topNavbarPaper: {
    borderRadius: 3,
    display: "flex",
    height: 94,
    paddingRight: 250,
    paddingLeft: 250
    // paddingTop: 18,

    // width: "40%vw"
  },

  chartTitleContainer: {
    marginTop: 30,
    marginBottom: 30
  },
  chartPaper: {
    display: "flex",
    flexDirection: "column",
    padding: 25
  },
  chartStatusPaper: {
    display: "flex",
    padding: 25,
    justifyContent: "center",
    backgroundColor: "#f2f3fb",
    borderRadius: 3,
    boxShadow: "unset"
  },
  statusItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  statusIcon: {
    color: "#fc4c81",
    fontSize: 22,
    margin: "0px 20px"
  },
  statusText: {
    display: "flex",
    flexDirection: "column",
    fontSize: 22
  },
  statusTextMute: {
    color: "#adb2b9",
    fontSize: 10
  },

  leftToRight: {
    direction: "ltr"
  },
  chart: {
    height: "100%"
    // flexGrow: 1
  },
  chartActions: {
    display: "flex",
    width: 250,
    height: 30,
    borderRadius: 40,
    backgroundColor: "#edf1f6",
    color: "#adb2b9"
  },
  selectedChartAction: {
    width: 66,
    borderRadius: 40,
    backgroundColor: "#fff",
    color: "#000",
    position: "relative",
    boxShadow:
      "0 2px 10px 0 rgba(0, 0, 0, 0.03), 0 2px 5px 0 rgba(0, 0, 0, 0.12)"
  },
  chartTopActions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  lists: {
    maxHeight: "100%",
    overflowY: "scroll",
    direction: "ltr",
    fontSize: "0.7em"
  },
  displayFlex: {
    display: "flex",
    flexDirection: "column"
  },
  smallText: {
    fontSize: "0.6em"
  },
  pR5: {
    paddingRight: 5
  },
  pT5: {
    paddingTop: 5
  },
  aboveChartIcon: {
    fontSize: "1.2em",
    paddingRight: 5,
    paddingTop: 5,
    color: "#00bfff"
  },
  aboveChartList: {
    paddingRight: 20
  },
  textRed: {
    color: "#ff3500"
  },
  textGreen: {
    color: "#207245"
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  slider: {
    width: "90%"
  },
  fieldsContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "right"
  },
  tabs: {
    display: "flex",
    width: "100%",
    margin: "0px auto"
  },
  listItem: {
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%",
    "&:hover": {
      color: "#4753ff",
      cursor: "pointer"
    }
  },
  textCenter: {
    textAlign: "center",
    fontSize: 14
  },
  selectedTab: {
    color: "#3340ff",
    borderBottom: "3px solid #4753ff"
  },
  showMoreFields: {
    fontSize: 12,
    margin: theme.spacing(1),
    // margin: 8,
    paddingRight: 19,
    width: 240,
    backgroundColor: "#fff",
    color: "#08080d",
    height: 37,
    borderRadius: 19,
    justifyContent: "right",
    border: "1px solid #979797"

    // "&:hover": {
    //   backgroundColor: "#0500cb"
    // }
  },
  showMoreFieldsIcon: {
    display: "flex",
    position: "absolute",
    left: "19px"
  },
  botPaper: {
    height: 470
  },
  emotionsContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  emotionStats: {
    display: "flex",
    marginBottom: 35,
    width: 150
  },
  negativeEmotion: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  negativePercent: {
    position: "relative",
    width: 45,
    fontWeight: "bold",
    textAlign: "left",
    "&::after": {
      content: `""`,
      position: "absolute",
      right: 0,
      width: 16,
      height: 16,
      background: "#ec373c",
      borderRadius: "50%"
    }
  },
  negativeText: {
    fontSize: 10
  },
  positiveEmotion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  positivePercent: {
    position: "relative",
    width: 45,
    fontWeight: "bold",
    textAlign: "right",
    "&::after": {
      content: `""`,
      position: "absolute",
      left: 0,
      width: 16,
      height: 16,
      background: "#03d588",
      borderRadius: "50%"
    }
  },
  positiveText: {
    fontSize: 10
  },
  showTextEmotion: {
    fontSize: 12,
    margin: theme.spacing(1),
    // margin: 8,
    paddingRight: 19,
    width: 240,
    backgroundColor: "#fff",
    color: "#08080d",
    height: 37,
    borderRadius: 19,
    justifyContent: "right",
    border: "1px solid #979797"

    // "&:hover": {
    //   backgroundColor: "#0500cb"
    // }
  },
  showTextEmotionIcon: {
    display: "flex",
    position: "absolute",
    left: "19px"
  },

  actions: {
    display: "flex",
    alignItems: "center"
  },
  searchInput: {
    width: 300,
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
  searchDivider: {
    height: 20,
    width: 1,
    color: "#e4e8ed",
    margin: "0px 10px"
  },
  sortBtnContainer: {
    flexGrow: 1
  },
  sortBtn: {
    fontSize: 14,
    color: "#08080d",
    backgroundColor: "#fff",
    minWidth: 100,
    height: 44,
    borderRadius: 22,
    margin: "0px 5px",
    padding: 10,
    justifyContent: "right",
    "&:hover": {
      opacity: 0.7,
      backgroundColor: "#edf1f6"
    }
  },
  sortIcon: {
    display: "flex",
    position: "absolute",
    left: "10px"
  },

  selectTableView: {
    display: "flex",
    flexDirection: "row",
    fontSize: 12,
    width: 91,
    justifyContent: "center",
    backgroundColor: "#edf1f6",
    color: "#08080d",
    margin: theme.spacing(1),
    height: 44,
    borderRadius: 22
  },
  selectTableViewIcon: {
    display: "flex",
    minWidth: "unset",
    borderRadius: 22,
    width: "30%",
    "&:hover": {
      backgroundColor: "#edf1f6"
    },
    "&:active": {
      backgroundColor: "#edf1f6"
    }
  },
  selectedView: {
    color: "#3340ff"
  },

  dividerFW: {
    width: "100%",
    height: 1,
    backgroundColor: "#e4e8ed"
  },

  table: {
    width: 605
  },
  tableHeader: {
    fontSize: 12,
    color: "#08080d"
  },

  negativeEmotion: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    "&::after": {
      content: `""`,
      position: "absolute",
      width: 16,
      height: 16,
      background: "#ec373c",
      border: "solid 5px rgba(255, 255, 255, 0.85)",
      borderRadius: "50%"
    }
  },
  positiveEmotion: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    "&::after": {
      content: `""`,
      position: "absolute",
      width: 16,
      height: 16,
      background: "#03d588",
      border: "solid 5px rgba(255, 255, 255, 0.85)",
      borderRadius: "50%"
    }
  },
  textMute: {
    color: "#adb2b9"
  },

  paginationBox: {
    marginBottom: 40
  },
  paginationLinks: {
    width: 250,
    height: 44,
    border: "solid 2px #e4e8ed",
    marginTop: 30,
    borderRadius: 22,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  paginationLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 8,
    width: 28,
    height: 28,
    borderRadius: "50%",
    "&:hover": {
      cursor: "pointer"
    }
  },
  activePaginationLink: {
    border: "solid 2px #3340ff",
    backgroundColor: "#d7d9ff"
  },
  paginationText: {
    textAlign: "center",
    color: "#adb2b9"
  },
  textNormal: {
    color: "#08080d",
    padding: "0 3px"
  },

  tableUsernamePart: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "right"
  },

  tableRow: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#f2f3fb"
    }
  },
  postsPaper: {
    display: "flex",
    padding: "16px 36px"
  },
  dividerM: {
    margin: "15px 0px"
  },
  selectedKeyword: {
    color: "#4753ff"
  },
  textRight: {
    textAlign: "right"
  },
  textLeft: {
    textLeft: "left"
  },
  relatedsPaper: {
    height: "100%"
  },
  relateds: {
    paddingRight: 0
  },
  groupsPaper: {
    height: 420
  },
  tableCellLowPadding: {
    padding: 6
  },
  selectedGroup: {
    backgroundColor: "#dbddff",
    borderRadius: 3,
    border: "solid 2px #3340ff"
  },
  columnPaper: {
    flexDirection: "column"
  },
  paperHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  paperHeaderGuideIcon: {
    color: "#adb2b9",
    "&:hover": {
      color: "#f29132",
      cursor: "pointer"
    }
  },
  groupsContainer: {
    marginBottom: 30
  },
  title: {
    fontSize: 14
  }
});

class Influencers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedView: "row",
      rowHover: 0
    };
    this.handleSelectView = this.handleSelectView.bind(this);
    this.handleHoverRow = this.handleHoverRow.bind(this);
    this.handleUnHoverRow = this.handleUnHoverRow.bind(this);
  }

  handleSelectView = view => {
    this.setState({
      selectedView: view
    });
  };

  handleHoverRow = id => {
    this.setState({
      rowHover: id
    });
  };

  handleUnHoverRow = () => {
    this.setState({
      rowHover: 0
    });
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.wrapper}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container className={classes.topNavbar} maxWidth="100%">
            <Grid container className={classes.root}>
              <Grid item md={12} sm={12} xs={12}>
                <Paper className={classes.topNavbarPaper}>
                  <div className={classes.topNavbarTitleBox}>
                    <Typography
                      variant="h1"
                      className={classes.topNavbarTitleText}
                    >
                      افراد مؤثر شبکه‌های اجتماعی
                    </Typography>
                  </div>
                  <div className={classes.topNavbarMeta}>
                    <Button className={classes.instagramIconBtn}>
                      <i className="fab fa-instagram"></i>
                    </Button>
                    <Button className={classes.twitterIconBtn}>
                      <i className="fab fa-twitter"></i>
                    </Button>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="md">
            <Grid
              container
              className={classNames(classes.root, classes.groupsContainer)}
              spacing={2}
            >
              <Grid item md={9} sm={12} xs={12}>
                <Paper className={classes.chartPaper}>
                  <div className={classes.paperHeader}>
                    <Typography variant="h6" className={classes.headerText}>
                      موضوع‌ها
                    </Typography>
                    <div className={classes.paperHeaderGuideIcon}>
                      <BootstrapTooltip
                        placement="top"
                        title="موضوعات مرتبط با ردیاب انتخابی که نشان دهنده تاثیرپذیری یک متن تستی برای نمایش این قابلیت است و باید توضیحات هر سکشن در این قسمت نمایش داده شود."
                      >
                        <i className="far fa-lightbulb fa-lg"></i>
                      </BootstrapTooltip>
                    </div>
                  </div>
                  <Divider variant="fullWidth" className={classes.dividerM} />
                  <Grid container className={classes.root}>
                    <Grid item md={12} sm={12} xs={12}>
                      <Table className={classes.table} stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="right"
                              className={classNames(
                                classes.tableCellLowPadding,
                                classes.tableHeader
                              )}
                              style={{width: "20%"}}
                            >
                              نام دسته
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(
                                classes.tableCellLowPadding,
                                classes.tableHeader
                              )}
                              style={{width: "10%"}}
                            >
                              پست‌ها
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(
                                classes.tableCellLowPadding,
                                classes.tableHeader
                              )}
                              style={{width: "10%"}}
                            >
                              مجموع لایک
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(
                                classes.tableCellLowPadding,
                                classes.tableHeader
                              )}
                              style={{width: "10%"}}
                            >
                              متوسط لایک
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(
                                classes.tableCellLowPadding,
                                classes.tableHeader
                              )}
                              style={{width: "10%"}}
                            >
                              مجموع کامنت
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(
                                classes.tableCellLowPadding,
                                classes.tableHeader
                              )}
                              style={{width: "10%"}}
                            >
                              متوسط کامنت
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(
                                classes.tableCellLowPadding,
                                classes.tableHeader
                              )}
                              style={{width: "10%"}}
                            >
                              حساب‌های مؤثر
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(
                                classes.tableCellLowPadding,
                                classes.tableHeader
                              )}
                              style={{width: "10%"}}
                            >
                              حس متن
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(
                                classes.tableCellLowPadding,
                                classes.tableHeader
                              )}
                              style={{width: "10%"}}
                            >
                              حس کامنت
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.props.groups.map(row => (
                            <TableRow
                              key={row.id}
                              className={classNames(
                                classes.tableCellLowPadding,
                                classes.tableRow,
                                this.props.selectedGroup == row.id
                                  ? classes.selectedGroup
                                  : ""
                              )}
                              onMouseEnter={() => this.handleHoverRow(row.id)}
                              onMouseLeave={() => this.handleUnHoverRow()}
                              onClick={id => this.props.selectGroup(row.id)}
                            >
                              <TableCell
                                style={{width: "20%"}}
                                className={classNames(
                                  classes.tableCellLowPadding,
                                  classes.flex
                                )}
                                // padding="none"
                                align="right"
                              >
                                {row.name}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{width: "10%"}}
                                className={classNames(
                                  classes.tableCellLowPadding,
                                  this.state.rowHover != row.id &&
                                    this.props.selectedGroup != row.id
                                    ? classes.textMute
                                    : ""
                                )}
                              >
                                {row.posts}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{width: "10%"}}
                                className={classNames(
                                  classes.tableCellLowPadding,
                                  this.state.rowHover != row.id &&
                                    this.props.selectedGroup != row.id
                                    ? classes.textMute
                                    : ""
                                )}
                              >
                                {row.overall_likes}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{width: "10%"}}
                                className={classNames(
                                  classes.tableCellLowPadding,
                                  this.state.rowHover != row.id &&
                                    this.props.selectedGroup != row.id
                                    ? classes.textMute
                                    : ""
                                )}
                              >
                                {row.average_likes}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{width: "10%"}}
                                className={classNames(
                                  classes.tableCellLowPadding,
                                  this.state.rowHover != row.id &&
                                    this.props.selectedGroup != row.id
                                    ? classes.textMute
                                    : ""
                                )}
                              >
                                {row.overall_comments}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{width: "10%"}}
                                className={classNames(
                                  classes.tableCellLowPadding,
                                  this.state.rowHover != row.id &&
                                    this.props.selectedGroup != row.id
                                    ? classes.textMute
                                    : ""
                                )}
                              >
                                {row.average_comments}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{width: "10%"}}
                                className={classNames(
                                  classes.tableCellLowPadding,
                                  this.state.rowHover != row.id &&
                                    this.props.selectedGroup != row.id
                                    ? classes.textMute
                                    : ""
                                )}
                              >
                                {row.effective_accounts}
                              </TableCell>
                              <TableCell align="center" style={{width: "10%"}}>
                                {row.content_emotion == -1 ? (
                                  <div
                                    className={classNames(
                                      classes.tableCellLowPadding,
                                      this.props.selectedEmotion == "negative"
                                        ? classes.selectedNegativeEmotion
                                        : classes.negativeEmotion
                                    )}
                                  ></div>
                                ) : (
                                  <div
                                    className={classNames(
                                      classes.tableCellLowPadding,
                                      this.props.selectedEmotion == "positive"
                                        ? classes.selectedPositiveEmotion
                                        : classes.positiveEmotion
                                    )}
                                  ></div>
                                )}
                              </TableCell>
                              <TableCell align="center" style={{width: "10%"}}>
                                {row.comment_emotion == -1 ? (
                                  <div
                                    className={classNames(
                                      classes.tableCellLowPadding,
                                      this.props.selectedEmotion == "negative"
                                        ? classes.selectedNegativeEmotion
                                        : classes.negativeEmotion
                                    )}
                                  ></div>
                                ) : (
                                  <div
                                    className={classNames(
                                      classes.tableCellLowPadding,
                                      this.props.selectedEmotion == "positive"
                                        ? classes.selectedPositiveEmotion
                                        : classes.positiveEmotion
                                    )}
                                  ></div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <Paper
                  className={classNames(
                    classes.relatedsPaper,
                    classes.chartPaper
                  )}
                >
                  <div className={classes.paperHeader}>
                    <Typography variant="h6" className={classes.title}>
                      لفظ‌های مرتبط با{" "}
                      <span className={classes.selectedKeyword}>
                        {this.props.groups.map(item => {
                          if (item.id == this.props.selectedGroup) {
                            return "" + item.name;
                          }
                        })}
                      </span>
                    </Typography>
                    <div className={classes.paperHeaderGuideIcon}>
                      <BootstrapTooltip
                        placement="top"
                        title="موضوعات مرتبط با ردیاب انتخابی که نشان دهنده تاثیرپذیری یک متن تستی برای نمایش این قابلیت است و باید توضیحات هر سکشن در این قسمت نمایش داده شود."
                      >
                        <i className="far fa-lightbulb fa-lg"></i>
                      </BootstrapTooltip>
                    </div>
                  </div>
                  <Divider variant="fullWidth" className={classes.dividerM} />
                  <div className={classes.fieldsContent}>
                    <List
                      component="div"
                      disablePadding
                      // className={classes.relateds}
                    >
                      {this.props.influencers.map((row, index) => {
                        return (
                          <ListItem
                            className={classNames(
                              classes.relateds,
                              classes.listItem
                            )}
                            key={index}
                          >
                            <Grid
                              container
                              className={classes.root}
                              spacing={1}
                            >
                              <Grid
                                item
                                md={3}
                                sm={3}
                                xs={3}
                                className={classes.tableUsernamePart}
                              >
                                <Avatar
                                  alt="Remy Sharp"
                                  src="https://material-ui.com/static/images/avatar/1.jpg"
                                  className={classes.avatar}
                                />
                                <span className={classes.twtterIconAvatar}>
                                  <i className="fab fa-twitter fa-sm"></i>
                                </span>
                              </Grid>
                              <Grid
                                item
                                md={9}
                                sm={9}
                                xs={9}
                                className={classes.tableUsernamePart}
                              >
                                <span>{row.name}</span>
                                <span className={classes.textMute}>
                                  @{row.username}
                                </span>
                              </Grid>
                            </Grid>
                          </ListItem>
                        );
                      })}
                    </List>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Grid container className={classes.root}>
              <Grid item md={12} sm={12} xs={12}>
                <Paper
                  className={classNames(
                    classes.paper,
                    classes.columnPaper,
                    classes.postsPaper
                  )}
                >
                  <div className={classes.paperHeader}>
                    <Typography variant="h6" className={classes.headerText}>
                      پست‌های مرتبط با{" "}
                      <span className={classes.selectedKeyword}>
                        {this.props.groups.map(item => {
                          if (item.id == this.props.selectedGroup) {
                            return "" + item.name;
                          }
                        })}
                      </span>
                    </Typography>
                    <div className={classes.paperHeaderGuideIcon}>
                      <BootstrapTooltip
                        placement="top"
                        title="موضوعات مرتبط با ردیاب انتخابی که نشان دهنده تاثیرپذیری یک متن تستی برای نمایش این قابلیت است و باید توضیحات هر سکشن در این قسمت نمایش داده شود."
                      >
                        <i className="far fa-lightbulb fa-lg"></i>
                      </BootstrapTooltip>
                    </div>
                  </div>
                  <Divider variant="fullWidth" className={classes.dividerM} />
                  <Grid container className={classes.root}>
                    <Grid item md={12} className={classes.actions}>
                      <input
                        type="text"
                        className={classes.searchInput}
                        placeholder="هشتگ و کلمات کلیدی"
                      />
                      <Button className={classes.searchIconBtn}>
                        <i className="fa fa-search fa-lg"></i>
                      </Button>

                      <Divider
                        orientation="vertical"
                        className={classes.searchDivider}
                      />
                      <div className={classes.sortBtnContainer}>
                        <Button color="primary" className={classes.sortBtn}>
                          مرتب‌سازی
                          <div className={classes.sortIcon}>
                            <i className="fas fa-chevron-down" />
                          </div>
                        </Button>
                      </div>
                      <div color="primary" className={classes.selectTableView}>
                        <Button
                          className={classNames(
                            classes.selectTableViewIcon,
                            "" +
                              (this.state.selectedView == "row"
                                ? classes.selectedView
                                : "")
                          )}
                          onClick={() => this.handleSelectView("row")}
                        >
                          <ViewStreamOutlinedIcon />
                        </Button>
                        <Button
                          className={classNames(
                            classes.selectTableViewIcon,
                            "" +
                              (this.state.selectedView == "grid"
                                ? classes.selectedView
                                : "")
                          )}
                          onClick={() => this.handleSelectView("grid")}
                        >
                          <ViewModuleOutlinedIcon />
                        </Button>
                      </div>
                    </Grid>
                    <Divider
                      variant="fullWidth"
                      className={classes.dividerFW}
                    />
                    {this.state.selectedView == "row" ? (
                      <ListPosts />
                    ) : (
                      <GridPosts />
                    )}
                  </Grid>
                </Paper>
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
    groups: state.groups,
    keywords: state.keywords,
    selectedGroup: state.selectedGroup,
    influencers: state.influencers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectGroup: id => dispatch(selectGroup(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Influencers));
