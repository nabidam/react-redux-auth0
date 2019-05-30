import React, {Component} from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {IconButton, Menu, MenuItem, Badge} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from "@material-ui/core/styles";

// const classes = theme => ({});

class Notifications extends Component {
  render() {
    // const {classes} = this.props;
    return (
      <div>
        <IconButton color="inherit">
          <Badge badgeContent={1} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </div>
    );
  }
}

// export default withStyles(classes)(Notifications);
export default Notifications;
