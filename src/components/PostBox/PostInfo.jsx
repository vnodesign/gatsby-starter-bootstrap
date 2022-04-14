import React from "react";
import PostDate from "../Post/PostDate";
import Link from "../Link/Link";
import "bootstrap-icons/font/bootstrap-icons.css";
import gtagTrack from "../../utils/gtag";
import config from "../../../config";

const PostInfo = ({ post }) => (
  <>
    <div className="card-body">
      <h2 className="card-title" itemProp="headline">
        <Link
          to={post.slug}
          key={post.title}
          title={post.title}
          onClick={() => gtagTrack("PostTitle", "click", post.slug)}
          itemProp="url"
          className="link-dark"
        >
          {post.title}
        </Link>
        {post.featured ? (
          <div className="mb-2 mt-2 font-weight-normal">
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
      </h2>
      <div className="post-excerpt">
        <p itemProp="description">{post.excerpt}</p>
      </div>
    </div>
    <div className="card-footer">
      <div className="wrapfooter">
        {post.author && (
          <span className="meta-footer-thumb">
            <img
              className="author-thumb"
              src={config.userAuthorAvatar}
              width="72"
              height="72"
              alt={post.author}
            />
          </span>
        )}
        <span className="author-meta">
          {post.author && (
            <>
              <span
                className="post-name"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <Link
                  to={config.userAuthorUrl}
                  title={post.author}
                  target="_blank"
                  rel="noopener noreferrer"
                  itemProp="url"
                >
                  <span itemProp="name">{post.author}</span>
                </Link>
              </span>
              <br />
            </>
          )}
          <span className="post-date">
            <PostDate date={post.date} />
          </span>
          <span className="dot" />
          {post.timeToRead && (
            <span className="eta">{post.timeToRead} min read</span>
          )}
        </span>
        <span className="post-read-more">
          <Link
            to={post.slug}
            key={post.title}
            title={post.title}
            onClick={() => gtagTrack("ReadMoreLink", "click", post.slug, {
              title: post.title,
              })}
              >
            <svg
              xmlns="https://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-bookmark"
              viewBox="0 0 25 25"
            >
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
            </svg>
          </Link>
        </span>
        <div className="clearfix" />
      </div>
    </div>
  </>
);

export default PostInfo;
