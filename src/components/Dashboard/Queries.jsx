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
import selectQuery from "../../actions/selectQuery";
import selectQueriesType from "../../actions/selectQueriesType";
import changeQueryStatus from "../../actions/changeQueryStatus";
import ReactExport from "react-data-export";
import LatestQueriesPDF from "./LatestQueriesPDF";
import moment from "moment";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import selectPage from "../../actions/selectPage";
import editableQuery from "../../actions/editableQuery";
import goToAddQuery from "../../actions/goToAddQuery";

const styles = theme => ({
  wrapper: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#fff"
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
    display: "flex"
  },
  headerBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50
  },
  newQueryBtn: {
    width: 170,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#4753ff",
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0500cb"
    },
    "&:active": {
      opacity: 0.7
    }
  },
  title: {
    fontSize: 32
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#f2f3fb",
    padding: "18px 25px"
  },
  searchInput: {
    width: 410,
    height: 44,
    borderRadius: 22,
    background: "#fff",
    padding: 21,
    border: "1px solid #f2f3fb",
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
  typeOfQuery: {
    border: "solid 2px #e4e8ed",
    borderRadius: 3
  },
  listItem: {
    heigth: 44,
    width: "100%",
    "&:hover": {
      // color: "#4753ff",
      cursor: "pointer"
    }
  },
  activeQuery: {
    paddingTop: 0
  },
  selectedQueriesType: {
    color: "#4753ff",
    "&::after": {
      content: `""`,
      position: "absolute",
      left: 24,
      width: 16,
      height: 16,
      background: "#4753ff",
      borderRadius: "50%",
      border: "solid 5px rgba(255, 255, 255, 0.85)"
    }
  },
  listQueryItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textMute: {
    color: "#adb2b9",
    display: "flex"
  },
  queriesName: {
    fontSize: 22,
    textAlign: "right",
    marginBottom: 11
  },
  queriesListActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  pauseBtn: {
    minWidth: 32,
    width: 32,
    height: 32,
    color: "#fff",
    backgroundColor: "#03d588",
    borderRadius: 22,
    marginBottom: 11,
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    "&:hover": {
      opacity: 0.7,
      backgroundColor: "#03d588"
    }
  },
  playBtn: {
    minWidth: 32,
    width: 32,
    height: 32,
    color: "#fff",
    backgroundColor: "#f29132",
    borderRadius: 22,
    marginBottom: 11,
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    "&:hover": {
      opacity: 0.7,
      backgroundColor: "#f29132"
    }
  },
  activeIcon: {
    fontSize: "0.8em"
  },

  statsDivider: {
    height: 15,
    width: 1,
    margin: "0px 15px"
  },
  socialIcons: {
    display: "flex",
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  twitter: {
    color: "#1da1f2",
    margin: "0px 5px"
  },
  instagram: {
    color: "#da2b72",
    margin: "0px 5px"
  },
  queryTitle: {
    display: "flex",
    flexDirection: "row",
    textAlign: "right",
    marginBottom: 15
  },

  welcomeBox: {
    width: "50%",
    margin: "0px auto"
  },
  welcomeTitle: {
    fontSize: 24,
    margin: "10px 0px"
  },
  welcomeText: {
    fontSize: 12,
    margin: "10px 0px 30px 0px",
    lineHeight: 2.33
  }
});

class Queries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClickAddQueries = () => {
    this.props.goToAddQuery();
    this.props.selectPage("queries/add");
  };

  handleClickEdit = id => {
    this.props.editableQuery(id);
    this.props.selectPage("queries/edit");
  };

  componentDidMount = () => {
    if (this.props.comeFrom == "boarding") {
      this.props.selectPage("queries/add");
    }
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.wrapper}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container maxWidth="md">
            <Grid container className={classes.root} spacing={4}>
              <Grid item md={12} sm={12} xs={12}>
                <div className={classes.headerBox}>
                  <Typography variant="h1" className={classes.title}>
                    ردیاب‌ها
                  </Typography>
                  <Button
                    color="primary"
                    className={classes.newQueryBtn}
                    onClick={() => this.handleClickAddQueries()}
                  >
                    ساخت ردیاب جدید
                  </Button>
                </div>
                <div className={classes.actions}>
                  <input
                    type="text"
                    className={classes.searchInput}
                    placeholder="نام یک ردیاب را جستجو کنید."
                  />
                  <Button className={classes.searchIconBtn}>
                    <i className="fa fa-search fa-lg"></i>
                  </Button>
                  <div style={{flexGrow: 1}} />
                  <Typography variant="body1" className={classes.numberOfQuery}>
                    {this.props.queries.length
                      ? this.props.queries.length + " ردیاب ایجاد شده"
                      : "ردیابی ایجاد نشده است."}
                  </Typography>
                </div>
              </Grid>
              {this.props.queries.length ? (
                <Grid item md={3} sm={3} xs={3}>
                  <List className={classes.typeOfQuery}>
                    <ListItem
                      className={classNames(
                        classes.listItem,
                        this.props.selectedQueriesType == 1
                          ? classes.selectedQueriesType
                          : ""
                      )}
                      onClick={() => this.props.selectQueriesType(1)}
                    >
                      <ListItemText
                        primary="ردیاب‌های فعال"
                        className="list-item-right"
                      />
                    </ListItem>
                    <ListItem
                      className={classNames(
                        classes.listItem,
                        this.props.selectedQueriesType == 0
                          ? classes.selectedQueriesType
                          : ""
                      )}
                      onClick={() => this.props.selectQueriesType(0)}
                    >
                      <ListItemText
                        primary="ردیاب‌های متوقف شده"
                        className="list-item-right"
                      />
                    </ListItem>
                  </List>
                </Grid>
              ) : (
                ""
              )}
              {this.props.queries.length ? (
                <Grid item md={9} sm={9} xs={9}>
                  <List className={classes.activeQuery}>
                    <Divider />
                    {this.props.queries.map((item, index) => {
                      if (item.active == this.props.selectedQueriesType) {
                        return (
                          <div key={index}>
                            <ListItem
                              className={classNames(
                                classes.listItem,
                                classes.listQueryItem
                              )}
                            >
                              <div className={classes.queriesListText}>
                                <div className={classes.queryTitle}>
                                  <Typography
                                    variant="h1"
                                    className={classes.queriesName}
                                    onClick={() =>
                                      this.props.selectQuery(item.id)
                                    }
                                  >
                                    {item.name}
                                  </Typography>
                                  <div className={classes.socialIcons}>
                                    {item.social.instagram != null ? (
                                      <i
                                        className={classNames(
                                          classes.instagram,
                                          "fab fa-instagram fa-lg"
                                        )}
                                      ></i>
                                    ) : (
                                      ""
                                    )}
                                    {item.social.twitter != null ? (
                                      <i
                                        className={classNames(
                                          classes.twitter,
                                          "fab fa-twitter fa-lg"
                                        )}
                                      ></i>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className={classes.textMute}>
                                  ساخته شده در {item.date}, ساعت {item.time}
                                  <Divider className={classes.statsDivider} />
                                  پست‌های ردیابی شده: {item.retrieved_posts}
                                </div>
                              </div>
                              <div className={classes.queriesListActions}>
                                {item.active == 1 ? (
                                  <Button
                                    className={classes.pauseBtn}
                                    onClick={() =>
                                      this.props.changeQueryStatus(item.id)
                                    }
                                  >
                                    <PauseIcon className={classes.activeIcon} />
                                  </Button>
                                ) : (
                                  <Button
                                    className={classes.playBtn}
                                    onClick={() =>
                                      this.props.changeQueryStatus(item.id)
                                    }
                                  >
                                    <PlayArrowIcon
                                      className={classes.activeIcon}
                                    />
                                  </Button>
                                )}
                                <Typography
                                  variant="body1"
                                  className={classes.edit}
                                  onClick={() => this.handleClickEdit(item.id)}
                                >
                                  ویرایش
                                </Typography>
                              </div>
                            </ListItem>
                            <Divider />
                          </div>
                        );
                      }
                    })}
                  </List>
                </Grid>
              ) : (
                <Grid item md={12} sm={12} xs={12}>
                  <div className={classes.welcomeBox}>
                    <Typography
                      variant="body1"
                      className={classes.welcomeTitle}
                    >
                      هنوز ردیابی ندارید!
                    </Typography>
                    <Typography variant="body1" className={classes.welcomeText}>
                      برای تحلیل و ردیابی موضوعات مورد نظر خود در شبکه‌های
                      اجتماعی می‌توانید <b>ردیاب</b> ایجاد کنید و به صورت ۲۴
                      ساعت موضوعات را ردیابی کنید.
                    </Typography>
                    <Button
                      color="primary"
                      className={classes.newQueryBtn}
                      onClick={() => this.handleClickAddQueries()}
                    >
                      ساخت ردیاب جدید
                    </Button>
                  </div>
                </Grid>
              )}
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

Queries.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    latestQueries: state.latestQueries,
    selectedQuery: state.selectedQuery,
    queries: state.queries,
    selectedQueriesType: state.selectedQueriesType,
    comeFrom: state.comeFrom
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectQuery: id => dispatch(selectQuery(id)),
    selectQueriesType: type => dispatch(selectQueriesType(type)),
    changeQueryStatus: query => dispatch(changeQueryStatus(query)),
    selectPage: page => dispatch(selectPage(page)),
    editableQuery: id => dispatch(editableQuery(id)),
    goToAddQuery: () => dispatch(goToAddQuery())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Queries));
