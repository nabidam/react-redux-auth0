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
    console.log(min);
    console.log(max);
  };

  render() {
    const {classes} = this.props;
    return (
      <div className="app-outer">
        <div className="app-inner">
          <TagCloud
            className="tag-cloud"
            style={{
              fontFamily: "BYekan",
              // fontSize: () => Math.round(Math.random() * 50) + 16,
              // fontSize: 30,
              color: () => {
                return "#3340ff";
              }
            }}
          >
            {this.props.words.map((word, index) => {
              var size =
                (word.value - this.state.min) /
                  (this.state.max - this.state.min) +
                1 +
                "em";
              console.log(`"${size}"`);

              return (
                <div
                  key={index}
                  style={{
                    fontSize: () =>
                      ((word.value - this.state.min) /
                        (this.state.max - this.state.min) +
                        1) *
                      12
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
    words: state.words
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
)(WordsCloud);
