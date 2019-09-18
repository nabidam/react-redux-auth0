import React, {unstable_Profiler} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import changeSelectedQuery from "../../actions/changeSelectedQuery";
import QueryDashboardContainer from "./QueryDashboardContainer";
import QueryPostsContainer from "./QueryPostsContainer";
import QueryKeywordsContainer from "./QueryKeywordsContainer";
import QueryMarginsContainer from "./QueryMarginsContainer";
import QueryInfluencersContainer from "./QueryInfluencersContainer";
import QueryEmotionsContainer from "./QueryEmotionsContainer";

class QueriesDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //   componentDidMount = () => {
  //     console.log(
  //       moment()
  //         .subtract(10, "days")
  //         .format("Do")
  //     );
  //   };

  render() {
    const {classes} = this.props;
    switch (this.props.selectedQueryDashboardItem) {
      case "dashboard":
        return <QueryDashboardContainer />;
        break;
      case "posts":
        return <QueryPostsContainer />;
        break;
      case "keywords":
        return <QueryKeywordsContainer />;
        break;
      case "margins":
        return <QueryMarginsContainer />;
        break;
      case "influencers":
        return <QueryInfluencersContainer />;
        break;
      case "emotions":
        return <QueryEmotionsContainer />;
        break;

      default:
        break;
    }
  }
}

QueriesDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    latestQueries: state.latestQueries,
    selectedQuery: state.selectedQuery,
    selectedQueryDashboardItem: state.selectedQueryDashboardItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedQuery: id => {
      dispatch(changeSelectedQuery(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueriesDashboard);
