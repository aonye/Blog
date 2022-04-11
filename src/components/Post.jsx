import moment from 'moment';
import acctIcon from '../acct-icon.png';

import Comment from './Comment.jsx';

const Post = (props) => {
	// eslint-disable-next-line react/prop-types
	const { author, title, post, timestamp, comments } = props;
	// eslint-disable-next-line react/prop-types
	const username = author.username;
	// eslint-disable-next-line react/prop-types
	const date = moment(timestamp).format('MM-DD-YYYY');
	console.log(date, timestamp);
	console.log(comments);
	return (
		<div className="post">
			<div className="post__info">
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
				<div className="post__info__title">{title}</div>
			</div>
			{/* <p>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the
					industry&apos;s standard dummy text ever since the 1500s,
					when an unknown printer took a galley of type and scrambled
					it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic
					typesetting, remaining essentially unchanged. It was
					popularised in the 1960s with the release of Letraset sheets
					containing Lorem Ipsum passages, and more recently with
					desktop publishing software like Aldus PageMaker including
					versions of Lorem Ipsum.
				</p> */}
			<p>{post}</p>
			<div className="cmt-btn">
				<button className="">Comment</button>
				{comments.map((i, index) => {
					return <Comments />;
				})}
			</div>
		</div>
	);
};

export default Post;
