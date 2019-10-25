import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
    position: "relative"
  },
  content: {
    width: 50,
    height: 50,
    backgroundColor: "#000",
    top: 0,
    left: 0
    // position: "absolute"
  }
});

class CustomizedTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainHeaderPages: [
        "queries",
        "traffic-analysis",
        "influencers",
        "accounts",
        "projects",
        "trends"
      ]
    };
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>x</div>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(CustomizedTooltip);
