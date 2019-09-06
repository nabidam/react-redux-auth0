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
    flexGrow: 1
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
    margin: "0px "
  },
  twitterIconBtn: {
    color: "#fff",
    backgroundColor: "#1da1f2",
    minWidth: 44,
    height: 44,
    borderRadius: 22,
    margin: "0px 10px"
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
    paddingLeft: 50
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
    height: "35vh"
    // width: "40%vw"
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

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container className={classes.topNavbar}>
          <Grid container className={classes.root}>
            <Grid item md={12} sm={12} xs={12}>
              <Paper className={classes.topNavbarPaper}>
                <div className={classes.topNavbarTitleBox}>
                  <Typography
                    variant="p"
                    className={classes.topNavbarTitleText}
                  >
                    ردیاب:
                  </Typography>
                  <Typography
                    variant="p"
                    className={classes.topNavbarSelectedQuery}
                  >
                    {this.props.latestQueries.map((item, index) => {
                      return item.id == this.props.selectedQuery
                        ? item.name
                        : "";
                    })}
                  </Typography>
                </div>
                <div className={classes.topNavbarMeta}>
                  <Button className={classes.instagramIconBtn}>
                    <i className="fab fa-instagram"></i>
                  </Button>
                  <Button className={classes.twitterIconBtn}>
                    <i className="fab fa-twitter"></i>
                  </Button>
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
          <Grid container className={classes.root}>
            <Grid item md={12} sm={12} xs={12}>
              <Paper className={classes.chartPaper}></Paper>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="lg">
          <Grid container className={classes.root} spacing={4}>
            <Grid item md={6} sm={12} xs={12}>
              <Grid container>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <HistoryIcon />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography variant="body1">آخرین کوئری ها</Typography>
                </Grid>
              </Grid>
              <Paper className={classes.paper}>
                <Grid container className={classes.chart}>
                  <Grid item xs={2} sm={2} className={classes.lists}>
                    <List component="nav">
                      {this.props.latestQueries
                        .sort((a, b) => {
                          return new Date(b.date) - new Date(a.date);
                        })
                        .map((item, index) => (
                          <ListItem
                            button
                            selected={this.props.selectedQuery == item.id}
                            key={item.id}
                            onClick={() =>
                              this.props.changeSelectedQuery(item.id)
                            }
                          >
                            <ListItemText
                              primary={item.name}
                              primaryTypographyProps={{variant: "caption"}}
                              className="list-item-right"
                            />
                          </ListItem>
                        ))}
                    </List>
                  </Grid>
                  <Grid item xs={10} sm={10} className={classes.displayFlex}>
                    <Grid container>
                      <Grid item sm={12}>
                        <Grid
                          container
                          justify="center"
                          className={classes.aboveChartList}
                        >
                          <Grid item sm={2}>
                            <Grid container>
                              <Grid
                                item
                                sm={6}
                                className={classNames(
                                  classes.leftToRight,
                                  classes.aboveChartIcon
                                )}
                              >
                                <PDFDownloadLink
                                  document={
                                    <Document>
                                      <Page wrap>
                                        <Text>Date:number of Posts</Text>
                                        {data.map((item, index) => (
                                          <Text key={index}>
                                            {item.date} => {item.posts}
                                          </Text>
                                        ))}
                                      </Page>
                                    </Document>
                                  }
                                  fileName={
                                    this.props.latestQueries.find(
                                      x => x.id == this.props.selectedQuery
                                    ).name +
                                    "_" +
                                    moment().format("YYYY-MM-DD") +
                                    ".pdf"
                                  }
                                >
                                  <MTooltip title="دانلود">
                                    <i
                                      className={classNames(
                                        classes.textRed,
                                        "fas fa-file-pdf pointer"
                                      )}
                                    />
                                  </MTooltip>
                                </PDFDownloadLink>
                              </Grid>
                              <Grid
                                item
                                sm={6}
                                className={classNames(
                                  classes.aboveChartIcon,
                                  classes.textGreen
                                )}
                              >
                                <ExcelFile
                                  filename={
                                    this.props.latestQueries.find(
                                      x => x.id == this.props.selectedQuery
                                    ).name +
                                    "_" +
                                    moment().format("YYYY-MM-DD")
                                  }
                                  element={<ExcelDownload />}
                                >
                                  <ExcelSheet data={data} name="posts">
                                    <ExcelColumn label="Date" value="date" />
                                    <ExcelColumn
                                      label="number of Posts"
                                      value="posts"
                                    />
                                  </ExcelSheet>
                                </ExcelFile>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item sm={10}>
                            <Grid container className="padding-lr-5">
                              <Grid item sm={3}>
                                <Grid container>
                                  <Grid
                                    item
                                    sm={8}
                                    className={classes.leftToRight}
                                  >
                                    <Typography variant="body2">
                                      8,377
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                      className={classes.smallText}
                                    >
                                      IMPRESSIONS
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    sm={4}
                                    className={classes.aboveChartIcon}
                                  >
                                    <i className="fa fa-microphone" />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item sm={3}>
                                <Grid container>
                                  <Grid
                                    item
                                    sm={8}
                                    className={classes.leftToRight}
                                  >
                                    <Typography variant="body2">
                                      79,098
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                      className={classes.smallText}
                                    >
                                      REACH
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    sm={4}
                                    className={classes.aboveChartIcon}
                                  >
                                    <i className="fas fa-project-diagram" />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item sm={3}>
                                <Grid container>
                                  <Grid
                                    item
                                    sm={8}
                                    className={classes.leftToRight}
                                  >
                                    <Typography variant="body2">401</Typography>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                      className={classes.smallText}
                                    >
                                      USERS
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    sm={4}
                                    className={classes.aboveChartIcon}
                                  >
                                    <i className="fa fa-user" />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item sm={3}>
                                <Grid container>
                                  <Grid
                                    item
                                    sm={8}
                                    className={classes.leftToRight}
                                  >
                                    <Typography variant="body2">500</Typography>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                      className={classes.smallText}
                                    >
                                      POSTS
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    sm={4}
                                    className={classes.aboveChartIcon}
                                  >
                                    <i className="fas fa-comment" />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container className={classes.chart}>
                      <Grid item sm={12}>
                        <ResponsiveContainer
                          width="100%"
                          height="80%"
                          className={classes.leftToRight}
                        >
                          <BarChart
                            data={this.state.data}
                            margin={{top: 10, right: 20, left: 0, bottom: 0}}
                          >
                            {/* <defs>
                                                              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                                                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                                              </linearGradient>
                                                              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                                                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                                              </linearGradient>
                                                          </defs> */}
                            <XAxis
                              type="category"
                              dataKey="date"
                              interval="preserveEnd"
                            />
                            <CartesianGrid strokeDasharray="3 3" />
                            <YAxis />
                            <Tooltip />
                            {/* <Brush
                              dataKey="date"
                              height={30}
                              stroke="#8884d8"
                              onChange={this.brushChangeHandler}
                            /> */}
                            <Bar dataKey="posts" fill="#8884d8" barSize={5}>
                              {data.map((item, index) => {
                                const color = item.color;
                                return <Cell fill={color} key={index} />;
                              })}
                            </Bar>
                            {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
                          </BarChart>
                        </ResponsiveContainer>
                        <Grid container className="padding-lr-5" spacing={2}>
                          <Grid item sm={2}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={this.latestQuerySliderButtonHandler}
                            >
                              اعمال
                            </Button>
                          </Grid>
                          <Grid item sm={10} className={classes.center}>
                            <Slider
                              className={classes.slider}
                              value={this.state.latestQueriesSliderValue}
                              valueLabelDisplay="auto"
                              onChange={this.latestQueriesSliderChangeHandler}
                              onChangeCommitted={
                                this.latestQueriesSliderChangeCommittedHandler
                              }
                              min={this.state.minSlider}
                              max={this.state.maxSlider}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Grid container>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <Traffic />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography variant="body1">تحلیل ترافیکی</Typography>
                </Grid>
              </Grid>
              <Paper className={classes.paper} />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Grid container>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <Whatshot />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography variant="body1">پر‌تکرارترین موضوعات</Typography>
                </Grid>
              </Grid>
              <Paper className={classes.paper} />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Grid container>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <People />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography variant="body1">شبکه‌های احتماعی</Typography>
                </Grid>
              </Grid>
              <Paper className={classes.paper} />
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}

QueriesDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    latestQueries: state.latestQueries,
    selectedQuery: state.selectedQuery
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
