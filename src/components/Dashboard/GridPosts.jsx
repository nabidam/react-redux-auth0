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
import {connect} from "react-redux";
import selectEmotion from "../../actions/selectEmotion";
import BootstrapTooltip from "./BSTooltip";

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
    position: "absolute",
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
    position: "absolute",
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
    position: "absolute",
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
    position: "absolute",
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

  post: {
    height: 230,
    border: "solid 1px #e4e8ed",
    borderRadius: 3,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      backgroundColor: "#f2f3fb",
      cursor: "pointer"
    }
    // margin: 10
  },
  tableGrid: {
    marginTop: 16
  },
  topBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10
  },
  usernameBox: {
    width: "30%"
  },
  postContent: {
    margin: 10
  },
  postStats: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  postLCs: {
    display: "flex",
    flexDirection: "row"
  },
  postLikes: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 30
  },
  postComments: {
    display: "flex",
    flexDirection: "column"
  },
  statsNumber: {
    fontSize: 22
  },
  ltr: {
    direction: "ltr"
  },
  postExtra: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  twitterLinkBtn: {
    color: "#1da1f2",
    width: 12,
    height: 12,
    "&:hover": {
      cursor: "pointer"
    }
  }
});

class GridPosts extends React.Component {
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
          <Grid container className={classes.root} spacing={2}>
            {this.props.posts.map((row, index) => {
              if (index < 4)
                return (
                  <Grid item md={6} key={row.id}>
                    <div
                      className={classes.post}
                      onMouseEnter={() => this.handleHoverRow(row.id)}
                      onMouseLeave={() => this.handleUnHoverRow()}
                    >
                      <div className={classes.topBox}>
                        <div className={classes.usernameBox}>
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
                        </div>
                        {this.state.rowHover != row.id ? (
                          ""
                        ) : (
                          <div className={classes.twitterLink}>
                            <BootstrapTooltip
                              title="مشاهده در توییتر"
                              placement="top"
                            >
                              <a className={classes.twitterLinkBtn}>
                                <i className="fab fa-twitter fa-md"></i>
                              </a>
                            </BootstrapTooltip>
                          </div>
                        )}
                      </div>
                      <div className={classes.postContent}>{row.post}</div>
                      <div className={classes.postStats}>
                        <div className={classes.postLCs}>
                          <div className={classes.postLikes}>
                            <span className={classes.statsNumber}>
                              {row.likes}
                            </span>
                            <span className={classes.textMute}>
                              تعداد لایک‌
                            </span>
                          </div>
                          <div className={classes.postComments}>
                            <span className={classes.statsNumber}>
                              {row.comments}
                            </span>
                            <span className={classes.textMute}>
                              تعداد کامنت
                            </span>
                          </div>
                        </div>
                        <div className={classes.postExtra}>
                          <div
                            className={classNames(
                              classes.postDate,
                              classes.textMute,
                              classes.ltr
                            )}
                          >
                            {row.date}, {row.time}
                          </div>
                          <div
                            className={classNames(
                              classes.postEmotion,
                              classes.textMute
                            )}
                            align="left"
                          >
                            حس متن
                            {row.emotion == "negative" ? (
                              <div
                                className={
                                  this.props.selectedEmotion == "negative"
                                    ? classes.selectedNegativeEmotion
                                    : classes.negativeEmotion
                                }
                              ></div>
                            ) : (
                              <div
                                className={
                                  this.props.selectedEmotion == "positive"
                                    ? classes.selectedPositiveEmotion
                                    : classes.positiveEmotion
                                }
                              ></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                );
            })}
          </Grid>
        </Grid>
        <Grid item md={12} className={classes.pagination} align="center">
          <div className={classes.paginationBox}>
            <div className={classes.paginationLinks}>
              <div
                className={classNames(
                  classes.paginationLink,
                  classes.activePaginationLink
                )}
              >
                1
              </div>
              <div className={classNames(classes.paginationLink)}>2</div>
              <div className={classNames(classes.paginationLink)}>3</div>
              <div className={classNames(classes.paginationLink)}>4</div>
              <div className={classNames(classes.paginationLink)}>5</div>
              <div className={classNames(classes.paginationLink)}>
                <i className="fa fa-angle-left"></i>
              </div>
              <div className={classNames(classes.paginationLink)}>
                <i className="fa fa-angle-double-left"></i>
              </div>
            </div>
            <div className={classes.paginationText}>
              نمایش <span className={classes.textNormal}>1</span> از{" "}
              <span className={classes.textNormal}>20</span> برای{" "}
              <span className={classes.textNormal}>3343</span> پست
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
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
)(withStyles(styles, {withTheme: true})(GridPosts));
