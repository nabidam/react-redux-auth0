import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import {green} from "@material-ui/core/colors";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    // flexGrow: 1,
    transition: "0.3s"
  },
  close: {
    padding: theme.spacing(0.5)
  },
  success: {
    backgroundColor: green[600]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  pie: {
    backgroundImage: "radial-gradient(circle at 0 8%, #ec373c, #ffffff)",
    "&:hover": {
      transform: "scale(1.1)",
      cursir: "pointer"
    }
  },
  animated: {
    transition: ".2s ease-in-out"
  }
});

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "حس مثبت",
          value: 0.58,
          color: "#03d588"
        },
        {
          name: "حس منفی",
          value: 0.42,
          color: "#ec373c"
        }
      ],
      innerRadius: 300,
      outerRadius: 400,
      width: 150,
      height: 150,
      co: 1,
      hoveredPie: null,
      selectedEmotion: "",
      selectedPosts: "",
      selectedPercent: ""
    };

    this.handleHover = this.handleHover.bind(this);
    this.handleUnhover = this.handleUnhover.bind(this);
  }

  handleHover = (id, data) => {
    console.log(data);
    this.setState({
      co: 0.9,
      hoveredPie: id,
      selectedEmotion: data.name,
      selectedPosts: data.posts + " پست",
      selectedPercent: "%" + data.value
    });
  };

  handleUnhover = () => {
    this.setState({
      co: 1,
      hoveredPie: null,
      selectedEmotion: "",
      selectedPosts: "",
      selectedPercent: ""
    });
  };

  componentDidMount = () => {
    // console.log(points(12, 20));
  };

  render() {
    const {classes} = this.props;
    let cumulativePercent = 0;

    return (
      <div className={classes.root}>
        <svg
          height={this.props.height}
          width={this.props.width}
          style={{transform: "rotate(-90deg)"}}
          viewBox="-1.5 -1.5 3 3"
        >
          {this.props.data.map((item, index) => {
            const percent = cumulativePercent;

            const startX = Math.cos(2 * Math.PI * percent);
            const startY = Math.sin(2 * Math.PI * percent);
            console.log(index, startX, startY);

            if (startX >= 0.5 && startY >= -0.5) {
              var cx = 1;
              var cy = 0;
            } else if (startX <= 0.5 && startY >= 0.5) {
              var cx = 1;
              var cy = 1;
            } else if (startX <= -0.5 && startY <= 0.5) {
              var cx = 0;
              var cy = 1;
            } else if (startX >= -0.5 && startY <= -0.5) {
              var cx = 0;
              var cy = 0;
            }

            // console.log(startX, startY);
            cumulativePercent += item.value > 1 ? item.value / 100 : item.value;

            var endX = Math.cos(2 * Math.PI * cumulativePercent);
            var endY = Math.sin(2 * Math.PI * cumulativePercent);
            return (
              // <radialGradient cx="0" cy="0" r="1" id={"gradient-" + index}>
              //   <stop offset="0%" stop-color={item.color} />
              //   <stop offset="100%" stop-color="#fff" />
              // </radialGradient>
              <radialGradient
                key={index}
                id={"gradient-" + index}
                cx={cx}
                cy={cy}
                r="1"
              >
                {/* <stop
                    offset="0%"
                    style={{stopColor: "#fff", stopOpacity: 0.5}}
                  />
                  <stop
                    offset="100%"
                    style={{stopColor: item.color, stopOpacity: 1}}
                  /> */}
                <stop
                  offset="10%"
                  style={{stopColor: "#fff", stopOpacity: 1}}
                />
                {/* <stop
                    offset="95%"
                    style={{stopColor: item.color, stopOpacity: 1}}
                  /> */}
                <stop
                  offset="90%"
                  style={{stopColor: item.color, stopOpacity: 1}}
                />
              </radialGradient>
            );
          })}
          <defs>
            {/* <mask id="centrehole">
              <rect
                x="-100%"
                y="-100%"
                width="200%"
                height="200%"
                fill="white"
              /> */}
            {/* <circle
                cx="0"
                cy="0"
                r={
                  this.state.hoveredPie == index *
                  (this.props.innerRadius / this.props.outerRadius)
                }
                fill="black"
              /> */}
            {this.props.data.map((item, index) => {
              const percent = cumulativePercent;
              var startX = Math.cos(2 * Math.PI * (percent - 0.01));
              var startY = Math.sin(2 * Math.PI * (percent - 0.01));
              cumulativePercent +=
                item.value > 1 ? item.value / 100 : item.value;
              var scaledRadius =
                this.props.innerRadius / this.props.outerRadius;

              scaledRadius =
                this.state.hoveredPie == index
                  ? 0.8 * scaledRadius
                  : scaledRadius;

              // var r = Math.sqrt(Math.pow(startX, 2) + Math.pow(startY, 2));
              // var theta = Math.atan(startY / startX);
              // var r_prime = r * scaledRadius;
              // var startX = r_prime * Math.cos(theta);
              // var startY = r_prime * Math.sin(theta);

              var endX = Math.cos(2 * Math.PI * cumulativePercent);
              var endY = Math.sin(2 * Math.PI * cumulativePercent);

              // var r = Math.sqrt(Math.pow(endX, 2) + Math.pow(startX, 2));
              // var theta = Math.atan(endY / endX);
              // var r_prime = r * scaledRadius;
              // var endX = r_prime * Math.cos(theta);
              // var endY = r_prime * Math.sin(theta);

              const largeArcFlag =
                (item.value > 1 ? item.value / 100 : item.value) > 0.5 ? 1 : 0;

              // create an array and join it just for code readability
              const pathData = [
                `M ${startX} ${startY}`, // Move
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                `L 0 0` // Line
              ].join(" ");

              return (
                // <path
                //   key={"path-" + index}
                //   d={pathData}
                //   fill="#000"
                //   transform={"scale(" + scaledRadius + ")"}
                // ></path>
                <mask id={"centrehole-" + index} key={index}>
                  <rect
                    x="-100%"
                    y="-100%"
                    width="200%"
                    height="200%"
                    fill="white"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r={scaledRadius}
                    fill="#000"
                    className={classes.animated}
                  />
                </mask>
              );
            })}
            {/* </mask> */}
          </defs>

          <g>
            {this.props.data.map((item, index) => {
              const percent = cumulativePercent;
              const startX = Math.cos(2 * Math.PI * percent);
              const startY = Math.sin(2 * Math.PI * percent);
              console.log(startX, startY);
              cumulativePercent +=
                item.value > 1 ? item.value / 100 : item.value;
              const endX = Math.cos(2 * Math.PI * cumulativePercent);
              const endY = Math.sin(2 * Math.PI * cumulativePercent);
              const largeArcFlag =
                (item.value > 1 ? item.value / 100 : item.value) > 0.5 ? 1 : 0;

              // create an array and join it just for code readability
              const pathData = [
                `M ${startX} ${startY}`, // Move
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                `L 0 0` // Line
              ].join(" ");

              return (
                <path
                  className={classNames(classes.animated, classes.pie)}
                  mask={"url(#centrehole-" + index + ")"}
                  key={"path-" + index}
                  d={pathData}
                  fill={"url(#gradient-" + index + ")"}
                  onMouseEnter={() => this.handleHover(index, item)}
                  onMouseLeave={() => this.handleUnhover()}
                ></path>
              );
            })}
          </g>
          <g>
            {this.props.data.map((item, index) => {
              // const percent = cumulativePercent;
              // const startX = Math.cos(2 * Math.PI * percent);
              // const startY = Math.sin(2 * Math.PI * percent);
              cumulativePercent +=
                item.value > 1 ? item.value / 100 : item.value;
              const endX = Math.cos(2 * Math.PI * cumulativePercent);
              const endY = Math.sin(2 * Math.PI * cumulativePercent);
              const largeArcFlag =
                (item.value > 1 ? item.value / 100 : item.value) > 0.5 ? 1 : 0;

              const radius =
                this.props.outerRadius -
                (this.props.outerRadius - this.props.innerRadius) / 2;
              const scaledRadius = radius / this.props.outerRadius;
              const circleRadius =
                (this.props.outerRadius - this.props.innerRadius) /
                2 /
                this.props.outerRadius;

              return (
                <circle
                  className={classes.animated}
                  key={"circle-" + index}
                  cx={endX * scaledRadius}
                  cy={endY * scaledRadius}
                  r={
                    this.state.hoveredPie == index
                      ? circleRadius + 0.09
                      : circleRadius
                  }
                  // r={circleRadius}
                  fill={item.color}
                  // transform={this.state.hoveredPie == index ? "scale(1.1)" : ""}
                />
                // <circle cx={startX} cy={startY} r={0.1} fill="black" />
              );
            })}
            <text
              x="0"
              y="-0.3px"
              textAnchor="middle"
              fill="#adb2b9"
              fontSize="0.15px"
              fontFamily="Arial"
              dy=".3em"
              transform="rotate(90)"
            >
              {this.state.selectedEmotion}
              {/* <tspan dy="-0.4px" dx="0" textLength="1px">
                {this.state.selectedEmotion}
              </tspan>
              <tspan dy="+0.4px" dx="-0.6px" textLength="1px">
                {this.state.selectedPosts}{" "}
              </tspan>
              <tspan dy="+0.4px" dx="-0.6px" textLength="1px">
                {this.state.selectedPercent}
              </tspan> */}
            </text>
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fill="black"
              fontSize="0.2px"
              fontFamily="Arial"
              dy=".3em"
              transform="rotate(90)"
            >
              {this.state.selectedPosts}
            </text>
            <text
              x="0"
              y="0.3px"
              textAnchor="middle"
              fill="#adb2b9"
              fontSize="0.15px"
              fontFamily="Arial"
              dy=".3em"
              transform="rotate(90)"
            >
              {this.state.selectedPercent}
            </text>
          </g>
        </svg>
      </div>
    );
  }
}

export default withStyles(styles)(PieChart);
