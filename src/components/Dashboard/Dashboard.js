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
  Button
} from "@material-ui/core";
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
  AreaChart,
  Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import {connect} from "react-redux";
import changeSelectedQuery from "../../actions/changeSelectedQuery";
import ReactExport from "react-data-export";

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
  avatar: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginBottom: 5,
    color: "#3c3c3c"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
    float: "right"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1
  },
  rtlToolBar: {
    direction: "rtl"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  content: {
    direction: "rtl",
    flexGrow: 1,
    padding: theme.spacing(3),
    marginRight: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  paper: {
    display: "flex",
    height: "35vh"
    // width: "40%vw"
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
  }
});

const data = [
  {
    name: "1",
    posts: 100
  },
  {
    name: "2",
    posts: 150
  },
  {
    name: "3",
    posts: 200
  },
  {
    name: "4",
    posts: 321
  },
  {
    name: "5",
    posts: 100
  },
  {
    name: "6",
    posts: 533
  },
  {
    name: "7",
    posts: 423
  },
  {
    name: "8",
    posts: 324
  },
  {
    name: "9",
    posts: 423
  },
  {
    name: "10",
    posts: 312
  },
  {
    name: "11",
    posts: 123
  },
  {
    name: "12",
    posts: 253
  },
  {
    name: "13",
    posts: 397
  },
  {
    name: "14",
    posts: 456
  },
  {
    name: "15",
    posts: 575
  },
  {
    name: "16",
    posts: 423
  },
  {
    name: "17",
    posts: 100
  },
  {
    name: "18",
    posts: 222
  },
  {
    name: "19",
    posts: 321
  },
  {
    name: "20",
    posts: 123
  },
  {
    name: "21",
    posts: 99
  },
  {
    name: "22",
    posts: 654
  },
  {
    name: "23",
    posts: 122
  },
  {
    name: "24",
    posts: 344
  },
  {
    name: "25",
    posts: 244
  },
  {
    name: "26",
    posts: 354
  },
  {
    name: "27",
    posts: 421
  },
  {
    name: "28",
    posts: 124
  },
  {
    name: "29",
    posts: 123
  },
  {
    name: "30",
    posts: 456
  }
];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: {},
        tooltip: {},
        legend: {},
        xAxis: {
          data: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30
          ]
        },
        yAxis: {
          type: "value",
          name: "پست‌‌ها"
        },
        series: [
          {
            areaStyle: {},
            data: [
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              10,
              54,
              40,
              856,
              456,
              78,
              154,
              689,
              579,
              1124,
              657,
              645,
              616,
              45,
              879,
              1132,
              12,
              45,
              78,
              989,
              445,
              64,
              2112,
              46
            ],
            type: "line"
          }
        ]
      },
      data
    };
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container maxWidth="lg">
            {/* <Typography
                            component="div"
                            style={{backgroundColor: "#cfe8fc", height: "100vh"}}
                        /> */}
            <Grid container className={classes.root} spacing={4}>
              {/* <Grid item md={12} sm={12} xs={12}>
                                <Grid container justify="center" spacing={4}> */}
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
                                primary={item.username}
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
                                    classes.aboveChartIcon,
                                    classes.textRed
                                  )}
                                >
                                  <i className="fas fa-file-pdf" />
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
                                    filename={this.props.selectedQuery.toString()}
                                    element={
                                      <i className="fas fa-file-excel pointer" />
                                    }
                                  >
                                    <ExcelSheet data={data} name="posts">
                                      <ExcelColumn label="Name" value="name" />
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
                                      <Typography variant="body2">
                                        401
                                      </Typography>
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
                                      <Typography variant="body2">
                                        500
                                      </Typography>
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
                            height="100%"
                            className={classes.leftToRight}
                          >
                            <AreaChart
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
                                dataKey="name"
                                interval={1}
                              />
                              <CartesianGrid strokeDasharray="3 3" />
                              <YAxis />
                              <Tooltip />
                              <Area
                                type="monotone"
                                dataKey="posts"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="#8884d8"
                              />
                              {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
                            </AreaChart>
                          </ResponsiveContainer>
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
                    <Typography variant="body1">
                      پر‌تکرارترین موضوعات
                    </Typography>
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
            {/* </Grid>
                        </Grid> */}
          </Container>
        </main>
        <Sidebar />
        {/* <p>1</p> */}
      </div>
    );
  }
}

Index.propTypes = {
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
)(withStyles(styles, {withTheme: true})(Index));
