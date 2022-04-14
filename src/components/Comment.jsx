/* eslint-disable react/prop-types */
import acctIcon from '../acct-icon.png';
import './Comment.scss';

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
	return (
		<div className="comment">
			<div className="comment__info">
				<div className="wrapper">
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
					{author._id === userID ? (
						<button onClick={(e) => deleteCommentByID(commentID)}>
							Delete Comment
						</button>
					) : null}
				</div>
			</div>
			<p className="comment__text">{text}</p>
		</div>
	);
};

export default Comment;
