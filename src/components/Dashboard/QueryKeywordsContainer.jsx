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
  Label,
  Tooltip,
  Cell,
  AreaChart,
  Area,
  PieChart,
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
import "d3-transition";
import {select} from "d3-selection";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ViewStreamOutlinedIcon from "@material-ui/icons/ViewStreamOutlined";
import ViewModuleOutlinedIcon from "@material-ui/icons/ViewModuleOutlined";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ListPosts from "./ListPosts";
import GridPosts from "./GridPosts";
import WordsCloud from "./WordsCloud";
import CheckIcon from "@material-ui/icons/Check";

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
    justifyContent: "center"
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
  wordsPaper: {
    height: "100%"
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
    name: "حس مثبت",
    value: 58,
    color: "#03d588"
  },
  {
    name: "حس منفی",
    value: 42,
    color: "#ec373c"
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

function getCallback(callback) {
  return function(word, event) {
    const isActive = callback !== "onWordMouseOut";
    const element = event.target;
    const text = select(element);
    console.log(mapStateToProps);
    // text.setAttribute("fill", "#f2c314");
    // console.log("x");
    // console.log(element);

    // const text = element.select();
    // console.log("x");

    text.on("click", () => {
      window.keywordsContainer.setState({
        selectedKeyword: word.text
      });
    });
  };
}
const callbacks = {
  onWordClick: getCallback("onWordClick"),
  onWordMouseOut: getCallback("onWordMouseOut"),
  onWordMouseOver: getCallback("onWordMouseOver")
};

class QueryKeywordsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
      data01,
      emotionDatas,
      queriesSliderValue: [1, 30],
      minSlider: 1,
      maxSlider: 40,
      selectedTab: "keyWords",
      selectedChartAction: "day",
      selectedView: "grid",
      rowHover: 0,
      selectedKeyword: "",
      callbacks: {},
      twitter: 1,
      instagram: 0
    };

    this.handleSelectTab = this.handleSelectTab.bind(this);
    this.handleSelectChartAction = this.handleSelectChartAction.bind(this);
    this.handleSelectView = this.handleSelectView.bind(this);
    this.handleHoverRow = this.handleHoverRow.bind(this);
    this.handleUnHoverRow = this.handleUnHoverRow.bind(this);
    this.handleWordClick = this.handleWordClick.bind(this);
    this.handleTwitterClick = this.handleTwitterClick.bind(this);
    this.handleInstagramClick = this.handleInstagramClick.bind(this);
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

  getCallback = callback => {
    (word, event) => {
      const isActive = callback !== "onWordMouseOut";
      const element = event.target;
      const text = select(element);
      text.on("click", () => {
        this.setState({
          selectedKeyword: word.text
        });
      });
      // .transition()
      // .attr("background", "white")
      // .attr("font-size", isActive ? "300%" : "100%")
      // .attr("text-decoration", isActive ? "underline" : "none");
    };
  };

  handleWordClick = (word, event) => {
    this.setState({
      selectedKeyword: word.text
    });
    // console.log(word);
    // console.log(event);

    const element = event.target;
    console.log(element);
    element.setAttribute("fill", "#f2c314");

    // const text = element.select();
    // console.log("x");

    // text
    //   .on("click", () => {
    //     this.setState({
    //       selectedKeyword: word.text
    //     });
    //   })
    //   .transition()
    //   .attr("background", "white")
    //   .attr("font-size", isActive ? "300%" : "100%")
    //   .attr("text-decoration", isActive ? "underline" : "none");
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
                  <Button color="primary" className={classes.selectDateRange}>
                    ۱ مرداد - ۱۹ مرداد
                    <div className={classes.selectDateRangeIcon}>
                      <i className="fas fa-chevron-down" />
                    </div>
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.chartContainer}>
          <Grid container className={classes.root} spacing={2}>
            <Grid item md={8} sm={12} xs={12}>
              <Paper
                className={classNames(classes.chartPaper, classes.wordsPaper)}
              >
                <div className={classes.paperHeader}>
                  <Typography variant="h6" className={classes.headerText}>
                    عبارات خاص
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
                <WordsCloud />
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
                    لفظ‌های مرتبط با{" "}
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

QueryKeywordsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    queries: state.queries,
    selectedQuery: state.selectedQuery,
    posts: state.posts,
    keywords: state.keywords,
    words: state.words,
    selectedKeyword: state.selectedKeyword
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
)(withStyles(styles, {withTheme: true})(QueryKeywordsContainer));
