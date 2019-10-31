import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import {
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  Button,
  Tooltip as MTooltip,
  Popover
} from "@material-ui/core";
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
import moment from "moment";
import BootstrapTooltip from "./BSTooltip";
import "d3-transition";
import {select} from "d3-selection";
import ListInfluencers from "./ListInfluencers";
import CheckIcon from "@material-ui/icons/Check";

import ReactEcharts from "echarts-for-react";
// import echarts from "echarts";

var echarts = require("echarts");
require("echarts/src/chart/graph");
echarts.dataTool = require("echarts/extension/dataTool");

import gexf from "gexf";
var lesMiserable = require("../../data/les-miserables.gexf");

import {
  Sigma,
  EdgeShapes,
  NodeShapes,
  LoadJSON,
  LoadGEXF,
  Filter,
  ForceAtlas2,
  RelativeSize,
  NOverlap,
  NeoCypher,
  NeoGraphItemsProducers,
  RandomizeNodePositions,
  SigmaEnableWebGL
} from "react-sigma";
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
  marginsPaper: {
    height: "100%"
  },
  influencersPaper: {
    height: 420
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

// function getCallback(callback) {
//   return function(word, event) {
//     const isActive = callback !== "onWordMouseOut";
//     const element = event.target;
//     // console.log(element);

//     // const text = element.select();
//     // console.log("x");

//     element
//       .on("click", () => {
//         this.setState({
//           selectedKeyword: word.text
//         });
//       })
//       .transition()
//       .attr("background", "white")
//       .attr("font-size", isActive ? "300%" : "100%")
//       .attr("text-decoration", isActive ? "underline" : "none");
//   };
// }
// const callbacks = {
//   onWordClick: getCallback("onWordClick"),
//   onWordMouseOut: getCallback("onWordMouseOut"),
//   onWordMouseOver: getCallback("onWordMouseOver")
// };

class QueryInfluencersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emotionDatas,
      queriesSliderValue: [1, 30],
      minSlider: 1,
      maxSlider: 40,
      selectedTab: "keyWords",
      selectedChartAction: "day",
      selectedView: "row",
      rowHover: 0,
      selectedKeyword: "",
      callbacks: {},
      twitter: 1,
      instagram: 0,
      graph: null,
      graphCategories: [],

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
    this.handleSelectView = this.handleSelectView.bind(this);
    this.handleHoverRow = this.handleHoverRow.bind(this);
    this.handleUnHoverRow = this.handleUnHoverRow.bind(this);
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

  componentDidMount = () => {
    // axios({
    //   method: "get",
    //   url:
    //     "https://echarts.apache.org/examples/data/asset/data/les-miserables.gexf",
    //   responseType: "json"
    // }).then(function(response) {
    //   console.log(response);
    // });
    // Converting a string to a DOM object
    // var gexf_dom = new DOMParser().parseFromString(
    //   ,
    //   "application/xml"
    // );
    // // Parsing the gexf
    // var graph = gexf.parse(gexf_dom);
    // var graph = gexf.fetch(
    //   "https://echarts.apache.org/examples/data/asset/data/les-miserables.gexf"
    // );
    // console.log(graph);
    // // var graph = echarts.dataTool.gexf.parse(lesMiserable);
    // var categories = [];
    // for (var i = 0; i < 9; i++) {
    //   categories[i] = {
    //     name: "类目" + i
    //   };
    // }
    // graph.nodes.forEach(function(node) {
    //   node.itemStyle = null;
    //   node.value = node.symbolSize;
    //   node.symbolSize /= 1.5;
    //   node.label = {
    //     normal: {
    //       show: node.symbolSize > 30
    //     }
    //   };
    //   node.category = node.attributes.modularity_class;
    // });
    // this.setState({
    //   graph,
    //   graphCategories: categories
    // });
    // this.setState({
    //   callbacks: {
    //     getWordTooltip: word =>
    //       `The word "${word.text}" appears ${word.value} times.`,
    //     onWordClick: this.getCallback("onWordClick"),
    //     onWordMouseOut: this.getCallback("onWordMouseOut"),
    //     onWordMouseOver: this.getCallback("onWordMouseOver")
    //   }
    // });
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

  getOption = () => ({
    title: {
      text: "Les Miserables",
      subtext: "Default layout",
      top: "bottom",
      left: "right"
    },
    tooltip: {},
    legend: [
      {
        // selectedMode: 'single',
        data: this.statete.graphCategories.map(function(a) {
          return a.name;
        })
      }
    ],
    animationDuration: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        name: "Les Miserables",
        type: "graph",
        layout: "none",
        data: this.state.graph.nodes,
        links: this.state.graph.links,
        categories: this.state.graphCategories,
        roam: true,
        focusNodeAdjacency: true,
        itemStyle: {
          normal: {
            borderColor: "#fff",
            borderWidth: 1,
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.3)"
          }
        },
        label: {
          position: "right",
          formatter: "{b}"
        },
        lineStyle: {
          color: "source",
          curveness: 0.3
        },
        emphasis: {
          lineStyle: {
            width: 10
          }
        }
      }
    ]
  });

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
            <Grid item md={12} sm={12} xs={12}>
              <Paper
                className={classNames(
                  classes.chartPaper,
                  classes.influencersPaper
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
                <Divider variant="fullWidth" className={classes.dividerM} />
                {/* <ReactEcharts option={this.getOption()} style={{height: 300}} /> */}
                <Sigma>
                  <LoadGEXF path="../../data/les-miserables.gexf"></LoadGEXF>
                </Sigma>
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
                    افراد مؤثر روی ردیاب{" "}
                    <span className={classes.selectedKeyword}>
                      {this.state.selectedKeyword}
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
                  <ListInfluencers />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}

QueryInfluencersContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    queries: state.queries,
    selectedQuery: state.selectedQuery,
    selectedQueryDashboardItem: state.selectedQueryDashboardItem,
    posts: state.posts,
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
)(withStyles(styles, {withTheme: true})(QueryInfluencersContainer));
