import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  dot: {
    borderRadius: "50%",
    width: 100,
    height: 100,
    backgroundColor: "green"
  }
});

class CustomizedActiveDot extends React.Component {
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
    const {classes, cx, cy} = this.props;

    return (
      //   <circle
      //     cx={cx - 10}
      //     cy={cy - 10}
      //     r={25}
      //     stroke="black"
      //     strokeWidth={3}
      //     fill="red"
      //   />
      //   <div class="dot"></div>
      <g id="UrTavla">
        <circle
          cx={cx}
          cy={cy}
          r={15}
          stroke="#fcfcfc"
          strokeWidth={3}
          fill="#fc4c81"
        ></circle>
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          fill="white"
          fontSize="10px"
          fontFamily="Arial"
          dy=".3em"
        >
          {/* {console.log(this.props)} */}
          {this.props.value[1]}
        </text>
      </g>
    );
  }
}

export default withStyles(styles, {withTheme: true})(CustomizedActiveDot);
