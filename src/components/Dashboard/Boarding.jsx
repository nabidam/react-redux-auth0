import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import {connect} from "react-redux";
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
// import {Map, GoogleApiWrapper} from "google-maps-react";
import IconButton from "@material-ui/core/IconButton";
import MapComponent from "./MapComponent";
import Popover from "@material-ui/core/Popover";
import AddIcon from "@material-ui/icons/Add";
import selectPage from "../../actions/selectPage";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import CalenderComponent from "./CalenderCompnent";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {Calendar} from "react-modern-calendar-datepicker";
import addQuery from "../../actions/addQuery";
import changeAddQuery from "../../actions/changeAddQuery";
import changeGlobalVar from "../../actions/changeGlobalVar";
import goToAddQuery from "../../actions/goToAddQuery";
import changeComeFrom from "../../actions/changeComeFrom";

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
  wrapper: {
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row"
  },

  root: {
    display: "flex",
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    height: 80,
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

  container: {
    paddingTop: 10,
    paddingBottom: 40
  },
  labelBox: {
    display: "flex",
    flexDirection: "row",
    padding: "20px 0px"
  },
  input: {
    width: "100%",
    height: 44,
    position: "relative",
    borderRadius: 22,
    backgroundColor: "#edf1f6",
    border: "none",
    padding: "0px 22px",
    color: "#08080d",
    display: "flex",
    justifyContent: "right",
    "&::placeholder": {
      color: "#a2a5a9"
    }
  },
  bulbIcon: {
    width: 22,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#adb2b9"
  },
  map: {
    width: "100%",
    height: "100%"
  },
  mapBox: {
    border: "2px solid #e4e8ed",
    borderRadius: 3,
    height: 180,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  chevronDownIcon: {
    display: "flex",
    position: "absolute",
    left: "19px",
    color: "#08080d"
  },
  socialMediaIcon: {
    width: 44,
    height: 44,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "solid 5px rgba(0, 0, 0, 0.02)",
    borderRadius: 22,
    backgroundColor: "#edf1f6",
    color: "rgba(8, 8, 13, 0.5)"
  },
  box: {
    width: "100%",
    height: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    border: "solid 2px #e4e8ed"
  },
  textMute: {
    color: "#adb2b9"
  },

  mapOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    opacity: "0.4"
  },

  changeMapBtn: {
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
  enableMapGrid: {
    display: "flex",
    justifyContent: "center"
  },
  enableMapBtn: {
    width: 215,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    border: "solid 2px #08080d",
    color: "#08080d",
    "&:hover": {
      backgroundColor: "#fff"
    },
    "&:active": {
      opacity: 0.7
    }
  },
  paperSP: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 440,
    borderBottomLeftRadius: "unset",
    borderBottomRightRadius: "unset",
    boxShadow: "unset",
    borderBottom: "6px solid #edf1f6"
  },
  popover: {
    borderRadius: 22,
    width: 440
  },
  listItem: {
    heigth: 40,
    fontSize: 12,
    "&:hover": {
      color: "#4753ff",
      cursor: "pointer"
    },
    "&::after": {
      content: `""`,
      display: "block",
      margin: "auto",
      position: "absolute",
      right: 16,
      bottom: 0,
      width: 404,
      height: 2,
      background: "#e2e6ea"
    },
    // paddingLeft: 24,
    // paddingRight: 24,
    "&:last-child::after": {
      display: "none"
    }
  },
  listItemNewProject: {
    color: "#3340ff"
  },
  iconAddProject: {
    minWidth: "unset",
    color: "#3340ff"
  },
  openSelectProjectInput: {
    border: "solid 4px #e3e5ff"
  },
  projectIsSelected: {
    color: "#08080d"
  },

  tagWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    overflow: "hidden",
    minHeight: 44,
    position: "relative",
    borderRadius: 22,
    backgroundColor: "#edf1f6",
    border: "none",
    padding: "8px 22px",
    color: "#a2a5a9",
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    flexWrap: "wrap",
    "&::placeholder": {
      color: "#a2a5a9"
    }
  },
  tagHolder: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    marginTop: 1,
    marginBottom: 1,
    borderRadius: 22,
    height: 26,
    color: "#fff",
    marginLeft: 10,
    backgroundColor: "#4753ff"
  },
  tag: {
    fontSize: 12,
    marginLeft: 5
  },
  tagRemove: {
    backgroundColor: "#fff",
    color: "#4753ff",
    width: 16,
    height: 16,
    borderRadius: "50%",
    "&:hover": {
      cursor: "pointer"
    }
  },
  tagRemoveIcon: {
    fontSize: "1rem"
  },
  tagInput: {
    flexGrow: 1,
    border: "none",
    backgroundColor: "#edf1f6",
    color: "#a2a5a9",
    "&:focus": {
      outline: "none"
    }
  },

  socialMediaIconBox: {
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
  instagramIconBtn: {
    color: "#fff",
    backgroundColor: "#da2b72",
    minWidth: 44,
    height: 44,
    borderRadius: 22,
    margin: "0px 10px",
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    padding: 0,
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
    padding: 0,
    "&:hover": {
      opacity: 0.7,
      backgroundColor: "#1da1f2"
    }
  },

  dayIsSelected: {
    color: "#08080d"
  },

  rightSide: {
    width: "40%",
    backgroundSize: "cover"
  },
  step1Img: {
    backgroundImage: "url('assets/images/step1.png')"
  },
  step2Img: {
    backgroundImage: "url('assets/images/step2.png')"
  },
  leftSide: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "right"
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: "#08080d"
  },
  text: {
    fontSize: 14,
    marginBottom: 50,
    fontWeight: 300,
    color: "#08080d"
  },
  tagWrapper: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    minHeight: 60,
    marginBottom: 30,
    position: "relative",
    borderRadius: 30,
    backgroundColor: "#edf1f6",
    border: "none",
    padding: "0px 22px",
    color: "#a2a5a9",
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    flexWrap: "wrap",
    "&::placeholder": {
      color: "#a2a5a9"
    }
  },
  tagHolder: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    marginTop: 1,
    marginBottom: 1,
    borderRadius: 22,
    height: 16,
    color: "#fff",
    marginLeft: 10,
    backgroundColor: "#4753ff",
    justifyContent: "center",
    alignItems: "center"
  },
  tag: {
    fontSize: 12,
    marginLeft: 5
  },
  tagRemove: {
    backgroundColor: "#fff",
    color: "#4753ff",
    width: 16,
    height: 16,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer"
    }
  },
  tagRemoveIcon: {
    fontSize: "1rem"
  },
  tagInput: {
    flexGrow: 1,
    border: "none",
    backgroundColor: "#edf1f6",
    color: "#a2a5a9",
    "&:focus": {
      outline: "none"
    }
  },
  nextBtn: {
    height: 60,
    width: 170,
    backgroundColor: "#fff",
    color: "#08080d",
    border: "solid 2px #08080d",
    borderRadius: 30
  },
  socialBox: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 30
  },
  socialIconBox: {
    width: 60,
    height: 60,
    position: "relative"
  },
  instagramIconBtn: {
    color: "#fff",
    backgroundColor: "#da2b72",
    minWidth: 60,
    height: 60,
    borderRadius: 30,
    // margin: "0px 10px",
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    padding: 0,
    "&:hover": {
      opacity: 0.7,
      backgroundColor: "#da2b72"
    }
  },
  twitterIconBtn: {
    color: "#fff",
    backgroundColor: "#1da1f2",
    minWidth: 60,
    height: 60,
    borderRadius: 30,
    // margin: "0px 10px",
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    padding: 0,
    "&:hover": {
      opacity: 0.7,
      backgroundColor: "#1da1f2"
    }
  },
  socialMediaIcon: {
    width: 60,
    height: 60,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "solid 5px rgba(0, 0, 0, 0.02)",
    borderRadius: 30,
    backgroundColor: "#edf1f6",
    color: "rgba(8, 8, 13, 0.5)"
  },
  check: {
    color: "#fff",
    backgroundColor: "#03d588",
    width: 18,
    height: 18,
    borderRadius: 22,
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  socialText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: 20
  },
  socialName: {
    color: "#08080d",
    fontSize: 14
  },
  socialTextMute: {
    color: "rgba(8, 8, 13, 0.5)",
    fontSize: 10
  },
  newQueryBtn: {
    width: 170,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4753ff",
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    color: "#fff",
    marginBottom: 15,
    "&:hover": {
      backgroundColor: "#0500cb"
    },
    "&:active": {
      opacity: 0.7
    }
  },
  btnLabel: {
    fontSize: 14,
    fontWeight: "bold"
  },
  prevBtn: {
    fontSize: 12,
    "&:hover": {
      cursor: "pointer"
    }
  }
});

class AddQueries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
  }

  goToNextStep = () => {
    this.setState({
      step: this.state.step + 1
    });
  };

  goToPrevStep = () => {
    this.setState({
      step: this.state.step - 1
    });
  };

  handleAddHashtag = e => {
    e.persist();
    if (e.keyCode == 13 && e.target.value != "") {
      this.props.changeGlobalVar({
        ...this.props.globalVar,
        hashtags: [...this.props.globalVar.hashtags, e.target.value]
      });
      e.target.value = "";
    }
  };

  handleRemoveHashtag = id => {
    var removed_list = [];
    this.props.globalVar.hashtags.map((item, index) => {
      if (index != id) {
        removed_list.push(item);
      }
    });
    this.props.changeGlobalVar({
      ...this.props.globalVar,
      hashtags: removed_list
    });
  };

  handleAddKeyword = e => {
    e.persist();
    if (e.keyCode == 13 && e.target.value != "") {
      this.props.changeGlobalVar({
        ...this.props.globalVar,
        keywords: [...this.props.globalVar.keywords, e.target.value]
      });
      e.target.value = "";
    }
  };

  handleRemoveKeyword = id => {
    var removed_list = [];
    this.props.globalVar.keywords.map((item, index) => {
      if (index != id) {
        removed_list.push(item);
      }
    });
    this.props.changeGlobalVar({
      ...this.props.globalVar,
      keywords: removed_list
    });
  };

  handleTwitterClick = () => {
    this.props.changeGlobalVar({
      ...this.props.globalVar,
      twitter: !this.props.globalVar.twitter
    });
  };

  handleInstagramClick = () => {
    this.props.changeGlobalVar({
      ...this.props.globalVar,
      instagram: !this.props.globalVar.instagram
    });
  };

  handleClickAddQueries = () => {
    this.props.goToAddQuery();
    this.props.changeComeFrom("boarding");
    this.props.selectPage("queries");
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.wrapper}>
        <div
          className={classNames(
            classes.rightSide,
            this.state.step == 1
              ? classes.step1Img
              : this.state.step == 2
              ? classes.step2Img
              : ""
          )}
        ></div>
        <div className={classes.leftSide}>
          {this.state.step == 1 ? (
            <div className={classes.content}>
              <Typography variant="body1" className={classes.title}>
                کلمه کلیدی یا هشتگ را برای آغاز ردیابی وارد کنید
              </Typography>
              <Typography variant="body1" className={classes.text}>
                شما می‌توانید برند، نام محصول، هشتگ، رقیب تجاری و یا موضوع خاصی
                را برای ردیابی وارد کنید
              </Typography>
              <div className={classes.tagWrapper}>
                {this.props.globalVar.hashtags.map((item, index) => {
                  return (
                    <div className={classes.tagHolder} key={index}>
                      <div className={classes.tag}>{item}</div>
                      <div
                        className={classes.tagRemove}
                        onClick={() => this.handleRemoveHashtag(index)}
                      >
                        <ClearIcon className={classes.tagRemoveIcon} />
                      </div>
                    </div>
                  );
                })}
                <input
                  type="text"
                  className={classes.tagInput}
                  placeholder="هشتگ مرتبط با ردیاب را وارد کنید"
                  id="instagram-users"
                  onKeyUp={e => this.handleAddHashtag(e)}
                />
              </div>
              <div className={classes.tagWrapper}>
                {this.props.globalVar.keywords.map((item, index) => {
                  return (
                    <div className={classes.tagHolder} key={index}>
                      <div className={classes.tag}>{item}</div>
                      <div
                        className={classes.tagRemove}
                        onClick={() => this.handleRemoveKeyword(index)}
                      >
                        <ClearIcon className={classes.tagRemoveIcon} />
                      </div>
                    </div>
                  );
                })}
                <input
                  type="text"
                  className={classes.tagInput}
                  placeholder="کلمات کلیدی مرتبط با ردیاب را وارد کنید"
                  id="instagram-users"
                  onKeyUp={e => this.handleAddKeyword(e)}
                />
              </div>
              <Button
                className={classes.nextBtn}
                onClick={() => this.goToNextStep()}
              >
                مرحله بعد
              </Button>
            </div>
          ) : this.state.step == 2 ? (
            <div className={classes.content}>
              <Typography variant="body1" className={classes.title}>
                ردیابی در کدام شبکه های اجتماعی انجام شود؟
              </Typography>
              <Typography variant="body1" className={classes.text}>
                ما تمام پست‌ها و نظرات مرتبط با کلمات کلیدی یا هشتگ‌ها را در این
                شبکه های اجتماعی برای شما تحلیل می‌کنیم.
              </Typography>
              <div className={classes.socialBox}>
                <div className={classes.socialIconBox}>
                  <IconButton
                    className={classes.instagramIconBtn}
                    onClick={() => this.handleInstagramClick()}
                  >
                    <i className="fab fa-instagram fa-sm"></i>
                  </IconButton>
                  {this.props.globalVar.instagram ? (
                    <span className={classes.check}>
                      <CheckIcon style={{fontSize: "0.8rem"}} />
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className={classes.socialText}>
                  <Typography variant="body1" className={classes.socialName}>
                    اینستاگرام
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.socialTextMute}
                  >
                    {this.props.globalVar.instagram
                      ? "انتخاب شده"
                      : "انتخاب نشده"}
                  </Typography>
                </div>
              </div>
              <div className={classes.socialBox}>
                <div className={classes.socialIconBox}>
                  <IconButton
                    className={classes.twitterIconBtn}
                    onClick={() => this.handleTwitterClick()}
                  >
                    <i className="fab fa-twitter fa-sm"></i>
                  </IconButton>
                  {this.props.globalVar.twitter ? (
                    <span className={classes.check}>
                      <CheckIcon style={{fontSize: "0.8rem"}} />
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className={classes.socialText}>
                  <Typography variant="body1" className={classes.socialName}>
                    توییتر
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.socialTextMute}
                  >
                    {this.props.globalVar.twitter
                      ? "انتخاب شده"
                      : "انتخاب نشده"}
                  </Typography>
                </div>
              </div>
              <Button
                classes={{
                  root: classes.newQueryBtn,
                  label: classes.btnLabel
                }}
                onClick={() => this.handleClickAddQueries()}
              >
                ساخت ردیاب
              </Button>
              <Typography
                variant="body1"
                className={classes.prevBtn}
                onClick={() => this.goToPrevStep()}
              >
                مرحله قبل
              </Typography>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

AddQueries.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    globalVar: state.globalVar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectPage: page => dispatch(selectPage(page)),
    changeAddQuery: data => dispatch(changeAddQuery(data)),
    changeGlobalVar: data => dispatch(changeGlobalVar(data)),
    goToAddQuery: () => dispatch(goToAddQuery()),
    changeComeFrom: comeFrom => dispatch(changeComeFrom(comeFrom))
  };
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(
//   withStyles(styles, {withTheme: true})(
//     GoogleApiWrapper({
//       apiKey: "AIzaSyA8W4yPrXzLkbPNOAoq5e2sGIcsjucBM1A"
//     })(AddQueries)
//   )
// );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(AddQueries));
