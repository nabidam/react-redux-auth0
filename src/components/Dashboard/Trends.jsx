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
  Tooltip as MTooltip,
  Popover
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
import CheckIcon from "@material-ui/icons/Check";

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
  defaultIconBtn: {
    color: "#fff",
    backgroundColor: "#adb2b9",
    minWidth: 44,
    height: 44,
    borderRadius: 22,
    margin: "0px 10px",
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    "&:hover": {
      opacity: 0.7
    }
  },
  instagramIconBtn: {
    color: "#fff",
    backgroundColor: "#da2b72",
    minWidth: 44,
    height: 44,
    borderRadius: 22,
    margin: "0px 10px",
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
    width: "100%"
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
    height: 88,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#f2f3fb"
    }
  },
  trendsPaper: {
    display: "flex",
    padding: "15px 20px"
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
  },
  metaDivider: {
    height: 20,
    width: 1,
    color: "#e4e8ed",
    margin: "0px 17px"
  },
  selectDateRange: {
    fontSize: 12,
    margin: theme.spacing(1),
    // margin: 8,
    paddingRight: 19,
    width: 156,
    backgroundColor: "#edf1f6",
    color: "#08080d",
    height: 44,
    borderRadius: 22,
    justifyContent: "right"
    // "&:hover": {
    //   backgroundColor: "#0500cb"
    // }
  },
  selectDateRangeIcon: {
    display: "flex",
    position: "absolute",
    left: "19px"
  },
  cellLowPadding: {
    paddingRight: 0
    // paddingLeft: 4
  },
  imageGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  rightImage: {
    width: 20,
    height: 20,
    position: "absolute",
    right: -10,
    borderRadius: "50%",
    zIndex: 1
  },
  midImage: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    zIndex: 2
  },
  leftImage: {
    width: 20,
    height: 20,
    position: "absolute",
    left: -10,
    borderRadius: "50%",
    zIndex: 1
  },
  relatedWords: {
    display: "flex",
    alignItems: "center",
    flexFlow: "wrap"
  },
  relatedWord: {
    backgroundColor: "#edf1f6",
    borderRadius: 3,
    height: 24,
    margin: "2px 7px",
    padding: "0px 6px",
    fontSize: 10,
    alignItems: "center",
    display: "flex"
  },
  metaIcon: {
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
  }
  // listItem: {
  //   heigth: 44,
  //   width: 226,
  //   "&:hover": {
  //     color: "#4753ff",
  //     cursor: "pointer"
  //   }
  // }
});

class Trends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedView: "row",
      rowHover: 0,
      openInitiator: 0,
      openInfluencer: 0,
      openInitiatorAnchorEl: null,
      openInfluencerAnchorEl: null,
      twitter: 1,
      instagram: 0
    };
    this.handleHoverRow = this.handleHoverRow.bind(this);
    this.handleUnHoverRow = this.handleUnHoverRow.bind(this);
    this.handleInitiatorClick = this.handleInitiatorClick.bind(this);
    this.handleInfluencerClick = this.handleInfluencerClick.bind(this);
    this.handleCloseInitiators = this.handleCloseInitiators.bind(this);
    this.handleCloseInfluencers = this.handleCloseInfluencers.bind(this);
    this.handleTwitterClick = this.handleTwitterClick.bind(this);
    this.handleInstagramClick = this.handleInstagramClick.bind(this);
  }

  handleInitiatorClick = (initiator, event) => {
    this.setState({
      openInitiator: initiator,
      openInitiatorAnchorEl: event.currentTarget
    });
  };

  handleInfluencerClick = (influencer, event) => {
    this.setState({
      openInfluencer: influencer,
      openInfluencerAnchorEl: event.currentTarget
    });
  };

  handleCloseInitiators = () => {
    this.setState({
      openInitiator: 0,
      openInitiatorAnchorEl: null
    });
  };

  handleCloseInfluencers = () => {
    this.setState({
      openInfluencer: 0,
      openInfluencerAnchorEl: null
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
          <Container className={classes.topNavbar} maxWidth="100%">
            <Grid container className={classes.root}>
              <Grid item md={12} sm={12} xs={12}>
                <Paper className={classes.topNavbarPaper}>
                  <div className={classes.topNavbarTitleBox}>
                    <Typography
                      variant="h1"
                      className={classes.topNavbarTitleText}
                    >
                      ترند شبکه‌های اجتماعی
                    </Typography>
                  </div>
                  <div className={classes.topNavbarMeta}>
                    <div className={classes.metaIcon}>
                      <Button
                        className={
                          this.state.instagram
                            ? classes.instagramIconBtn
                            : classes.defaultIconBtn
                        }
                        onClick={() => this.handleInstagramClick()}
                      >
                        <i className="fab fa-instagram"></i>
                      </Button>
                      {this.state.instagram ? (
                        <span className={classes.checkIconTiny}>
                          <CheckIcon style={{fontSize: "0.9rem"}} />
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className={classes.metaIcon}>
                      <Button
                        className={
                          this.state.twitter
                            ? classes.twitterIconBtn
                            : classes.defaultIconBtn
                        }
                        onClick={() => this.handleTwitterClick()}
                      >
                        <i className="fab fa-twitter"></i>
                      </Button>
                      {this.state.twitter ? (
                        <span className={classes.checkIconTiny}>
                          <CheckIcon style={{fontSize: "0.9rem"}} />
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <Divider
                      orientation="vertical"
                      className={classes.metaDivider}
                    />
                    <Button color="primary" className={classes.selectDateRange}>
                      ۱۹ مرداد
                      <div className={classes.selectDateRangeIcon}>
                        <i className="fas fa-chevron-down" />
                      </div>
                    </Button>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="md">
            <Grid container className={classes.root}>
              <Grid item md={12} sm={12} xs={12}>
                <Paper
                  className={classNames(
                    classes.paper,
                    classes.columnPaper,
                    classes.trendsPaper
                  )}
                >
                  <div className={classes.paperHeader}>
                    <Typography variant="h6" className={classes.headerText}>
                      ترند توییتر در ۱۹ مرداد
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
                  <Grid container className={classes.root}>
                    <Divider
                      variant="fullWidth"
                      className={classes.dividerFW}
                    />
                    <Grid item md={12} className={classes.tableGrid}>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="right"
                              className={classNames(
                                classes.tableHeader,
                                classes.cellLowPadding
                              )}
                              style={{paddingRight: 0}}
                            >
                              #
                            </TableCell>
                            <TableCell
                              align="right"
                              className={classNames(classes.tableHeader)}
                              style={{paddingRight: 4}}
                            >
                              ترند
                            </TableCell>
                            <TableCell
                              align="right"
                              className={classNames(classes.tableHeader)}
                              style={{paddingRight: 4}}
                            >
                              پست‌ها
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(classes.tableHeader)}
                              style={{paddingRight: 4}}
                            >
                              حساب‌ها
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(classes.tableHeader)}
                              style={{paddingRight: 4}}
                            >
                              مجموع لایک
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(classes.tableHeader)}
                              style={{paddingRight: 4}}
                            >
                              مجموع کامنت
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(classes.tableHeader)}
                              style={{padding: "0px 25px"}}
                            >
                              افراد آغازگر
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(classes.tableHeader)}
                              style={{padding: "0px 25px"}}
                            >
                              افراد مؤثر
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(classes.tableHeader)}
                            >
                              حس متن
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classNames(classes.tableHeader)}
                            >
                              حس کامنت
                            </TableCell>
                            <TableCell
                              align="right"
                              className={classNames(classes.tableHeader)}
                            >
                              الفاظ مرتبط
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.props.trends.map((row, index) => (
                            <TableRow key={row.id} className={classes.tableRow}>
                              <TableCell
                                className={classNames(
                                  classes.flex,
                                  classes.cellLowPadding
                                )}
                                // padding="none"
                                align="center"
                                style={{paddingRight: 0}}
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell
                                className={classNames(
                                  classes.flex,
                                  classes.cellLowPadding
                                )}
                                align="center"
                              >
                                {row.name}
                              </TableCell>
                              <TableCell
                                className={classNames(
                                  classes.flex,
                                  classes.cellLowPadding,
                                  classes.textMute
                                )}
                                align="center"
                              >
                                {row.posts}
                              </TableCell>
                              <TableCell
                                className={classNames(
                                  classes.flex,
                                  classes.cellLowPadding,
                                  classes.textMute
                                )}
                                align="center"
                              >
                                {row.accounts}
                              </TableCell>
                              <TableCell
                                className={classNames(
                                  classes.flex,
                                  classes.cellLowPadding,
                                  classes.textMute
                                )}
                                align="center"
                              >
                                {row.likes}
                              </TableCell>
                              <TableCell
                                className={classNames(
                                  classes.flex,
                                  classes.cellLowPadding,
                                  classes.textMute
                                )}
                                align="center"
                              >
                                {row.comments}
                              </TableCell>
                              <TableCell
                                className={classNames(classes.flex)}
                                align="center"
                                style={{padding: "0px 25px"}}
                              >
                                <div
                                  className={classes.imageGroup}
                                  onClick={
                                    (row.id,
                                    event =>
                                      this.handleInitiatorClick(row.id, event))
                                  }
                                >
                                  <img
                                    src="https://picsum.photos/id/159/100/100"
                                    className={classes.rightImage}
                                  />
                                  <img
                                    src="https://picsum.photos/id/158/100/100"
                                    className={classes.midImage}
                                  />
                                  <img
                                    src="https://picsum.photos/id/157/100/100"
                                    className={classes.leftImage}
                                  />
                                </div>
                                <Popover
                                  open={this.state.openInitiator > 0}
                                  onClose={() => this.handleCloseInitiators()}
                                  id={this.state.openInitiator}
                                  anchorEl={this.state.openInitiatorAnchorEl}
                                  elevation="3"
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center"
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center"
                                  }}
                                >
                                  <List>
                                    {row.initiators.map(item => {
                                      return (
                                        <ListItem className={classes.listItem}>
                                          <Grid
                                            container
                                            className={classes.root}
                                            spacing={1}
                                          >
                                            <Grid
                                              item
                                              md={4}
                                              sm={4}
                                              xs={4}
                                              className={
                                                classes.tableUsernamePart
                                              }
                                            >
                                              <Avatar
                                                alt="Remy Sharp"
                                                src="https://material-ui.com/static/images/avatar/1.jpg"
                                                className={classes.avatar}
                                              />
                                              <span
                                                className={
                                                  classes.twtterIconAvatar
                                                }
                                              >
                                                <i className="fab fa-twitter fa-sm"></i>
                                              </span>
                                            </Grid>
                                            <Grid
                                              item
                                              md={8}
                                              sm={8}
                                              xs={8}
                                              className={
                                                classes.tableUsernamePart
                                              }
                                            >
                                              <span>{item.name}</span>
                                              <span
                                                className={classes.textMute}
                                              >
                                                @{item.username}
                                              </span>
                                            </Grid>
                                          </Grid>
                                        </ListItem>
                                      );
                                    })}
                                  </List>
                                </Popover>
                              </TableCell>
                              <TableCell
                                className={classNames(classes.flex)}
                                align="center"
                                style={{padding: "0px 25px"}}
                              >
                                <div
                                  className={classes.imageGroup}
                                  onClick={
                                    (row.id,
                                    event =>
                                      this.handleInfluencerClick(row.id, event))
                                  }
                                >
                                  <img
                                    src="https://picsum.photos/id/156/100/100"
                                    className={classes.rightImage}
                                  />
                                  <img
                                    src="https://picsum.photos/id/155/100/100"
                                    className={classes.midImage}
                                  />
                                  <img
                                    src="https://picsum.photos/id/154/100/100"
                                    className={classes.leftImage}
                                  />
                                </div>
                                <Popover
                                  open={this.state.openInfluencer > 0}
                                  onClose={() => this.handleCloseInfluencers()}
                                  id={this.state.openInfluencer}
                                  anchorEl={this.state.openInfluencerAnchorEl}
                                  elevation="3"
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center"
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center"
                                  }}
                                >
                                  <List>
                                    {row.influencers.map(item => {
                                      return (
                                        <ListItem className={classes.listItem}>
                                          <Grid
                                            container
                                            className={classes.root}
                                            spacing={1}
                                          >
                                            <Grid
                                              item
                                              md={4}
                                              sm={4}
                                              xs={4}
                                              className={
                                                classes.tableUsernamePart
                                              }
                                            >
                                              <Avatar
                                                alt="Remy Sharp"
                                                src="https://material-ui.com/static/images/avatar/1.jpg"
                                                className={classes.avatar}
                                              />
                                              <span
                                                className={
                                                  classes.twtterIconAvatar
                                                }
                                              >
                                                <i className="fab fa-twitter fa-sm"></i>
                                              </span>
                                            </Grid>
                                            <Grid
                                              item
                                              md={8}
                                              sm={8}
                                              xs={8}
                                              className={
                                                classes.tableUsernamePart
                                              }
                                            >
                                              <span>{item.name}</span>
                                              <span
                                                className={classes.textMute}
                                              >
                                                @{item.username}
                                              </span>
                                            </Grid>
                                          </Grid>
                                        </ListItem>
                                      );
                                    })}
                                  </List>
                                </Popover>
                              </TableCell>
                              <TableCell
                                className={classNames(classes.flex)}
                                align="center"
                              >
                                {row.content_emotion == -1 ? (
                                  <div
                                    className={
                                      this.props.selectedEmotion == "negative"
                                        ? classes.selectedNegativeEmotion
                                        : classes.negativeEmotion
                                    }
                                  ></div>
                                ) : (
                                  <div
                                    className={
                                      this.props.selectedEmotion == "positive"
                                        ? classes.selectedPositiveEmotion
                                        : classes.positiveEmotion
                                    }
                                  ></div>
                                )}
                              </TableCell>
                              <TableCell
                                className={classNames(classes.flex)}
                                align="center"
                              >
                                {row.comment_emotion == -1 ? (
                                  <div
                                    className={
                                      this.props.selectedEmotion == "negative"
                                        ? classes.selectedNegativeEmotion
                                        : classes.negativeEmotion
                                    }
                                  ></div>
                                ) : (
                                  <div
                                    className={
                                      this.props.selectedEmotion == "positive"
                                        ? classes.selectedPositiveEmotion
                                        : classes.positiveEmotion
                                    }
                                  ></div>
                                )}
                              </TableCell>
                              <TableCell
                                className={classNames(
                                  classes.flex,
                                  classes.cellLowPadding
                                )}
                                align="right"
                              >
                                <div className={classes.relatedWords}>
                                  {row.related_words.map(word => {
                                    return (
                                      <span className={classes.relatedWord}>
                                        {word}
                                      </span>
                                    );
                                  })}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
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

Trends.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    latestQueries: state.latestQueries,
    selectedQuery: state.selectedQuery,
    groups: state.groups,
    keywords: state.keywords,
    selectedGroup: state.selectedGroup,
    influencers: state.influencers,
    trends: state.trends
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedQuery: id => dispatch(changeSelectedQuery(id)),
    selectAnalysisType: type => dispatch(selectAnalysisType(type)),
    changeAnalysisStatus: analysis => dispatch(changeAnalysisStatus(analysis)),
    selectGroup: id => dispatch(selectGroup(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Trends));
