import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";

function Post(props) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" src={props.imageUrl} />
        <h3>{props.username}</h3>
      </div>
      <div className="post__image">
        <img className="post__image" src={props.imageUrl} />
      </div>
      <div className="post__username-caption">
        <p>
          <strong>{props.username}:</strong> {props.caption}
        </p>
      </div>
    </div>
  );
}

export default Post;
