import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area
} from "recharts";

export default class PostsChart extends React.PureComponent {
  //   static propTypes = {
  //     data: React.PropTypes.array.isRequired
  //   };

  constructor(props) {
    super(props);

    this.area = null;
    this.tooltip = null;
    this.point = null;

    this.onChartMouseMove = this.onChartMouseMove.bind(this);
    this.onChartMouseLeave = this.onChartMouseLeave.bind(this);
  }

  onChartMouseMove(chart) {
    if (chart.isTooltipActive) {
      let point = this.area.props.points[chart.activeTooltipIndex];

      if (point != this.point) {
        this.point = point;
        this.updateTooltip();
      }
    }
  }

  onChartMouseLeave() {
    this.point = null;
    this.updateTooltip();
  }

  updateTooltip() {
    if (this.point) {
      let x = Math.round(this.point.x);
      let y = Math.round(this.point.y);

      this.tooltip.style.opacity = "1";
      this.tooltip.style.transform = `translate(${x}px, ${y}px)`;
      this.tooltip.childNodes[0].innerHTML = this.point.payload["value"];
    } else {
      this.tooltip.style.opacity = "0";
    }
  }

  render() {
    return (
      <div className="ui-chart">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="left-to-right"
        >
          <AreaChart
            height={150}
            data={this.state.data.reverse()}
            onMouseMove={this.onChartMouseMove}
            onMouseLeave={this.onChartMouseLeave}
          >
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4753ff" stopOpacity={1} />
                <stop offset="95%" stopColor="#4753ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="dayOfMonth">
              <Label value="تیر" position="right" offset={10} />
            </XAxis>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="posts"
              stroke="#4753ff"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#color)"
              ref={ref => (this.area = ref)}
              activeDot={<CustomizedActiveDot />}
            />
            <YAxis orientation="right" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="ui-chart-tooltip" ref={ref => (this.tooltip = ref)}>
          <div className="ui-chart-tooltip-content"></div>
        </div>
      </div>
    );
  }
}
