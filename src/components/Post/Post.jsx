import React from "react";
import Comment from "../Comment/Comment";
import { Col, Badge } from "react-bootstrap";
import PostTags from "./PostTags";
import PostShare from "./PostShare";
import PostDate from "./PostDate";
import PostCategories from "./PostCategories";
import "./Post.modules.scss";

const Post = ({ postNode, config, slug }) => {
  const post = postNode.frontmatter;

  return (
    <Col md={12} className="vno-article">
      <article>
        <div className="mainheading">
          {post.featured ? (
            <Badge className="badge-featured">Featured Posts</Badge>
          ) : null}
          <h1 className="posttitle">{post.title}</h1>
          <span className="post-author">{post.author}</span>
          <span className="dot" />
          <span className="post-date">
          {config.postOnDate}{" "} <PostDate date={post.date} />
          </span>
          <span className="dot" />
          <span className="post-read eta">{postNode.timeToRead} min read</span>
        </div>
        <div className="article-post">
          <div className="before-post">
            <PostCategories categories={post.categories} />
          </div>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: postNode.html }}
          />
          {post.featured ? (
            <div className="rating mb-4 d-flex align-items-center">
              <strong className="ms-1">Rating by author:</strong>
              <div className="rating-holder">
                <div
                  className="c-rating c-rating--regular"
                  data-rating-value={post.bestRating}
                >
                  <button>1</button>
                  <button>2</button>
                  <button>3</button>
                  <button>4</button>
                  <button>5</button>
                </div>
              </div>
            </div>
          ) : null}
          <div className="after-post">
            <PostShare postPath={slug} postNode={postNode} />
            <PostTags tags={post.tags} />
          </div>
          <Comment
            postNode={postNode}
            lazyload={config.lazyLoadComments}
            btnLoadComments={config.btnLoadComments}
          />
        </div>
      </article>
    </Col>
  );
};

export default Post;
