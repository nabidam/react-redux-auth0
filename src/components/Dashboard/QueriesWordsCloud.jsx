import React, {unstable_Profiler} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import {connect} from "react-redux";
import changeSelectedQuery from "../../actions/changeSelectedQuery";
import selectKeyword from "../../actions/selectKeyword";
import moment from "moment";
import "d3-transition";
import {select, selectAll} from "d3-selection";
import TagCloud from "./TagCloud";
import randomColor from "randomcolor";
import BootstrapTooltip from "./BSTooltip";
import {Tooltip} from "@material-ui/core";

const styles = {
  wordCloud: {
    display: "flex",
    position: "relative"
  },
  large: {
    fontSize: 60,
    fontWeight: "bold"
  },
  small: {
    opacity: 0.7,
    fontSize: 16
  },
  word: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  selectedWord: {
    border: "solid 5px rgba(255, 255, 255, 0.85)",
    backgroundColor: "#4753ff",
    padding: "2px 4px",
    borderRadius: 19,
    color: "#fff",
    zIndex: 1000
  }
};

class QueriesWordsCloud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxWordValue: 0,
      minWordValue: 0
    };
  }

  componentDidMount = () => {
    var words = this.props.words;
    var min = Infinity;
    var max = 0;
    words.map(item => {
      if (item.value < min) {
        min = item.value;
      }
      if (item.value > max) {
        max = item.value;
      }
    });

    this.setState({
      min,
      max
    });
  };

  render() {
    const {classes} = this.props;
    return (
      <div className="app-outer">
        <div className="app-inner">
          <TagCloud
            className="tag-cloud"
            style={{
              fontFamily: "BYekan"
              // fontSize: () => Math.round(Math.random() * 50) + 16,
              // fontSize: 30,
              // color: () => {
              //   return "#08080d";
              // }
            }}
          >
            {this.props.words.map((word, index) => {
              return (
                <div
                  className={classNames(classes.word)}
                  key={index}
                  style={{
                    fontSize: () =>
                      ((word.value - this.state.min) /
                        (this.state.max - this.state.min) +
                        1) *
                      12,
                    color: "#3340ff"
                  }}
                >
                  {word.text}
                </div>
              );
            })}
          </TagCloud>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    words: state.words,
    selectedKeyword: state.selectedKeyword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectKeyword: word => {
      dispatch(selectKeyword(word));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(QueriesWordsCloud));
