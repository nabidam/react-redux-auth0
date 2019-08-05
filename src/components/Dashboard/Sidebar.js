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
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InsertChart from "@material-ui/icons/InsertChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import BookIcon from "@material-ui/icons/BookOutlined";
import addQuery from "../../actions/addQuery";
import history from "../../history";
import BootstrapTooltip from "./BSTooltip";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  button: {
    fontSize: 14,
    margin: theme.spacing(1),
    margin: 8,
    width: "85%",
    backgroundColor: "#3340ff",
    color: "#fff",
    height: 56,
    borderRadius: 28,
    "&:hover": {
      backgroundColor: "#0500cb"
    }
  },
  nested: {
    paddingRight: theme.spacing(4),
    fontSize: "0.7em"
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
  bgGreen: {
    // color: "#fff",
    // backgroundColor: "rgb(18, 222, 38)",
    // "&:hover": {
    //   backgroundColor: "rgb(0, 179, 18)"
    // }
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  },
  listItem: {
    "&:hover": {
      color: "#4753ff",
      cursor: "pointer"
    }
  },
  selectedListItem: {
    color: "#4753ff"
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

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryUsername: "",
      menuOpen: false,
      newQueryDialog: false,
      isUsernameEntered: true
    };

    this.handleClickMenu = this.handleClickMenu.bind(this);
    this.handleNewQueryDialog = this.handleNewQueryDialog.bind(this);
    this.handleChangeQueryUsername = this.handleChangeQueryUsername.bind(this);
    this.handleAddQuery = this.handleAddQuery.bind(this);
  }

  handleClickMenu = () => {
    this.setState({menuOpen: !this.state.menuOpen});
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
        <div className={classes.toolbar}>
          <Typography
            variant="h5"
            component="p"
            className={classes.primaryText}
          >
            ــدادهـــ ـکاویـــ
          </Typography>
        </div>
        <List>
          <ListItem>
            <Button
              color="primary"
              className={classes.button}
              onClick={() => {
                history.push("/dashboard/add-query");
              }}
            >
              ردیاب جدید
            </Button>
          </ListItem>
          <Dialog
            open={this.state.newQueryDialog}
            onClose={() => this.handleNewQueryDialog()}
            aria-labelledby="newQuery"
            maxWidth="xs"
          >
            <DialogTitle className="list-item-right" id="newQuery">
              ایجاد کوئری جدید
            </DialogTitle>
            <DialogContent>
              <DialogContentText className="list-item-right">
                نام کاربری مورد نظر را وارد کنید:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="username"
                type="text"
                fullWidth
                value={this.state.queryUsername}
                onChange={this.handleChangeQueryUsername}
                error={!this.state.isUsernameEntered}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.handleNewQueryDialog()}
                color="primary"
              >
                لغو
              </Button>
              <Button onClick={() => this.handleAddQuery()} color="primary">
                ثبت
              </Button>
            </DialogActions>
          </Dialog>
        </List>
        {/* <Divider /> */}
        <List component="nav">
          <ListItem
            className={classNames(classes.listItem, classes.selectedListItem)}
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText className="list-item-right">میز کار</ListItemText>
          </ListItem>
          <ListItem
            className={classes.listItem}
            onClick={() => this.handleClickMenu()}
          >
            <ListItemIcon>
              <InsertChart />
            </ListItemIcon>
            <ListItemText primary="سرویس‌ها" className="list-item-right" />
            {this.state.menuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.menuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
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
                  primary="کلمات کلیدی"
                  className="list-item-right level-2-items"
                />
              </ListItem>
              <ListItem
                className={classNames(classes.nested, classes.listItem)}
              >
                <ListItemText
                  primary="اینفلوئنسرها"
                  className="list-item-right level-2-items"
                />
              </ListItem>
              <ListItem
                className={classNames(classes.nested, classes.listItem)}
              >
                <ListItemText
                  primary="احساس‌سنج"
                  className="list-item-right level-2-items"
                />
              </ListItem>
            </List>
          </Collapse>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <Icon>
                <i className="fas fa-users fa-xs" />
              </Icon>
            </ListItemIcon>
            <ListItemText
              primary="شبکه‌های اجتماعی"
              className="list-item-right"
            />
          </ListItem>
        </List>
        <Divider className={classes.divider} />
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

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isDrawerOpen: PropTypes.bool,
  triggerDrawer: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isDrawerOpen: state.isDrawerOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    triggerDrawer: () => dispatch(triggerDrawer()),
    addQuery: username => dispatch(addQuery(username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Sidebar));
