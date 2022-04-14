import React, { Component } from "react";
import Article from "./Article";
import { Col, Button } from "react-bootstrap";

class PostBox extends Component {
  state = {
    maxPosts:
      (this.props.hasLoadmore || this.props.forcePostsPerPage) &&
      this.props.postsPerPage
        ? this.props.postsPerPage
        : this.props.postList.length,
  };

  handleLoadmore = () => {
    const { hasLoadmore = false, numberLoadmore } = this.props;

    if (!hasLoadmore) return;

    this.setState((prevState) => ({
      maxPosts: prevState.maxPosts + numberLoadmore,
    }));
  };
  

  render() {
    const { postList, hasThumbnail = true, hasLoadmore = false } = this.props;
    const { maxPosts } = this.state;

    return (
      <>
        {postList.map((post, index) => {
          if (index < maxPosts)
            return (
              <Article
                key={post.title}
                post={post}
                hasThumbnail={hasThumbnail}
              />
            );

          return null;
        })}
        <Col sm={12} className="text-center mx-auto">
          <div className="vno-loadmore">
            {hasLoadmore && maxPosts < postList.length ? (
              <Button
                onClick={this.handleLoadmore}
                role="button"
                variant="vnodesign"
              >
                {this.props.btnLoadmore}
              </Button>
            ) : (
              <p>
                <strong>WOW</strong>, you've reached the end of the list!
              </p>
            )}
          </div>
        </Col>
      </>
    );
  }
}

export default PostBox;
