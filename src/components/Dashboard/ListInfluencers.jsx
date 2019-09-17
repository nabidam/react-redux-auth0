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
import ViewStreamOutlinedIcon from "@material-ui/icons/ViewStreamOutlined";
import ViewModuleOutlinedIcon from "@material-ui/icons/ViewModuleOutlined";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
    // marginBottom: 20
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
  }
});

class ListInfluencers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowHover: 0
    };

    this.handleHoverRow = this.handleHoverRow.bind(this);
    this.handleUnHoverRow = this.handleUnHoverRow.bind(this);
  }

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
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Grid item md={12} className={classes.tableGrid}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell
                  align="right"
                  className={classes.tableHeader}
                  style={{width: "10%"}}
                >
                  کاربری
                </TableCell>
                <TableCell
                  align="right"
                  className={classes.tableHeader}
                  style={{width: "10%"}}
                >
                  پست‌ها
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.tableHeader}
                  style={{width: "10%"}}
                >
                  مجموع لایک‌ها
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.tableHeader}
                  style={{width: "10%"}}
                >
                  متوسط لایک‌ها
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.tableHeader}
                  style={{width: "10%"}}
                >
                  مجموع کامنت‌ها
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.tableHeader}
                  style={{width: "10%"}}
                >
                  متوسط کامنت‌ها
                </TableCell>
                <TableCell
                  className={classes.tableHeader}
                  style={{width: "10%"}}
                >
                  میانگین انگیزش
                </TableCell>
                <TableCell
                  className={classes.tableHeader}
                  style={{width: "15%"}}
                >
                  حس متن
                </TableCell>
                <TableCell
                  className={classes.tableHeader}
                  style={{width: "15%"}}
                >
                  حس کامنت
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.influencers.map(row => (
                <TableRow
                  key={row.id}
                  className={classes.tableRow}
                  onMouseEnter={() => this.handleHoverRow(row.id)}
                  onMouseLeave={() => this.handleUnHoverRow()}
                >
                  <TableCell
                    style={{width: "30%"}}
                    className={classes.flex}
                    // padding="none"
                    align="right"
                  >
                    <Grid container className={classes.root} spacing={1}>
                      <Grid
                        item
                        md={4}
                        sm={4}
                        xs={4}
                        className={classes.tableUsernamePart}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src="https://material-ui.com/static/images/avatar/1.jpg"
                          className={classes.avatar}
                        />
                        <span className={classes.twtterIconAvatar}>
                          <i className="fab fa-twitter fa-sm"></i>
                        </span>
                      </Grid>
                      <Grid
                        item
                        md={8}
                        sm={8}
                        xs={8}
                        className={classes.tableUsernamePart}
                      >
                        <span>{row.name}</span>
                        <span className={classes.textMute}>
                          @{row.username}
                        </span>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{width: "2%"}}
                    className={
                      this.state.rowHover != row.id ? classes.textMute : ""
                    }
                  >
                    {row.posts}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{width: "2%"}}
                    className={
                      this.state.rowHover != row.id ? classes.textMute : ""
                    }
                  >
                    {row.overall_likes}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{width: "2%"}}
                    className={
                      this.state.rowHover != row.id ? classes.textMute : ""
                    }
                  >
                    {row.average_likes}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{width: "2%"}}
                    className={
                      this.state.rowHover != row.id ? classes.textMute : ""
                    }
                  >
                    {row.overall_comments}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{width: "2%"}}
                    className={
                      this.state.rowHover != row.id ? classes.textMute : ""
                    }
                  >
                    {row.average_comments}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{width: "2%"}}
                    className={
                      this.state.rowHover != row.id ? classes.textMute : ""
                    }
                  >
                    {row.motivation}
                  </TableCell>
                  <TableCell align="center" style={{width: "20%"}}>
                    {row.content_emotion == -1 ? (
                      <div className={classes.negativeEmotion}></div>
                    ) : (
                      <div className={classes.positiveEmotion}></div>
                    )}
                  </TableCell>
                  <TableCell align="center" style={{width: "20%"}}>
                    {row.comment_emotion == -1 ? (
                      <div className={classes.negativeEmotion}></div>
                    ) : (
                      <div className={classes.positiveEmotion}></div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </div>
    );
  }
}

ListInfluencers.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    latestQueries: state.latestQueries,
    selectedQuery: state.selectedQuery,
    selectedQueryDashboardItem: state.selectedQueryDashboardItem,
    influencers: state.influencers
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
)(withStyles(styles, {withTheme: true})(ListInfluencers));
