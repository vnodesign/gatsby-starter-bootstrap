import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookShareCount,
  RedditShareCount,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  RedditIcon,
} from "react-share";
import urljoin from "url-join";
import config from "../../../config";

const PostShare = ({ postNode, postPath }) => {
  const post = postNode.frontmatter;
  const url = urljoin(config.siteUrl, config.pathPrefix, postPath);
  const iconSize = 26;
  const filter = (count) => (count > 0 ? count : "");
  const renderShareCount = (count) => (
    <div className="text-center">{filter(count)}</div>
  );

  return (
    <div className="vno-share d-flex">
      <RedditShareButton url={url} title={post.title}>
        <RedditIcon round size={iconSize} />
        <RedditShareCount url={url}>
          {(count) => renderShareCount(count)}
        </RedditShareCount>
      </RedditShareButton>

      <TwitterShareButton url={url} title={post.title}>
        <TwitterIcon round size={iconSize} />
      </TwitterShareButton>

      <FacebookShareButton url={url} quote={postNode.excerpt}>
        <FacebookIcon round size={iconSize} />
        <FacebookShareCount url={url}>
          {(count) => renderShareCount(count)}
        </FacebookShareCount>
      </FacebookShareButton>

      <TelegramShareButton url={url}>
        <TelegramIcon round size={iconSize} />
      </TelegramShareButton>
    </div>
  );
};

export default PostShare;
