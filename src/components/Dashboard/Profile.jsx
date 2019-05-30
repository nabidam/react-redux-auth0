import React, {Component} from "react";
// import {} from "@material-ui/icons";
import {Menu, MenuItem, IconButton} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10
  },
  avatarIcon: {
    width: 48,
    height: 48
  }
}));

const Profile = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
    <div>
      <IconButton
        className={classes.avatarIcon}
        size="small"
        aria-owns={open ? "menu-appbar" : undefined}
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar
          alt="Remy Sharp"
          src="https://material-ui.com/static/images/avatar/1.jpg"
          className={classes.avatar}
        />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>پروفایل</MenuItem>
      </Menu>
    </div>
  );
}

export default Profile;
