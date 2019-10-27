import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from "axios";
import ReactMapboxGl, {Layer, Feature, Marker} from "react-mapbox-gl";
import Mapir from "mapir-react-component";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmFiaWRhbSIsImEiOiJjazFsejVrdXgwYWFiM2hwY2xzcng2YnRvIn0.9oIMFnFAebsE812OCde1Fw";

mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js"
);

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibmFiaWRhbSIsImEiOiJjazFsejVrdXgwYWFiM2hwY2xzcng2YnRvIn0.9oIMFnFAebsE812OCde1Fw"
});

// const Map = Mapir.setToken({
//   transformRequest: url => {
//     return {
//       url: url,
//       headers: {
//         "x-api-key":
//           "KdiACT2Y5JqGutkbn7OZkmimPv3_PdzyEN3fJPbLlOA70El_3sa42IgdN26uQwSY_rKQLqZ1fujWCIp5GI5n9fNBwX36yD8DFua6gMByiWkIqG2zz_D6tjoxhJzIjGXamkMlkH_ew"
//       } //Mapir access token
//     };
//   }
// });

const styles = theme => ({
  wrapper: {
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: "#fff"
  },
  root: {
    display: "flex",
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    height: 80,
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  content: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    // direction: "rtl",
    flexGrow: 1,
    // padding: theme.spacing(3),
    marginRight: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },

  container: {
    paddingTop: 10
  },
  labelBox: {
    display: "flex",
    flexDirection: "row",
    padding: "20px 0px"
  },
  input: {
    width: "100%",
    height: 44,
    position: "relative",
    borderRadius: 22,
    backgroundColor: "#edf1f6",
    border: "none",
    padding: "0px 22px",
    color: "#a2a5a9",
    display: "flex",
    justifyContent: "right",
    "&::placeholder": {
      color: "#a2a5a9"
    }
  },
  bulbIcon: {
    width: 22,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#adb2b9"
  },
  map: {
    width: "100%",
    height: "100%"
  },
  mapBox: {
    height: 180,
    position: "relative"
  },
  mapDiv: {
    height: "100%",
    width: "100%"
  },
  chevronDownIcon: {
    display: "flex",
    position: "absolute",
    left: "19px",
    color: "#08080d"
  }
});

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   lng: 54.4504,
      //   lat: 33.1064,
      //   zoom: 5
      center: [51.4124, 35.7325],
      lng: 51.4124,
      lat: 35.7325,
      zoom: 13.89
    };
  }

  handleMoveMap = e => {
    // console.log(e.getCenter());
    this.setState({
      center: [e.getCenter().lng.toFixed(4), e.getCenter().lat.toFixed(4)],
      zoom: e.getZoom().toFixed(2)
    });
  };

  componentDidMount() {
    this.setState({
      center: this.props.center
    });
    // const map = new mapboxgl.Map({
    //   container: this.mapContainer,
    //   style: "mapbox://styles/mapbox/streets-v11",
    //   center: [this.state.lng, this.state.lat],
    //   zoom: this.state.zoom
    // });
    // const geocodingClient = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   mapboxgl: mapboxgl
    // });
    // map.addControl(geocodingClient);
    // map.on("move", () => {
    //   this.setState({
    //     lng: map.getCenter().lng.toFixed(4),
    //     lat: map.getCenter().lat.toFixed(4),
    //     zoom: map.getZoom().toFixed(2)
    //   });
    //   axios
    //     .get(
    //       "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    //         map.getCenter().lng.toFixed(10) +
    //         "," +
    //         map.getCenter().lat.toFixed(10) +
    //         ".json?access_token=pk.eyJ1IjoibmFiaWRhbSIsImEiOiJjazFsejVrdXgwYWFiM2hwY2xzcng2YnRvIn0.9oIMFnFAebsE812OCde1Fw"
    //     )
    //     .then(function(response) {
    //       // handle success
    //       console.log(response);
    //     })
    //     .catch(function(error) {
    //       // handle error
    //       console.log(error);
    //     })
    //     .finally(function() {
    //       // always executed
    //     });
    //   geocodingClient.mapboxClient.geocodeReverse(
    //     {
    //       latitude: map.getCenter().lat.toFixed(4),
    //       longitude: map.getCenter().lng.toFixed(4)
    //     },
    //     function(err, res) {
    //       console.log(err, res);
    //     }
    //   );
    //   geocodingClient
    //     .reverseGeocode({
    //       query: [
    //         map.getCenter().lat.toFixed(4),
    //         map.getCenter().lng.toFixed(4)
    //       ],
    //       limit: 2
    //     })
    //     .send()
    //     .then(response => {
    //       // GeoJSON document with geocoding matches
    //       //   const match = response.body;
    //       console.log(response);
    //     });
    // });
  }

  render() {
    return (
      <div>
        {/* <div className="sidebarStyle">
          <div>
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
            {this.state.zoom}
          </div>
        </div>
        <div ref={el => (this.mapContainer = el)} className="mapContainer" /> */}
        {/* <div className="sidebarStyle">
          <div>
            Longitude, Latitude: {this.state.center} | Zoom: {this.state.zoom}
          </div>
        </div> */}
        <Map
          style="mapbox://styles/mapbox/streets-v8"
          ref={el => (this.mapContainer = el)}
          // center={[this.state.lng, this.state.lat]}
          center={this.props.center}
          zoom={[this.state.zoom]}
          className="mapContainer"
          onMove={e => this.handleMoveMap(e)}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{
              "icon-image": "marker-15"
            }}
          >
            <Marker
              //   anchor="bottom"
              coordinates={this.state.center}
            >
              {/* <img src="http://maps.google.com/mapfiles/ms/icons/red-dot.png" /> */}
            </Marker>
          </Layer>
        </Map>
        {/* <Mapir
          Map={Map}
          style="mapbox://styles/mapbox/streets-v11"
          ref={el => (this.mapContainer = el)}
          center={[this.state.lng, this.state.lat]}
          zoom={[this.state.zoom]}
          className="mapContainer"
        /> */}
      </div>
    );
  }

  //   componentDidMount = () => {
  //     const map = new mapboxgl.Map({
  //       container: this.mapContainer,
  //       style: "mapbox://styles/mapbox/streets-v11",
  //       center: [this.state.lng, this.state.lat],
  //       zoom: this.state.zoom
  //     });
  //     map.on("move", () => {
  //       this.setState({
  //         lng: map.getCenter().lng.toFixed(4),
  //         lat: map.getCenter().lat.toFixed(4),
  //         zoom: map.getZoom().toFixed(2)
  //       });
  //     });
  //   };

  //   render() {
  //     const {classes} = this.props;

  //     return (
  //       //   <div>
  //       //     <Map
  //       //       style="mapbox://styles/mapbox/streets-v9"
  //       //       containerStyle={{
  //       //         height: "100vh",
  //       //         width: "100vw"
  //       //       }}
  //       //     >
  //       //       <Layer type="symbol" id="marker" layout={{"icon-image": "marker-15"}}>
  //       //         <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
  //       //       </Layer>
  //       //     </Map>
  //       //   </div>
  //       <div>
  //         <div className="sidebarStyle">
  //           <div>
  //             Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
  //             {this.state.zoom}
  //           </div>
  //         </div>
  //         <div ref={el => (this.mapContainer = el)} className="mapContainer" />
  //       </div>
  //     );
  //   }
}

export default MapComponent;
