import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  content: {
    fontSize: "35px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center",
  },
};

class Loading extends Component {
  state = {
    content: this.props.text,
  };

  /** spusti interval pro loading */
  componentDidMount() {
    const { speed, text } = this.props;

    this.interval = window.setInterval(() => {
      this.state.content === text + "..."
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + "." }));
    }, speed);
  }

  /** zastavi loading, kdyz uz neni potreba */
  componentWillUnmount = () => {
    window.clearInterval(this.interval);
  };

  render() {
    return (
      <p style={styles.content} className="text-center">
        {this.state.content}
      </p>
    );
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: "Loading",
  speed: 200,
};

export default Loading;
