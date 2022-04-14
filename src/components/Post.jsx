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

	const [editableFields, setEditableFields] = useState({
		post_title: true,
		post_text: true,
		comment: true,
	});
	const [commentText, setCommentText] = useState('');
	// const [postTitle, setPostTitle] = useState();
	// const [postText, setPostText] = useState();

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

	async function updatePost(fieldName, value) {
		console.log(fieldName, value);
		const cookie = document.cookie;
		const [token] = cookie.match(/(?<=token=)(.*?)((?=$)|(?=\s))/g);
		try {
			const res = await fetch(
				`http://localhost:8000/api/posts/${postID}`,
				{
					method: 'PUT',
					mode: 'cors',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						[fieldName]: value,
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
		const fieldName = e.target.className.split('-')[1];
		if (e.keyCode === 13) {
			if (fieldName === 'comment') {
				addComment(commentText);
				setCommentText('');
			} else if (fieldName === 'post_title') {
				const sampleText = 'Lets go to space';
				updatePost('title', sampleText);
			} else if (fieldName === 'post_text') {
				const sampleText = 'Tesla versus the world';
				updatePost('post', sampleText);
			}
			setEditableFields((prevState) => {
				return { ...prevState, [fieldName]: true };
			});
			refreshPosts();
		}
		if (e.keyCode === 27) {
			setCommentText('');
			setEditableFields((prevState) => {
				return { ...prevState, [fieldName]: true };
			});
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
					<div>
						{editableFields.post_title ? (
							<span
								className="post__info__title hoverable"
								onClick={() =>
									setEditableFields((prevState) => {
										return {
											...prevState,
											post_title: false,
										};
									})
								}
							>
								{title}
							</span>
						) : (
							<input
								type="text"
								defaultValue={title}
								className="input-post_title"
								onChange={(e) => setCommentText(e.target.value)}
								onKeyDown={(e) => handleInputEnd(e)}
							></input>
						)}
					</div>
				</div>
				{authorID === userID ? (
					<span
						className="deleteLink hoverable"
						onClick={() => deletePost(postID)}
					>
						Delete Post
					</span>
				) : null}
			</div>
			{editableFields.post_text ? (
				<p
					className="hoverable"
					onClick={() =>
						setEditableFields((prevState) => {
							return {
								...prevState,
								post_text: false,
							};
						})
					}
				>
					{post}
				</p>
			) : (
				<input
					type="text"
					defaultValue={post}
					className="input-post_text"
					onChange={(e) => setCommentText(e.target.value)}
					onKeyDown={(e) => handleInputEnd(e)}
				></input>
			)}
			<div className="post__comment">
				{editableFields.comment ? (
					<button
						className="btn"
						onClick={() =>
							setEditableFields((prevState) => {
								return { ...prevState, comment: false };
							})
						}
					>
						Comment
					</button>
				) : (
					<input
						className="input-comment"
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
