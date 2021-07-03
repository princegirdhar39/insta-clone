import React, { useState, useEffect } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import { db } from "./firebase";
import firebase from 'firebase';

function Post(props) {

  const [comments,setComments] = useState([]);
  const [comment,setComment] = useState('');

  useEffect(() => {
    let unsubscibe;
    if(props.postId) {
      unsubscibe = db
      .collection("posts")
      .doc(props.postId)
      .collection("comments")
      .orderBy('timestamp','desc')
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      })

    }
    return () => {
      unsubscibe();
    };
  },[props.postId]);

  const postComment = (e) => {
    e.preventDefault();

    db.collection("posts").doc(props.postId).collection("comments").add({
      text: comment,
      username: props.user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setComment('');





  }


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
      <div className="post__comments">

      {comments.map((comment) => (
        <p>
          <strong>{comment.username}</strong> {comment.text}
        </p>
      ))}

      </div>
      <form className="post__commentbox">
        <input
        className="post__input"
        type="text"
        placeholder="Add a comment"
        value={comment}
        onChange={(e)=> setComment(e.target.value)}/>
        <button disabled={!comment}
        className="post__button"
        type="submit"
        onClick={postComment}
        >Post</button>

      </form>
    </div>
  );
}

export default Post;
