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
import {
  ResponsiveContainer,
  Cell,
  // PieChart,
  Pie,
  linearGradient
} from "recharts";
import {connect} from "react-redux";
import selectEmotion from "../../actions/selectEmotion";
import ReactExport from "react-data-export";
import BootstrapTooltip from "./BSTooltip";
import ViewStreamOutlinedIcon from "@material-ui/icons/ViewStreamOutlined";
import ViewModuleOutlinedIcon from "@material-ui/icons/ViewModuleOutlined";
import ListEmotionPosts from "./ListEmotionPosts";
import GridPosts from "./GridPosts";
import CheckIcon from "@material-ui/icons/Check";
import PieChart from "./PieChart";

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
  selectedNegativePercent: {
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
  positiveEmotionBox: {
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
      borderRadius: "50%",
      border: "solid 5px rgba(255, 255, 255, 0.85)"
    }
  },
  selectedPositivePercent: {
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
  selectedNegativeEmotion: {
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
  selectedPositiveEmotion: {
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
  emotionPaper: {
    height: "100%"
  },
  pie: {
    "&:hover": {
      cursor: "pointer"
    }
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
    value: 42,
    color: "#ec373c",
    emotion: "negative"
  },
  {
    name: "حس مثبت",
    value: 58,
    color: "#03d588",
    emotion: "positive"
  }
];

class QueryEmotionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emotionDatas,
      queriesSliderValue: [1, 30],
      minSlider: 1,
      maxSlider: 40,
      selectedTab: "positive",
      selectedChartAction: "day",
      selectedView: "row",
      rowHover: 0,
      selectedKeyword: "",
      callbacks: {},
      twitter: 1,
      instagram: 0
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

  handleSelectTab = tab => {
    this.setState({
      selectedTab: tab
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
                className={classNames(classes.chartPaper, classes.emotionPaper)}
              >
                <div className={classes.paperHeader}>
                  <Typography variant="h6" className={classes.headerText}>
                    خط زمانی موجود احساس موجود در متن
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
                        className={classes.positiveeText}
                      >
                        {this.state.emotionDatas[1].name}
                      </Typography>
                    </div>
                  </div>
                </div>
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
                    هشتگ‌های غالب
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
                          (this.state.selectedTab == "positive"
                            ? classes.selectedTab
                            : "")
                      )}
                      onClick={() => this.handleSelectTab("positive")}
                    >
                      <ListItemText
                        primary="مثبت"
                        className={classNames(classes.textCenter)}
                      />
                    </ListItem>
                    <ListItem
                      className={classNames(
                        classes.listItem,
                        "" +
                          (this.state.selectedTab == "negative"
                            ? classes.selectedTab
                            : "")
                      )}
                      onClick={() => this.handleSelectTab("negative")}
                    >
                      <ListItemText
                        primary="منفی"
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
                    پست‌های مرتبط
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
                    <ListEmotionPosts />
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

QueryEmotionsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    queries: state.queries,
    selectedQuery: state.selectedQuery,
    posts: state.posts,
    keywords: state.keywords,
    selectedEmotion: state.selectedEmotion
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectEmotion: emotion => {
      dispatch(selectEmotion(emotion));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(QueryEmotionsContainer));
