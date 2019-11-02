import React, {unstable_Profiler} from "react";
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
import ViewStreamOutlinedIcon from "@material-ui/icons/ViewStreamOutlined";
import ViewModuleOutlinedIcon from "@material-ui/icons/ViewModuleOutlined";
import ListPosts from "./ListPosts";
import GridPosts from "./GridPosts";
import WorldMap from "./WorldMap";
import PieChart from "./PieChart";
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

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const drawerWidth = 240;

const dataSet1 = [
  {
    name: "Johson",
    amount: 30000,
    sex: "M",
    is_married: true
  },
  {
    name: "Monika",
    amount: 355000,
    sex: "F",
    is_married: false
  },
  {
    name: "John",
    amount: 250000,
    sex: "M",
    is_married: false
  },
  {
    name: "Josef",
    amount: 450500,
    sex: "M",
    is_married: true
  }
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
    width: 250
  },
  negativeEmotionBox: {
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
      borderRadius: "50%",
      border: "solid 5px rgba(255, 255, 255, 0.85)"
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

  postsPaper: {
    display: "flex",
    padding: "16px 36px"
  },
  dividerM: {
    margin: "15px 0px"
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

  locationsPaper: {
    height: 475
  },
  pieChart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },

  relatedsPaper: {
    height: "100%"
  },
  textRight: {
    textAlign: "right"
  },
  textLeft: {
    textLeft: "left"
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
    paddingTop: 0,
    paddingBottom: 0,
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
  textMute: {
    color: "#adb2b9"
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
  }
});

// const data = [
//   {
//     name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//   },
//   {
//     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//   },
//   {
//     name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//   },
//   {
//     name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//   },
//   {
//     name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//   },
//   {
//     name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//   },
// ];

const emotionDatas = [
  {
    name: "حس منفی",
    value: 32,
    color: "#ec373c",
    emotion: "negative",
    posts: 457
  },
  {
    name: "حس خنثی",
    value: 28,
    color: "#4a90e2",
    emotion: "neutral",
    posts: 457
  },
  {
    name: "حس مثبت",
    value: 40,
    color: "#03d588",
    emotion: "positive",
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

const words = [
  {
    text: "دونالد",
    value: 20
  },
  {
    text: "تحریم",
    value: 10
  },
  {
    text: "ظریف",
    value: 10
  },
  {
    text: "مردم",
    value: 13
  },
  {
    text: "آمریکا",
    value: 13
  },
  {
    text: "چین",
    value: 10
  },
  {
    text: "ایران",
    value: 8
  },
  {
    text: "تغییر",
    value: 13
  },
  {
    text: "خرید",
    value: 13
  },
  {
    text: "ما",
    value: 10
  },
  {
    text: "کاخ",
    value: 10
  },
  {
    text: "تعرفه",
    value: 10
  },
  {
    text: "جدید",
    value: 8
  },
  {
    text: "گفت",
    value: 10
  },
  {
    text: "رسانه",
    value: 10
  },
  {
    text: "گرینلند",
    value: 13
  }
];

const data01 = [
  {
    name: "Group A",
    value: 400
  },
  {
    name: "Group B",
    value: 300
  },
  {
    name: "Group C",
    value: 300
  },
  {
    name: "Group D",
    value: 200
  },
  {
    name: "Group E",
    value: 278
  },
  {
    name: "Group F",
    value: 189
  }
];

class QueryLocationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words,
      data,
      data01,
      emotionDatas,
      queriesSliderValue: [1, 30],
      minSlider: 1,
      maxSlider: 40,
      selectedTab: "keyWords",
      selectedView: "row",
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

    this.handleSelectTab = this.handleSelectTab.bind(this);
    this.handleTwitterClick = this.handleTwitterClick.bind(this);
    this.handleInstagramClick = this.handleInstagramClick.bind(this);
    this.handleSelectView = this.handleSelectView.bind(this);
  }

  handleSelectView = view => {
    this.setState({
      selectedView: view
    });
  };

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
          <Grid container className={classes.root} spacing={2}>
            <Grid item md={8} sm={12} xs={12}>
              <Paper
                className={classNames(
                  classes.chartPaper,
                  classes.locationsPaper
                )}
              >
                <div className={classes.paperHeader}>
                  <Typography variant="h6" className={classes.headerText}>
                    نمودار مکان‌های مرتبط با ردیاب
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
                <WorldMap />
              </Paper>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <Paper
                className={classNames(
                  classes.relatedsPaper,
                  classes.chartPaper
                )}
              >
                <div className={classes.paperHeader}>
                  <Typography variant="h6" className={classes.headerText}>
                    لفظ‌های مرتبط
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
                  <List
                    component="div"
                    disablePadding
                    className={classes.relateds}
                  >
                    {this.props.keywords.map((item, index) => {
                      return (
                        <ListItem className={classes.listItem} key={index}>
                          <ListItemText
                            primary={item.text}
                            className={classNames(classes.textRight)}
                          />
                          <ListItemText
                            primary={item.value}
                            className={classNames(
                              classes.textMute,
                              classes.textLeft
                            )}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
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
                    نمودار ارتباط افراد مؤثر
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
                <Divider variant="fullWidth" />
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
                <div className={classes.emotionsContent}>
                  <div className={classes.emotionStats}>
                    <div className={classes.negativeEmotionBox}>
                      <Typography
                        variant="body1"
                        className={
                          this.props.selectedEmotion == "negative"
                            ? classes.selectedNegativePercent
                            : classes.negativePercent
                        }
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
                    <div className={classes.positiveEmotionBox}>
                      <Typography
                        variant="body1"
                        className={
                          this.props.selectedEmotion == "positive"
                            ? classes.selectedPositivePercent
                            : classes.positivePercent
                        }
                      >
                        {this.state.emotionDatas[1].value}%
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.positiveText}
                      >
                        {this.state.emotionDatas[1].name}
                      </Typography>
                    </div>
                  </div>
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
                      {this.props.selectedKeyword}
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
                  <Divider variant="fullWidth" className={classes.dividerFW} />
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
    );
  }
}

QueryLocationsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    queries: state.queries,
    selectedQuery: state.selectedQuery,
    selectedQueryDashboardItem: state.selectedQueryDashboardItem,
    keywords: state.keywords
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
)(withStyles(styles, {withTheme: true})(QueryLocationsContainer));
