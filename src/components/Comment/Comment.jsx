import React, { Component } from "react";
import Disqus from "./Disqus";
import "./Comment.modules.scss";
import { Button } from "react-bootstrap";

class Comment extends Component {
  state = {
    isShow: !this.props.lazyload,
  };

  handleClick = () => {
    this.setState((prevState) => ({
      isShow: !prevState.isShow,
    }));
  };

  render() {
    const { postNode, btnLoadComments } = this.props;

    return (
      <div
        id="comments"
        className="justify-content-center text-center m-auto mb-5"
      >
        {!this.state.isShow && (
          <Button
            className="btn-vnodesign"
            onClick={this.handleClick}
            role="button"
          >
            {btnLoadComments}
          </Button>
        )}
        {this.state.isShow && <Disqus postNode={postNode} />}
      </div>
    );
  }
}

export default Comment;
