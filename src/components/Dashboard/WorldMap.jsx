import React, {Component} from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import {scaleLinear} from "d3-scale";
import {Tooltip, actions} from "redux-tooltip";

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto"
};

const popScale = scaleLinear()
  .domain([0, 100000000, 1400000000])
  .range(["#CFD8DC", "#607D8B", "#37474F"]);

const {show, hide} = actions;

class WorldMap extends Component {
  constructor() {
    super();
    this.handleMove = this.handleMove.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }
  handleMove(geography, evt) {
    const x = evt.clientX;
    const y = evt.clientY + window.pageYOffset;
    show({
      origin: {x, y},
      content: geography.properties.name
    });
  }
  handleLeave() {
    hide();
  }
  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 75,
            rotation: [-11, 0, 0]
          }}
          width={600}
          height={250}
          style={{
            width: "100%",
            height: "80%"
          }}
        >
          <ZoomableGroup center={[0, 20]}>
            <Geographies
              geography={"../../data/world-50m-with-population.json"}
            >
              {(geographies, projection) =>
                geographies.map((geography, i) => (
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    onClick={this.handleClick}
                    onMouseMove={this.handleMove(geography, event)}
                    onMouseLeave={this.handleLeave}
                    style={{
                      default: {
                        fill: popScale(geography.properties.pop_est),
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none"
                      },
                      hover: {
                        fill: "#263238",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none"
                      },
                      pressed: {
                        fill: "#263238",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none"
                      }
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}

export default WorldMap;
