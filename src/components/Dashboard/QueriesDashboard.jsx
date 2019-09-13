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
  Tooltip,
  Cell
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
import QueryDashboardContainer from "./QueryDashboardContainer";
import QueryPostsContainer from "./QueryPostsContainer";

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
    margin: "0px ",
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
  chartPaper: {
    display: "flex",
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
  }
});

const data = [
  {
    date: moment()
      .subtract(29, "days")
      .format("MMM Do"),
    posts: 100,
    color: "#a9da79"
  },
  {
    date: moment()
      .subtract(28, "days")
      .format("MMM Do"),
    posts: 150,
    color: "#95eb56"
  },
  {
    date: moment()
      .subtract(27, "days")
      .format("MMM Do"),
    posts: 200,
    color: "#91dde2"
  },
  {
    date: moment()
      .subtract(26, "days")
      .format("MMM Do"),
    posts: 321,
    color: "#0a1b35"
  },
  {
    date: moment()
      .subtract(25, "days")
      .format("MMM Do"),
    posts: 100,
    color: "#e9432f"
  },
  {
    date: moment()
      .subtract(24, "days")
      .format("MMM Do"),
    posts: 533,
    color: "#72e25f"
  },
  {
    date: moment()
      .subtract(23, "days")
      .format("MMM Do"),
    posts: 423,
    color: "#8b8bf6"
  },
  {
    date: moment()
      .subtract(22, "days")
      .format("MMM Do"),
    posts: 324,
    color: "#b2ab52"
  },
  {
    date: moment()
      .subtract(21, "days")
      .format("MMM Do"),
    posts: 423,
    color: "#c35fd5"
  },
  {
    date: moment()
      .subtract(20, "days")
      .format("MMM Do"),
    posts: 312,
    color: "#39c4e3"
  },
  {
    date: moment()
      .subtract(19, "days")
      .format("MMM Do"),
    posts: 123,
    color: "#e03673"
  },
  {
    date: moment()
      .subtract(18, "days")
      .format("MMM Do"),
    posts: 253,
    color: "#36fb59"
  },
  {
    date: moment()
      .subtract(17, "days")
      .format("MMM Do"),
    posts: 397,
    color: "#c80b8a"
  },
  {
    date: moment()
      .subtract(16, "days")
      .format("MMM Do"),
    posts: 456,
    color: "#67df60"
  },
  {
    date: moment()
      .subtract(15, "days")
      .format("MMM Do"),
    posts: 575,
    color: "#9bcc4c"
  },
  {
    date: moment()
      .subtract(14, "days")
      .format("MMM Do"),
    posts: 423,
    color: "#78bef0"
  },
  {
    date: moment()
      .subtract(13, "days")
      .format("MMM Do"),
    posts: 100,
    color: "#dcffaa"
  },
  {
    date: moment()
      .subtract(12, "days")
      .format("MMM Do"),
    posts: 222,
    color: "#a9da79"
  },
  {
    date: moment()
      .subtract(11, "days")
      .format("MMM Do"),
    posts: 321,
    color: "#91dde2"
  },
  {
    date: moment()
      .subtract(10, "days")
      .format("MMM Do"),
    posts: 123,
    color: "#0a1b35"
  },
  {
    date: moment()
      .subtract(9, "days")
      .format("MMM Do"),
    posts: 99,
    color: "#e9432f"
  },
  {
    date: moment()
      .subtract(8, "days")
      .format("MMM Do"),
    posts: 654,
    color: "#72e25f"
  },
  {
    date: moment()
      .subtract(7, "days")
      .format("MMM Do"),
    posts: 122,
    color: "#8b8bf6"
  },
  {
    date: moment()
      .subtract(6, "days")
      .format("MMM Do"),
    posts: 344,
    color: "#b2ab52"
  },
  {
    date: moment()
      .subtract(5, "days")
      .format("MMM Do"),
    posts: 244,
    color: "#c35fd5"
  },
  {
    date: moment()
      .subtract(4, "days")
      .format("MMM Do"),
    posts: 354,
    color: "#39c4e3"
  },
  {
    date: moment()
      .subtract(3, "days")
      .format("MMM Do"),
    posts: 421,
    color: "#e03673"
  },
  {
    date: moment()
      .subtract(2, "days")
      .format("MMM Do"),
    posts: 124,
    color: "#36fb59"
  },
  {
    date: moment()
      .subtract(1, "days")
      .format("MMM Do"),
    posts: 123,
    color: "#36fb59"
  },
  {
    date: moment().format("MMM Do"),
    posts: 456,
    color: "#36fb59"
  }
];

class QueriesDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
      latestQueriesSliderValue: [1, 30],
      minSlider: 1,
      maxSlider: 40
    };
  }

  brushChangeHandler = event => {
    var new_data = this.state.data;
    new_data.map(
      (item, index) => (item.posts = Math.floor(Math.random() * (1000 + 1)))
    );
    this.setState({
      data: new_data
    });
  };

  latestQueriesSliderChangeHandler = (event, newValue) => {
    this.setState({
      latestQueriesSliderValue: newValue
    });
  };

  latestQueriesSliderChangeCommittedHandler = (event, newValue) => {
    var newMin = newValue[0] - 10;
    if (newMin < 1) {
      newMin = 1;
    }

    var newMax = newValue[1] + 10;
    if (newMax > 360) {
      newMax = 360;
    } else if (newMax < 30) {
      newMax = 30;
    }

    console.log(newMin, newMax);

    this.setState({
      minSlider: newMin,
      maxSlider: newMax
    });
  };

  latestQuerySliderButtonHandler = event => {
    var new_data = [];
    for (var i = 30; i >= 1; i--) {
      var d = {
        date: moment()
          .subtract(i, "days")
          .format("MMM Do"),
        posts: Math.floor(Math.random() * (1000 + 1)),
        color: "#36fb59"
      };
      new_data.push(d);
    }
    this.setState({
      data: new_data
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
    switch (this.props.selectedQueryDashboardItem) {
      case "dashboard":
        return <QueryDashboardContainer />;
        break;
      case "posts":
        return <QueryPostsContainer />;
        break;
      default:
        break;
    }
  }
}

QueriesDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    latestQueries: state.latestQueries,
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
)(withStyles(styles, {withTheme: true})(QueriesDashboard));
