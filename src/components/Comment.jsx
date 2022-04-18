/* eslint-disable react/prop-types */
import { useState } from 'react';
import acctIcon from '../acct-icon.png';
import './Comment.scss';

import { updateComment } from './FetchController.js';
import moment from 'moment';

const Comment = (props) => {
	const {
		_id: commentID,
		author,
		text,
		timestamp,
		postID,
		userID,
		refreshPosts,
	} = props;
	const date = moment(timestamp).format('MM-DD-YYYY');

	const [commentText, setCommentText] = useState(text);
	const [editStatus, setEditStatus] = useState(false);

	console.log(setEditStatus);

	async function deleteCommentByID() {
		const cookie = document.cookie;
		const [token] = cookie.match(/(?<=token=)(.*?)((?=$)|(?=\s))/g);
		try {
			const res = await fetch(
				`http://localhost:8000/api/posts/${postID}/comments/${commentID}`,
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
				refreshPosts();
				console.log(resJson);
				return resJson;
			} else {
				console.log('some error occured');
			}
		} catch (err) {
			console.log(err);
		}
	}

	async function handleInputEnd(e) {
		if (e.keyCode === 13) {
			const payload = {
				text: commentText,
			};
			await updateComment(payload, postID, commentID);
			setEditStatus(false);
		}
		if (e.keyCode === 27) {
			setEditStatus(false);
			setCommentText(text);
		}
	}

	const renderText = () => {
		return author._id === userID ? (
			editStatus ? (
				<input
					type="text"
					defaultValue={commentText}
					className="input"
					onChange={(e) => setCommentText(e.target.value)}
					onKeyDown={(e) => handleInputEnd(e)}
				></input>
			) : (
				<p
					onClick={() => setEditStatus(true)}
					className="comment__text"
				>
					{commentText}
				</p>
			)
		) : (
			<p className="comment__text">{commentText}</p>
		);
	};

	return (
		<div className="comment">
			<div className="comment__info">
				<div className="wrapper">
					<div className="image-wrapper">
						<img
							src={acctIcon}
							alt="acct-icon"
							width="50px"
							height="50px"
						></img>
						<div className="flex-col">
							<span>{author.username}</span>
							<span>{date}</span>
						</div>
					</div>
					{author._id === userID ? (
						<div className="comment-operator">
							<span
								className="link hoverable"
								onClick={(e) => deleteCommentByID(commentID)}
							>
								Delete Comment
							</span>
						</div>
					) : null}
				</div>
			</div>
			{renderText()}
		</div>
	);
};

export default Comment;
