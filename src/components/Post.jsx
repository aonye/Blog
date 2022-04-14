/* eslint-disable react/prop-types */
import { useState } from 'react';
import moment from 'moment';
import acctIcon from '../acct-icon.png';
import './Post.scss';

import Comment from './Comment.jsx';

const Post = (props) => {
	const {
		author,
		title,
		post,
		timestamp,
		comments,
		userID,
		_id: postID,
		refreshPosts,
	} = props;
	const authorID = author._id;
	const username = author.username;
	const date = moment(timestamp).format('MM-DD-YYYY');

	const [showComment, setShowComment] = useState(true);
	const [commentText, setCommentText] = useState('');

	async function deletePost(postID) {
		const cookie = document.cookie;
		const [token] = cookie.match(/(?<=token=)(.*?)((?=$)|(?=\s))/g);
		try {
			const res = await fetch(
				`http://localhost:8000/api/posts/${postID}`,
				{
					method: 'DELETE',
					mode: 'cors',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				},
			);
			const resJson = await res.json();
			if (res.status === 200) {
				console.log(resJson);
				refreshPosts();
				return resJson;
			} else {
				console.log('some error occured');
			}
		} catch (err) {
			console.log(err);
		}
	}

	async function addComment(text) {
		const cookie = document.cookie;
		const [token] = cookie.match(/(?<=token=)(.*?)((?=$)|(?=\s))/g);
		try {
			const res = await fetch(
				`http://localhost:8000/api/posts/${postID}/comments`,
				{
					method: 'POST',
					mode: 'cors',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						text,
					}),
				},
			);
			const resJson = await res.json();
			if (res.status === 200) {
				console.log(resJson);
				refreshPosts();
				return resJson;
			} else {
				console.log('some error occured');
			}
		} catch (err) {
			console.log(err);
		}
	}

	function handleInputEnd(e) {
		if (e.keyCode === 13) {
			addComment(commentText);
			setCommentText('');
			setShowComment(true);
			refreshPosts();
		}
		if (e.keyCode === 27) {
			setCommentText('');
			setShowComment(true);
		}
	}

	return (
		<div className="post">
			<div className="post__info">
				<div className="testwrapper">
					<div className="post__info__wrapper">
						<img
							src={acctIcon}
							alt="acct-icon"
							width="50px"
							height="50px"
						></img>
						<div className="flex-col">
							<span>{username}</span>
							<span>{date}</span>
						</div>
					</div>
					<span className="post__info__title">{title}</span>
				</div>
				{authorID === userID ? (
					<div
						className="deleteLink"
						onClick={() => deletePost(postID)}
					>
						Delete Post
					</div>
				) : null}
			</div>
			<p>{post}</p>
			<div className="post__comment">
				{showComment ? (
					<button
						className="btn"
						onClick={() => setShowComment(false)}
					>
						Comment
					</button>
				) : (
					<input
						className="input"
						onClick={() => setShowComment(false)}
						onChange={(e) => setCommentText(e.target.value)}
						onKeyDown={(e) => handleInputEnd(e)}
					></input>
				)}
			</div>
			{comments.map((i, index) => {
				return (
					<div key={index}>
						<Comment
							{...i}
							postID={postID}
							userID={userID}
							refreshPosts={refreshPosts}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Post;
