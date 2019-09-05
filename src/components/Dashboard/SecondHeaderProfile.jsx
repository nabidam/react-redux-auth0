import React, {Component} from "react";
// import {} from "@material-ui/icons";
import {Menu, MenuItem, IconButton, Popover} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  chevronIcon: {
    width: 30,
    height: 30,
    marginRight: 15
  },
  avatarIcon: {
    width: 48,
    height: 48
  },
  profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 36,
    "&:hover": {
      color: "#4753ff",
      cursor: "pointer"
    }
  },
  profileName: {
    paddingLeft: 10
  }
}));

const SecondHeaderProfile = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div
        className={classes.profile}
        aria-owns={open ? "menu-appbar" : undefined}
        aria-haspopup="true"
        onClick={handleMenu}
      >
        {/* <Paper
            className={classes.profileNamePaper}
            component={Button}
            variant="contained"
          >
            <Grid container wrap="nowrap">
              <Grid item xs zeroMinWidth className={classes.headerItem}> */}
        <Typography variant="p" component="p" className={classes.profileName}>
          maryam
        </Typography>
        {/* </Grid>
            </Grid>
          </Paper> */}
        <IconButton className={classes.avatarIcon} size="small" color="inherit">
          <Avatar
            alt="Remy Sharp"
            src="https://material-ui.com/static/images/avatar/1.jpg"
            className={classes.avatar}
          />
        </IconButton>
      </div>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        id="menu-appbar"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>پروفایل</MenuItem>
      </Popover>
    </div>
  );
};

export default SecondHeaderProfile;
