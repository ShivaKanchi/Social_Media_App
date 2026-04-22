import React, { useState, useEffect } from 'react'
import './Posts.css'
import { Avatar } from '@mui/material'
import { db } from '../../database/firebase'
import { collection, onSnapshot, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore'

function Posts({ postId, user, username, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            const commentsRef = collection(db, "posts", postId, "comments");
            const q = query(commentsRef, orderBy('timestamp', 'asc'));
            unsubscribe = onSnapshot(q, (snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();

        addDoc(collection(db, "posts", postId, "comments"), {
            text: comment,
            username: user.displayName,
            timestamp: serverTimestamp()
        });
        setComment('');
    }

    return (
        <div className='post'>
            <div className="post__header">
                <Avatar
                    className='post__avatar'
                    alt={username}
                    src='/static/images/avatar/1.jpg'
                />
                <h3>{username}</h3>
            </div>

            <img className='post__image ' src={imageUrl} alt='' />

            <h4 className='post__text'> <strong>{username}</strong> {caption}</h4>

            <div className="post__comments">
                {comments.map((comment, index) => (
                    <p key={index}>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>

            {user && (
                <form className="post__commentBox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                    </button>
                </form>
            )}
        </div>
    )
}

export default Posts