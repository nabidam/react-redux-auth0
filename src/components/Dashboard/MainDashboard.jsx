import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import changeSelectedQuery from "../../actions/changeSelectedQuery";
import history from "../../history";

class MainDashboard extends React.Component {
  componentDidMount = () => {
    history.push("dashboard/queries");
  };
  render() {
    return <main></main>;
  }
}

export default MainDashboard;
