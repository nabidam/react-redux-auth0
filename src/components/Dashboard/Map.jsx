import {Component} from "react";
import React from "react";

// import ReactMapGL from "react-map-gl";
import Mapir from "mapir-react-component";

require("dotenv").config();

const map = Mapir.setToken({
  transformRequest: url => {
    return {
      url: url,
      headers: {
        "x-api-key":
          "KdiACT2Y5JqGutkbn7OZkmimPv3_PdzyEN3fJPbLlOA70El_3sa42IgdN26uQwSY_rKQLqZ1fujWCIp5GI5n9fNBwX36yD8DFua6gMByiWkIqG2zz_D6tjoxhJzIjGXamkMlkH_ew"
      } //Mapir access token
    };
  }
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    };
    // this.handleChangeViewport = this.handleChangeViewport.bind(this);
  }

  //   handleChangeViewport = viewport => {
  //     this.setState({viewport});
  //   };

  render() {
    return <Mapir Map={map} />;
  }
}

export default Map;
