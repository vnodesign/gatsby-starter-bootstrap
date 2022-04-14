import React from "react";
import { formatDate } from "../../utils/helpers";

const PostDate = ({ date }) => (
    <time
      dateTime={formatDate(date)}
    >
      {formatDate(date)}
    </time>
);

export default PostDate;
