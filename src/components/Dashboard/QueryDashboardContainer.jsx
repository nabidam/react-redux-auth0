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
  Popover
} from "@material-ui/core";
import Slider from "@material-ui/lab/Slider";
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
  Label,
  Tooltip,
  Cell,
  AreaChart,
  Area,
  // PieChart,
  Pie,
  linearGradient
} from "recharts";
import {connect} from "react-redux";
import changeSelectedQuery from "../../actions/changeSelectedQuery";
import ReactExport from "react-data-export";
import LatestQueriesPDF from "./LatestQueriesPDF";
import moment from "moment";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import BootstrapTooltip from "./BSTooltip";
import ReactWordcloud from "react-wordcloud";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CheckIcon from "@material-ui/icons/Check";
import QueriesWordsCloud from "./QueriesWordsCloud";
import PieChart from "./PieChart";
import CustomizedActiveDot from "./CustomizedActiveDot";
import CustomizedTooltip from "./CustomizedTooltip";
import PostsChart from "./PostsChart";
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
  root: {
    display: "flex",
    flexGrow: 1,
    marginBottom: 20
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
    color: "#adb2b9",
    fontSize: 10
  },
  topNavbarSelectedQuery: {
    color: "#08080d",
    fontSize: 32
  },
  topNavbarMeta: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
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

  chartContainer: {
    paddingRight: 50,
    paddingLeft: 50,
    paddingBottom: 20
  },
  chartBox: {
    height: 150
  },
  avatar: {
    width: 30,
    height: 30,
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
  content: {
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
    paddingRight: 36,
    paddingLeft: 36
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
    alignItems: "center"
  },
  tabs: {
    display: "flex",
    width: "75%",
    margin: "0px auto"
  },
  listItem: {
    heigth: 44,
    width: 226,
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
    "&::after": {
      content: `""`,
      position: "absolute",
      bottom: 0,
      left: "50%",
      width: 6,
      height: 6,
      background: "#4753ff",
      borderRadius: "50%"
    }
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
    border: "1px solid #979797",
    "&:hover": {
      borderColor: "#4753ff",
      color: "#4753ff"
    }

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
    width: 250
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
      border: "solid 5px rgba(255, 255, 255, 0.85)",
      background: "#ec373c",
      borderRadius: "50%"
    }
  },
  negativeText: {
    fontSize: 10
  },
  neutralEmotion: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  neutralPercent: {
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
      border: "solid 5px rgba(255, 255, 255, 0.85)",
      background: "#4a90e2",
      borderRadius: "50%"
    }
  },
  neutralText: {
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
      border: "solid 5px rgba(255, 255, 255, 0.85)",
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
    border: "1px solid #979797",
    "&:hover": {
      borderColor: "#4753ff",
      color: "#4753ff"
    }

    // "&:hover": {
    //   backgroundColor: "#0500cb"
    // }
  },
  showTextEmotionIcon: {
    display: "flex",
    position: "absolute",
    left: "19px"
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
  pieChart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }
});

const emotionDatas = [
  {
    name: "حس منفی",
    value: 32,
    color: "#ec373c",
    posts: 457
  },
  {
    name: "حس خنثی",
    value: 28,
    color: "#4a90e2",
    posts: 457
  },
  {
    name: "حس مثبت",
    value: 40,
    color: "#03d588",
    posts: 457
  }
];

const data = [
  {
    date: moment()
      .subtract(29, "days")
      .format("MMM Do"),
    posts: 100,
    dayOfMonth: 1,
    color: "#a9da79"
  },
  {
    date: moment()
      .subtract(28, "days")
      .format("MMM Do"),
    posts: 150,
    dayOfMonth: 2,
    color: "#95eb56"
  },
  {
    date: moment()
      .subtract(27, "days")
      .format("MMM Do"),
    posts: 200,
    dayOfMonth: 3,
    color: "#91dde2"
  },
  {
    date: moment()
      .subtract(26, "days")
      .format("MMM Do"),
    posts: 321,
    dayOfMonth: 4,
    color: "#0a1b35"
  },
  {
    date: moment()
      .subtract(25, "days")
      .format("MMM Do"),
    posts: 100,
    dayOfMonth: 5,
    color: "#e9432f"
  },
  {
    date: moment()
      .subtract(24, "days")
      .format("MMM Do"),
    posts: 533,
    dayOfMonth: 6,
    color: "#72e25f"
  },
  {
    date: moment()
      .subtract(23, "days")
      .format("MMM Do"),
    posts: 423,
    dayOfMonth: 7,
    color: "#8b8bf6"
  },
  {
    date: moment()
      .subtract(22, "days")
      .format("MMM Do"),
    posts: 324,
    dayOfMonth: 8,
    color: "#b2ab52"
  },
  {
    date: moment()
      .subtract(21, "days")
      .format("MMM Do"),
    posts: 423,
    dayOfMonth: 9,
    color: "#c35fd5"
  },
  {
    date: moment()
      .subtract(20, "days")
      .format("MMM Do"),
    posts: 312,
    dayOfMonth: 10,
    color: "#39c4e3"
  },
  {
    date: moment()
      .subtract(19, "days")
      .format("MMM Do"),
    posts: 123,
    dayOfMonth: 11,
    color: "#e03673"
  },
  {
    date: moment()
      .subtract(18, "days")
      .format("MMM Do"),
    posts: 253,
    dayOfMonth: 12,
    color: "#36fb59"
  },
  {
    date: moment()
      .subtract(17, "days")
      .format("MMM Do"),
    posts: 397,
    dayOfMonth: 13,
    color: "#c80b8a"
  },
  {
    date: moment()
      .subtract(16, "days")
      .format("MMM Do"),
    posts: 456,
    dayOfMonth: 14,
    color: "#67df60"
  },
  {
    date: moment()
      .subtract(15, "days")
      .format("MMM Do"),
    posts: 575,
    dayOfMonth: 15,
    color: "#9bcc4c"
  },
  {
    date: moment()
      .subtract(14, "days")
      .format("MMM Do"),
    posts: 423,
    dayOfMonth: 16,
    color: "#78bef0"
  },
  {
    date: moment()
      .subtract(13, "days")
      .format("MMM Do"),
    posts: 100,
    dayOfMonth: 17,
    color: "#dcffaa"
  },
  {
    date: moment()
      .subtract(12, "days")
      .format("MMM Do"),
    posts: 222,
    dayOfMonth: 18,
    color: "#a9da79"
  },
  {
    date: moment()
      .subtract(11, "days")
      .format("MMM Do"),
    posts: 321,
    dayOfMonth: 19,
    color: "#91dde2"
  },
  {
    date: moment()
      .subtract(10, "days")
      .format("MMM Do"),
    posts: 123,
    dayOfMonth: 20,
    color: "#0a1b35"
  },
  {
    date: moment()
      .subtract(9, "days")
      .format("MMM Do"),
    posts: 99,
    dayOfMonth: 21,
    color: "#e9432f"
  },
  {
    date: moment()
      .subtract(8, "days")
      .format("MMM Do"),
    posts: 654,
    dayOfMonth: 22,
    color: "#72e25f"
  },
  {
    date: moment()
      .subtract(7, "days")
      .format("MMM Do"),
    posts: 122,
    dayOfMonth: 23,
    color: "#8b8bf6"
  },
  {
    date: moment()
      .subtract(6, "days")
      .format("MMM Do"),
    posts: 344,
    dayOfMonth: 24,
    color: "#b2ab52"
  },
  {
    date: moment()
      .subtract(5, "days")
      .format("MMM Do"),
    posts: 244,
    dayOfMonth: 25,
    color: "#c35fd5"
  },
  {
    date: moment()
      .subtract(4, "days")
      .format("MMM Do"),
    posts: 354,
    dayOfMonth: 26,
    color: "#39c4e3"
  },
  {
    date: moment()
      .subtract(3, "days")
      .format("MMM Do"),
    posts: 421,
    dayOfMonth: 27,
    color: "#e03673"
  },
  {
    date: moment()
      .subtract(2, "days")
      .format("MMM Do"),
    posts: 124,
    dayOfMonth: 28,
    color: "#36fb59"
  },
  {
    date: moment()
      .subtract(1, "days")
      .format("MMM Do"),
    posts: 123,
    dayOfMonth: 29,
    color: "#36fb59"
  },
  {
    date: moment().format("MMM Do"),
    posts: 456,
    dayOfMonth: 30,
    color: "#36fb59"
  }
];

// const CustomTooltip = ({active, payload, label}) => {
//   if (active) {
//     return <div className="custom-tooltip">x</div>;
//   }

//   return null;
// };

class QueryDashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
      emotionDatas,
      queriesSliderValue: [1, 30],
      minSlider: 1,
      maxSlider: 40,
      selectedTab: "keyWords",
      selectedChartAction: "day",
      twitter: 1,
      instagram: 0,

      isCalenderOpen: false,
      calenderAnchorEl: null,

      selectedDay: {
        from: {
          year: 1398,
          month: 8,
          day: 1
        },
        to: {
          year: 1398,
          month: 8,
          day: 24
        }
      },
      isDaySelected: true
    };
    this.tooltip = null;
    this.tooltipQty = null;
    this.tooltipDate = null;
    this.tooltipContent = null;

    // this.onChartMouseMove = this.onChartMouseMove.bind(this);
    // this.onChartMouseLeave = this.onChartMouseLeave.bind(this);

    this.handleSelectTab = this.handleSelectTab.bind(this);
    this.handleSelectChartAction = this.handleSelectChartAction.bind(this);
    this.handleTwitterClick = this.handleTwitterClick.bind(this);
    this.handleInstagramClick = this.handleInstagramClick.bind(this);
  }

  handleSelectTab = tab => {
    this.setState({
      selectedTab: tab
    });
  };

  handleSelectChartAction = action => {
    this.setState({
      selectedChartAction: action
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

  // showToolTip = e => {
  //   let x = Math.round(e.cx);
  //   let y = Math.round(e.cy);
  //   this.tooltip.style.opacity = "1";
  //   this.tooltip.childNode[0].innerHTML = e.payload["value"];
  // };

  // hideTooltip = e => {
  //   this.tooltip.style.opacity = "0";
  // };

  // onChartMouseMove(chart) {
  //   if (chart.isTooltipActive) {
  //     let point = this.area.props.points[chart.activeTooltipIndex];

  //     if (point != this.point) {
  //       this.point = point;
  //       this.updateTooltip();
  //     }
  //   }
  // }

  // onChartMouseLeave() {
  //   this.point = null;
  //   this.updateTooltip();
  // }

  // updateTooltip() {
  //   if (this.point) {
  //     let x = Math.round(this.point.x);
  //     let y = Math.round(this.point.y);

  //     this.tooltip.style.opacity = "1";
  //     this.tooltip.style.transform = `translate(${x}px, ${y}px)`;
  //     this.tooltip.childNodes[0].innerHTML = this.point.payload["value"];
  //   } else {
  //     this.tooltip.style.opacity = "0";
  //   }
  // }

  customMouseOver = e => {
    let x = Math.round(e.cx);
    let y = Math.round(e.cy);
    this.tooltip.style.opacity = "1";
    this.tooltip.style.transform = `translate(${x + 49}px, ${y + 355}px)`;
    this.tooltipContent.innerHTML =
      "<p>" + e.payload["dayOfMonth"] + " تیر</p>";
    // console.log(this.area);
    // console.log(e.payload["dayOfMonth"]);
  };

  over = e => {
    this.tooltip.style.opacity = "0";
    // console.log("yy");
  };

  render() {
    const {classes} = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container className={classes.topNavbar}>
          <Grid container className={classes.root}>
            <Grid item md={12} sm={12} xs={12}>
              <Paper className={classes.topNavbarPaper}>
                <div className={classes.topNavbarTitleBox}>
                  <Typography
                    variant="body1"
                    className={classes.topNavbarTitleText}
                  >
                    ردیاب:
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.topNavbarSelectedQuery}
                  >
                    {this.props.queries.map((item, index) => {
                      return item.id == this.props.selectedQuery.id
                        ? item.name
                        : "";
                    })}
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
                  <Button
                    color="primary"
                    className={classes.selectDateRange}
                    onClick={event => this.handleCalenderClick(event)}
                  >
                    {this.state.isDaySelected == false
                      ? "انتخاب بازه زمانی"
                      : this.state.selectedDay.from.day +
                        " " +
                        months[this.state.selectedDay.from.month] +
                        " " +
                        " - " +
                        (this.state.selectedDay.to
                          ? this.state.selectedDay.to.day +
                            " " +
                            months[this.state.selectedDay.to.month] +
                            " "
                          : "")}
                    <div className={classes.selectDateRangeIcon}>
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
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.chartContainer}>
          <Grid container className={classes.root}>
            <Grid item md={12} sm={12} xs={12}>
              <Paper className={classes.chartPaper}>
                <Grid container className={classes.root}>
                  <Grid item md={12}>
                    <Paper className={classes.chartStatusPaper}>
                      <Grid container>
                        <Grid item md={3} className={classes.statusItem}>
                          <div className={classes.statusIcon}>
                            <ChatBubbleOutlineIcon fontSize="large" />
                          </div>
                          <div className={classes.statusText}>
                            3,157
                            <span className={classes.statusTextMute}>
                              پست‌ها
                            </span>
                          </div>
                        </Grid>
                        <Grid item md={3} className={classes.statusItem}>
                          <div className={classes.statusIcon}>
                            <PersonOutlineIcon fontSize="large" />
                          </div>
                          <div className={classes.statusText}>
                            2,988
                            <span className={classes.statusTextMute}>
                              حساب‌ها
                            </span>
                          </div>
                        </Grid>
                        <Grid item md={3} className={classes.statusItem}>
                          <div className={classes.statusIcon}>
                            <FavoriteBorderIcon fontSize="large" />
                          </div>
                          <div className={classes.statusText}>
                            765,456
                            <span className={classes.statusTextMute}>
                              لایک‌ها
                            </span>
                          </div>
                        </Grid>
                        <Grid item md={3} className={classes.statusItem}>
                          <div className={classes.statusIcon}>
                            <CommentIcon fontSize="large" />
                          </div>
                          <div className={classes.statusText}>
                            23,642
                            <span className={classes.statusTextMute}>
                              کامنت‌ها
                            </span>
                          </div>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid container className={classes.chartTitleContainer}>
                  <Grid item md={6} className={classes.chartTitle}>
                    <Typography
                      variant="subtitle1"
                      className={classes.chartTitleText}
                    >
                      پست‌های ارسالی مرتبط با ردیاب
                    </Typography>
                  </Grid>
                  <Grid item md={6} className={classes.chartTopActions}>
                    <List
                      component="div"
                      disablePadding
                      className={classes.chartActions}
                    >
                      <ListItem
                        className={classNames(
                          classes.listItem,
                          "" +
                            (this.state.selectedChartAction == "day"
                              ? classes.selectedChartAction
                              : "")
                        )}
                        onClick={() => this.handleSelectChartAction("day")}
                      >
                        <ListItemText
                          primary="روز"
                          className={classNames(classes.textCenter)}
                        />
                      </ListItem>
                      <ListItem
                        className={classNames(
                          classes.listItem,
                          "" +
                            (this.state.selectedChartAction == "week"
                              ? classes.selectedChartAction
                              : "")
                        )}
                        onClick={() => this.handleSelectChartAction("week")}
                      >
                        <ListItemText
                          primary="هفته"
                          className={classNames(classes.textCenter)}
                        />
                      </ListItem>
                      <ListItem
                        className={classNames(
                          classes.listItem,
                          "" +
                            (this.state.selectedChartAction == "month"
                              ? classes.selectedChartAction
                              : "")
                        )}
                        onClick={() => this.handleSelectChartAction("month")}
                      >
                        <ListItemText
                          primary="ماه"
                          className={classNames(classes.textCenter)}
                        />
                      </ListItem>
                      <ListItem
                        className={classNames(
                          classes.listItem,
                          "" +
                            (this.state.selectedChartAction == "year"
                              ? classes.selectedChartAction
                              : "")
                        )}
                        onClick={() => this.handleSelectChartAction("year")}
                      >
                        <ListItemText
                          primary="سال"
                          className={classNames(classes.textCenter)}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                <Grid container className={classes.chartBox}>
                  <Grid item md={12} className={classes.chart}>
                    {/* <div> */}
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                      className="left-to-right"
                    >
                      <AreaChart
                        height={150}
                        data={this.state.data.reverse()}
                        // onMouseMove={this.onChartMouseMove}
                        // onMouseLeave={this.onChartMouseLeave}
                      >
                        <defs>
                          <linearGradient
                            id="color"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#4753ff"
                              stopOpacity={1}
                            />
                            <stop
                              offset="95%"
                              stopColor="#4753ff"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="dayOfMonth">
                          <Label value="تیر" position="right" offset={10} />
                        </XAxis>
                        {/* <Tooltip /> */}
                        <Tooltip
                          cursor={false}
                          wrapperStyle={{display: "none"}}
                        />
                        <Area
                          type="monotone"
                          dataKey="posts"
                          stroke="#4753ff"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#color)"
                          ref={ref => (this.area = ref)}
                          activeDot={<CustomizedActiveDot />}
                          // activeDot={{
                          //   onMouseOver: e => this.customMouseOver(e),
                          //   onMouseLeave: this.over
                          // }}
                        />
                        <YAxis orientation="right" />
                      </AreaChart>
                    </ResponsiveContainer>
                    {/* <div
                        className="ui-chart-tooltip"
                        ref={ref => (this.tooltip = ref)}
                      >
                        <div className="ui-chart-tooltip-content"></div>
                      </div> */}
                    <div
                      className="ui-chart-tooltip"
                      ref={ref => (this.tooltip = ref)}
                    >
                      <div
                        className="ui-chart-tooltip-content"
                        ref={ref => (this.tooltipContent = ref)}
                      >
                        {/* <div className="tooltip-heading">1x1</div> */}
                      </div>
                    </div>
                    {/* </div> */}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid container className={classes.root} spacing={2}>
            <Grid item md={6} sm={12} xs={12}>
              <Paper
                className={classNames(
                  classes.paper,
                  classes.columnPaper,
                  classes.botPaper
                )}
              >
                <div className={classes.paperHeader}>
                  <Typography variant="h6" className={classes.headerText}>
                    موضوعات مربوط
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
                <Divider />
                <div className={classes.fieldsContent}>
                  <List component="div" disablePadding className={classes.tabs}>
                    <ListItem
                      className={classNames(
                        classes.listItem,
                        "" +
                          (this.state.selectedTab == "keyWords"
                            ? classes.selectedTab
                            : "")
                      )}
                      onClick={() => this.handleSelectTab("keyWords")}
                    >
                      <ListItemText
                        primary="کلمات کلیدی"
                        className={classNames(classes.textCenter)}
                      />
                    </ListItem>
                    <ListItem
                      className={classNames(
                        classes.listItem,
                        "" +
                          (this.state.selectedTab == "hashtags"
                            ? classes.selectedTab
                            : "")
                      )}
                      onClick={() => this.handleSelectTab("hashtags")}
                    >
                      <ListItemText
                        primary="هشتگ‌ها"
                        className={classNames(classes.textCenter)}
                      />
                    </ListItem>
                  </List>
                  {/* <ReactWordcloud
                    options={{
                      colors: ["#3340ff"],
                      rotations: 3,
                      rotationAngles: [0],
                      fontSizes: [10, 20],
                      fontWeight: "bold"
                    }}
                    words={this.state.words}
                  /> */}
                  <QueriesWordsCloud />
                  <Button color="primary" className={classes.showMoreFields}>
                    مشاهده تمام موضوعات مرتبط
                    <div className={classes.showMoreFieldsIcon}>
                      <i className="fas fa-chevron-left" />
                    </div>
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Paper
                className={classNames(
                  classes.paper,
                  classes.columnPaper,
                  classes.botPaper
                )}
              >
                <div className={classes.paperHeader}>
                  <Typography variant="h6" className={classes.headerText}>
                    احساس‌سنج
                  </Typography>
                  <div className={classes.paperHeaderGuideIcon}>
                    <BootstrapTooltip placement="top" title="احساس‌سنج">
                      <i className="far fa-lightbulb fa-lg"></i>
                    </BootstrapTooltip>
                  </div>
                </div>
                <Divider variant="fullWidth" />
                <div className={classes.pieChart}>
                  <PieChart
                    data={this.state.emotionDatas}
                    innerRadius={300}
                    outerRadius={400}
                    width={250}
                    height={250}
                  />
                </div>
                {/* <ResponsiveContainer
                  width="100%"
                  className={classes.leftToRight}
                >
                  <PieChart width={150}>
                    {emotionDatas.map((item, index) => {
                      const color = item.color;
                      return (
                        <defs key={index}>
                          <radialGradient
                            id={"color" + index}
                            x1="10"
                            y1="10"
                            x2="1"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor={color}
                              stopOpacity={0.5}
                            />
                            <stop
                              offset="10%"
                              stopColor={color}
                              stopOpacity={0.75}
                            />
                            <stop
                              offset="20%"
                              stopColor={color}
                              stopOpacity={1}
                            />
                          </radialGradient>
                        </defs>
                      );
                    })}
                    <Pie
                      data={this.state.emotionDatas}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={74}
                      fill="#82ca9d"
                      startAngle={90}
                      endAngle={450}
                    >
                      {emotionDatas.map((item, index) => {
                        const color = item.color;
                        return (
                          <Cell fill={"url(#color" + index + ")"} key={index} />
                        );
                      })}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer> */}
                <div className={classes.emotionsContent}>
                  <div className={classes.emotionStats}>
                    <div className={classes.negativeEmotion}>
                      <Typography
                        variant="body1"
                        className={classes.negativePercent}
                      >
                        {this.state.emotionDatas[0].value}%
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.negativeText}
                      >
                        {this.state.emotionDatas[0].name}
                      </Typography>
                    </div>
                    <div className={classes.neutralEmotion}>
                      <Typography
                        variant="body1"
                        className={classes.neutralPercent}
                      >
                        {this.state.emotionDatas[1].value}%
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.negativeText}
                      >
                        {this.state.emotionDatas[1].name}
                      </Typography>
                    </div>
                    <div className={classes.positiveEmotion}>
                      <Typography
                        variant="body1"
                        className={classes.positivePercent}
                      >
                        {this.state.emotionDatas[2].value}%
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.positiveText}
                      >
                        {this.state.emotionDatas[2].name}
                      </Typography>
                    </div>
                  </div>
                  <Button color="primary" className={classes.showTextEmotion}>
                    مشاهده احساس موجود در متن
                    <div className={classes.showTextEmotionIcon}>
                      <i className="fas fa-chevron-left" />
                    </div>
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    queries: state.queries,
    selectedQuery: state.selectedQuery,
    selectedQueryDashboardItem: state.selectedQueryDashboardItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedQuery: id => {
      dispatch(changeSelectedQuery(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(QueryDashboardContainer));
