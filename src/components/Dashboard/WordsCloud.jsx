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

class WordsCloud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxWordValue: 0,
      minWordValue: 0
    };

    this.handleWordClick = this.handleWordClick.bind(this);
  }

  handleWordClick = (word, event) => {
    this.props.selectKeyword(word);
    console.log(word);
    // console.log(event);

    const element = event.target;
    const texts = selectAll("text");
    const text = select(element);
    // console.log(texts);
    texts.attr("fill", "#3340ff");

    var SVGRect = text.node().getBBox();
    var padding = 2;
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", SVGRect.x - padding);
    rect.setAttribute("y", SVGRect.y - padding);
    rect.setAttribute("width", SVGRect.width + padding * 2);
    rect.setAttribute("height", SVGRect.height + padding * 2);
    rect.setAttribute("fill", "yellow");
    text.parentNode.insertBefore(rect, text);
    // element.setAttribute("fill", "#fff");
    // element.setAttribute(
    //   "style",
    //   "border-radius: 17.5px; width: 84px; height: 35px;background-color: #4753ff;color: '#fff'"
    // );

    // const text = element.select();
    // console.log("x");

    // text
    //   .on("click", () => {
    //     this.setState({
    //       selectedKeyword: word.text
    //     });
    //   })
    //   .transition()
    //   .attr("background", "white")
    //   .attr("font-size", isActive ? "300%" : "100%")
    //   .attr("text-decoration", isActive ? "underline" : "none");
  };

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
          <h1>{this.props.selectedKeyword}</h1>
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
                  className={classNames(
                    classes.word,
                    this.props.selectedKeyword == word.text
                      ? classes.selectedWord
                      : ""
                  )}
                  key={index}
                  style={{
                    fontSize: () =>
                      ((word.value - this.state.min) /
                        (this.state.max - this.state.min) +
                        1) *
                      12,
                    color:
                      this.props.selectedKeyword == word.text
                        ? "#fff"
                        : "#08080d"
                  }}
                  onClick={() => this.props.selectKeyword(word)}
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
)(withStyles(styles)(WordsCloud));
