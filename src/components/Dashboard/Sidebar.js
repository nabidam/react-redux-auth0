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
import Icon from '@material-ui/core/Icon';
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InsertChart from "@material-ui/icons/InsertChart";
import DashboardIcon from "@material-ui/icons/Dashboard";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: "flex"
    },
    nested: {
        paddingRight: theme.spacing(4),
        fontSize: "0.7em"
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
    bgGreen: {
        color: "#fff",
        backgroundColor: "rgb(18, 222, 38)",
        "&:hover": {
            backgroundColor: "rgb(0, 179, 18)"
        }
    }
});

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        };

        this.handleClickMenu = this.handleClickMenu.bind(this);
    }

    handleClickMenu = () => {
        this.setState({menuOpen: !this.state.menuOpen});
    }

    render() {
        const {classes, theme} = this.props;
        return (
            <Drawer
                anchor="right"
                className={classNames(classes.drawer, {
                    [classes.drawerOpen]: this.props.isDrawerOpen,
                    [classes.drawerClose]: !this.props.isDrawerOpen
                })}
                classes={{
                    paper: classNames({
                        [classes.drawerOpen]: this.props.isDrawerOpen,
                        [classes.drawerClose]: !this.props.isDrawerOpen
                    })
                }}
                open={this.props.isDrawerOpen}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.props.triggerDrawer}>
                            {theme.direction === "rtl" ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button className={classes.bgGreen}>
                            <ListItemIcon>
                                <Icon>
                                    <i className="fas fa-plus"></i>
                                </Icon>
                            </ListItemIcon>
                            <ListItemText className="list-item-right">ایجاد کوئری جدید</ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <List component="nav" >
                        <ListItem button selected={true}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText className="list-item-right">میز کار</ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => this.handleClickMenu()}>
                            <ListItemIcon>
                                <InsertChart />
                            </ListItemIcon>
                            <ListItemText primary="سرویس‌ها" className="list-item-right"/>
                            {this.state.menuOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.menuOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="پست‌ها"  className="list-item-right level-2-items"/>
                                </ListItem>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="کلمات کلیدی"  className="list-item-right level-2-items"/>
                                </ListItem>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="اینفلوئنسرها"  className="list-item-right level-2-items"/>
                                </ListItem>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="احساس‌سنج"  className="list-item-right level-2-items"/>
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem button>
                            <ListItemIcon>
                                <Icon>
                                    <i className="fas fa-users fa-xs"></i>
                                </Icon>
                            </ListItemIcon>
                            <ListItemText primary="شبکه‌های اجتماعی" className="list-item-right"/>
                        </ListItem>
                    </List>
                    <Divider />
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
            triggerDrawer: () => dispatch(triggerDrawer())
        };
    };

    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(styles, {withTheme: true})(Sidebar));
