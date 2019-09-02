import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Button} from "@material-ui/core";
import {connect} from "react-redux";
import triggerDrawer from "../../actions/triggerDrawer";
import Icon from "@material-ui/core/Icon";
import Collapse from "@material-ui/core/Collapse";
import InputBase from "@material-ui/core/InputBase";
import Backdrop from "@material-ui/core/Backdrop";
import Dialog from "@material-ui/core/Dialog";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InsertChart from "@material-ui/icons/InsertChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InfoIcon from "@material-ui/icons/InfoOutlined";
// import ChevronDown from "@material-ui/icons/ChevronDown";
import BookIcon from "@material-ui/icons/BookOutlined";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import TrafficIcon from "@material-ui/icons/Traffic";
import PeopleIcon from "@material-ui/icons/People";
import PublicIcon from "@material-ui/icons/Public";
import addQuery from "../../actions/addQuery";
import selectQueryMenu from "../../actions/selectQueryMenu";
import history from "../../history";
import BootstrapTooltip from "./BSTooltip";

const drawerWidth = 260;

const styles = theme => ({
  root: {
    display: "flex",
    zIndex: "unset"
  },
  rootSQ: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 520,
    height: 44,
    borderBottomLeftRadius: "unset",
    borderBottomRightRadius: "unset",
    boxShadow: "unset",
    borderBottom: "6px solid #edf1f6"
  },
  inputSQ: {
    marginLeft: 8,
    flex: 1
  },
  iconButtonSQ: {
    padding: 10,
    color: "#08080d"
  },
  showClearBtn: {
    display: "block"
  },
  hideClearBtn: {
    display: "none"
  },
  dividerSQ: {
    width: 1,
    height: 28,
    margin: 4
  },
  button: {
    fontSize: 14,
    margin: theme.spacing(1),
    margin: 8,
    width: 196,
    backgroundColor: "#3340ff",
    color: "#fff",
    height: 56,
    borderRadius: 28,
    "&:hover": {
      backgroundColor: "#0500cb"
    }
  },
  nested: {
    paddingRight: theme.spacing(3),
    fontSize: 11,
    paddingTop: 0,
    paddingBot: 0
  },
  selectedNested: {
    color: "#4753ff",
    "&::after": {
      content: `""`,
      position: "absolute",
      left: 24,
      width: 6,
      height: 6,
      background: "#4753ff",
      borderRadius: "50%"
    }
  },
  hide: {
    display: "none"
  },
  drawer: {
    position: "relative",
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  rtlToolBar: {
    direction: "rtl"
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...theme.mixins.toolbar
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  backBtn: {
    padding: 0
  },
  listItem: {
    heigth: 44,
    width: 226,
    "&:hover": {
      color: "#4753ff",
      cursor: "pointer"
    }
  },
  backBtnItem: {
    paddingBottom: 0
  },
  listItemx: {
    width: "unset",
    "&::after": {
      content: `""`,
      display: "block",
      margin: "auto",
      position: "absolute",
      right: 16,
      bottom: 0,
      width: 488,
      height: 2,
      background: "#e2e6ea"
    },
    paddingLeft: 24,
    paddingRight: 24,
    "&:last-child::after": {
      display: "none"
    },
    "&:hover": {
      backgroundColor: "#eff3f7",
      color: "#4753ff",
      cursor: "pointer"
    }
  },
  listItemTextMeta: {
    color: "#bfc7d1",
    marginLeft: 14
  },
  iconChevronList: {
    minWidth: "unset",
    color: "#08080d"
  },
  listItemIcon: {
    minWidth: 32
  },
  backBtnIcon: {
    minWidth: 16,
    color: "#000",
    marginLeft: 6
  },
  listItemSelectQuery: {
    paddingLeft: 0,
    paddingRight: 0
  },
  selectQuery: {
    fontSize: 12,
    margin: theme.spacing(1),
    // margin: 8,
    paddingRight: 19,
    width: 226,
    backgroundColor: "#edf1f6",
    color: "#08080d",
    height: 44,
    borderRadius: 22,
    justifyContent: "right"
    // "&:hover": {
    //   backgroundColor: "#0500cb"
    // }
  },
  selectQueryIcon: {
    display: "flex",
    position: "absolute",
    left: "19px"
  },
  selectQueryDialog: {
    position: "absolute",
    right: 0
  },
  selectedListItem: {
    color: "#4753ff"
  },
  selectQueryPaper: {
    width: 520,
    height: 305
  },
  selectQueryList: {
    paddingTop: 0,
    width: 520,
    height: 305
  },
  backdrop: {
    zIndex: "unset"
  },
  divider: {
    display: "flex",
    justifyContent: "center",
    color: "#e2e6ea",
    width: "75%",
    margin: "0 auto"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%"
  },
  footerIcon: {
    fontSize: "1.5em",
    "&:hover": {
      backgroundColor: "unset",
      color: "#4753ff"
    }
  },
  leftIcon: {
    position: "absolute",
    right: "75%"
  },
  primaryText: {
    fontSize: 18
  }
});

class QueriesSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryUsername: "",
      menuOpen: false,
      newQueryDialog: false,
      isUsernameEntered: true,
      isSelectQueryOpen: false,
      selectQueryAnchorEl: null,
      selectQueryId: undefined,
      isClearBtnShow: false,
      searchQueryString: "",
      seachedQueries: []
    };

    this.handleChangeSearchQueryString = this.handleChangeSearchQueryString.bind(
      this
    );
    this.handleClearSearchQueryString = this.handleClearSearchQueryString.bind(
      this
    );
    this.handleClickSelectQuery = this.handleClickSelectQuery.bind(this);
    this.handleCloseSelectQuery = this.handleCloseSelectQuery.bind(this);
    this.handleClickMenu = this.handleClickMenu.bind(this);
    this.handleSelectQueryMenu = this.handleSelectQueryMenu.bind(this);
    this.handleNewQueryDialog = this.handleNewQueryDialog.bind(this);
    this.handleChangeQueryUsername = this.handleChangeQueryUsername.bind(this);
    this.handleAddQuery = this.handleAddQuery.bind(this);
  }

  handleChangeSearchQueryString = event => {
    var searched_query = event.target.value.toUpperCase();
    var queries = this.props.latestQueries;
    var searched_queries = [];
    queries.map((item, index) => {
      if (item.name.toUpperCase().indexOf(searched_query) > -1) {
        searched_queries.push(item);
      }
    });

    this.setState({
      searchQueryString: event.target.value,
      seachedQueries: searched_queries
    });
  };

  handleClearSearchQueryString = () => {
    this.setState({
      searchQueryString: ""
    });
  };

  handleClickSelectQuery = event => {
    // console.log(event.currentTarget);

    this.setState({
      selectQueryAnchorEl: event.currentTarget,
      isSelectQueryOpen: Boolean(event.currentTarget)
    });
  };

  handleCloseSelectQuery = () => {
    this.setState({
      selectQueryAnchorEl: null,
      isSelectQueryOpen: false
    });
  };

  handleClickMenu = () => {
    this.setState({menuOpen: !this.state.menuOpen});
  };

  handleSelectQueryMenu = item => {
    this.props.selectQueryMenu(item.id, item.name);
    this.setState({
      selectQueryAnchorEl: null,
      isSelectQueryOpen: false
    });

    history.push("/dashboard/queries");
  };

  handleNewQueryDialog = () => {
    history.push("/dashboard/add-query");
    // this.setState({newQueryDialog: !this.state.newQueryDialog});
  };

  handleChangeQueryUsername = event => {
    this.setState({queryUsername: event.target.value});
    if (event.target.value == "") {
      this.setState({isUsernameEntered: false});
    } else {
      this.setState({isUsernameEntered: true});
    }
  };

  handleAddQuery = () => {
    if (this.state.queryUsername != "") {
      this.handleNewQueryDialog();
      this.setState({queryUsername: ""});
      this.props.addQuery(this.state.queryUsername);
    } else {
      this.setState({isUsernameEntered: false});
    }
  };

  // componentDidMount = () => {
  //   this.setState({isSelectQueryOpen: Boolean(this.state.selectQueryAnchorEl)});
  //   const selectQueryId = this.state.isSelectQueryOpen
  //     ? "simple-popover"
  //     : undefined;
  // };

  render() {
    const {classes, theme} = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        // anchor="right"
      >
        <div className={classes.toolbar} />
        <List
          className={classNames(classes.list, classes.backBtn)}
          component="nav"
        >
          <ListItem
            className={classNames(classes.listItem, classes.backBtnItem)}
          >
            <div className={classes.backBtnIcon}>
              <i className="fas fa-arrow-right" />
            </div>
            <ListItemText className="list-item-right">
              بازگشت به لیست ردیاب‌ها
            </ListItemText>
          </ListItem>
        </List>
        <List className={classes.list} component="nav">
          <ListItem
            className={classNames(
              classes.listItem,
              classes.listItemSelectQuery
            )}
          >
            <Button
              color="primary"
              aria-describedby={this.state.selectQueryId}
              className={classes.selectQuery}
              onClick={event => this.handleClickSelectQuery(event)}
            >
              {this.props.selectedQueryMenu
                ? this.props.selectedQueryMenu.name
                : "انتخاب ردیاب"}
              <div className={classes.selectQueryIcon}>
                <i className="fas fa-chevron-down" />
              </div>
            </Button>
            {/* <Dialog
              className={classes.selectQueryDialog}
              open={this.state.isSelectQueryOpen}
              onClose={() => this.handleClickSelectQuery()}
              aria-labelledby="selectQuery"
              maxWidth="xs"
              component={Popover}
              top={0}
              right={0}
            >
              <DialogTitle className="list-item-right" id="selectQuery">
                ایجاد کوئری جدید
              </DialogTitle>
              <DialogContent>
                <DialogContentText className="list-item-right">
                  نام کاربری مورد نظر را وارد کنید:
                </DialogContentText>
              </DialogContent>
            </Dialog> */}
            <Backdrop
              className={classes.backdrop}
              open={this.state.isSelectQueryOpen}
              invisible={false}
            />
            <Popover
              open={this.state.isSelectQueryOpen}
              id={this.state.selectQueryId}
              onClose={() => this.handleCloseSelectQuery()}
              anchorEl={this.state.selectQueryAnchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
            >
              <div className="popover">
                <Paper className={classes.rootSQ}>
                  <IconButton
                    className={classes.iconButtonSQ}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    value={this.state.searchQueryString}
                    onChange={this.handleChangeSearchQueryString}
                    className={classes.inputSQ}
                    placeholder="جستجو در ردیاب‌ها"
                    inputProps={{"aria-label": "search queries"}}
                  />
                  <IconButton
                    color="primary"
                    className={classNames(
                      classes.iconButtonSQ,
                      this.state.searchQueryString != ""
                        ? classes.showClearBtn
                        : classes.hideClearBtn
                    )}
                    onClick={this.handleClearSearchQueryString}
                    aria-label="clear"
                  >
                    <CloseIcon />
                  </IconButton>
                </Paper>
                <List component="nav" className={classes.selectQueryList}>
                  {this.state.searchQueryString != ""
                    ? this.state.seachedQueries.map((item, index) => {
                        return (
                          <ListItem
                            className={classNames(classes.listItemx)}
                            key={item.id}
                            button
                            onClick={() => this.handleSelectQueryMenu(item)}
                          >
                            <ListItemText className="list-item-right">
                              {item.name}
                            </ListItemText>
                            <ListItemText className={classes.listItemTextMeta}>
                              {item.created_at}
                            </ListItemText>
                            <ListItemIcon className={classes.iconChevronList}>
                              <ChevronLeft />
                            </ListItemIcon>
                          </ListItem>
                        );
                      })
                    : this.props.latestQueries.map((item, index) => {
                        return (
                          <ListItem
                            className={classNames(classes.listItemx)}
                            key={item.id}
                            button
                            onClick={() => this.handleSelectQueryMenu(item)}
                          >
                            <ListItemText className="list-item-right">
                              {item.name}
                            </ListItemText>
                            <ListItemText className={classes.listItemTextMeta}>
                              {item.created_at}
                            </ListItemText>
                            <ListItemIcon className={classes.iconChevronList}>
                              <ChevronLeft />
                            </ListItemIcon>
                          </ListItem>
                        );
                      })}
                </List>
              </div>
            </Popover>
          </ListItem>
          <Collapse
            in={this.props.selectedQueryMenu}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem
                className={classNames(
                  classes.nested,
                  classes.listItem,
                  classes.selectedNested
                )}
              >
                <ListItemText
                  primary="میز کار"
                  className="list-item-right level-2-items"
                />
              </ListItem>
              <ListItem
                className={classNames(classes.nested, classes.listItem)}
              >
                <ListItemText
                  primary="پست‌ها"
                  className="list-item-right level-2-items"
                />
              </ListItem>
              <ListItem
                className={classNames(classes.nested, classes.listItem)}
              >
                <ListItemText
                  primary="عبارات خاص"
                  className="list-item-right level-2-items"
                />
              </ListItem>
              <ListItem
                className={classNames(classes.nested, classes.listItem)}
              >
                <ListItemText
                  primary="کنارش‌ها"
                  className="list-item-right level-2-items"
                />
              </ListItem>
              <ListItem
                className={classNames(classes.nested, classes.listItem)}
              >
                <ListItemText
                  primary="افراد مؤثر"
                  className="list-item-right level-2-items"
                />
              </ListItem>
              <ListItem
                className={classNames(classes.nested, classes.listItem)}
              >
                <ListItemText
                  primary="حس موجود"
                  className="list-item-right level-2-items"
                />
              </ListItem>
              <ListItem
                className={classNames(classes.nested, classes.listItem)}
              >
                <ListItemText
                  primary="دسته‌بندی‌ها"
                  className="list-item-right level-2-items"
                />
              </ListItem>
              <ListItem
                className={classNames(classes.nested, classes.listItem)}
              >
                <ListItemText
                  primary="مکان مرتبط"
                  className="list-item-right level-2-items"
                />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <List className={classes.footer} component="nav">
          <Divider className={classes.divider} />
          <ListItem>
            <BootstrapTooltip title="راهنمای سیستم">
              <IconButton color="inherit" className={classes.footerIcon}>
                <BookIcon />
              </IconButton>
            </BootstrapTooltip>
            <BootstrapTooltip title="پرسش">
              <IconButton color="inherit" className={classes.footerIcon}>
                <i className="far fa-question-circle" />
              </IconButton>
            </BootstrapTooltip>
            <BootstrapTooltip title="اطلاعات">
              <IconButton
                color="inherit"
                className={classNames(classes.footerIcon, classes.leftIcon)}
              >
                <InfoIcon />
              </IconButton>
            </BootstrapTooltip>
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

QueriesSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isDrawerOpen: PropTypes.bool,
  triggerDrawer: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isDrawerOpen: state.isDrawerOpen,
    latestQueries: state.latestQueries,
    selectedQueryMenu: state.selectedQueryMenu
  };
};

const mapDispatchToProps = dispatch => {
  return {
    triggerDrawer: () => dispatch(triggerDrawer()),
    addQuery: username => dispatch(addQuery(username)),
    selectQueryMenu: (id, name) => dispatch(selectQueryMenu(id, name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(QueriesSidebar));
