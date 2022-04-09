import { useEffect } from 'react';
import acctIcon from '../acct-icon.png';

const Main = (props) => {
	// const [posts, setPosts] = useState(null);

	useEffect(() => {}, []);

	// function addStuff() {
	// 	const newDiv = <div>Hello world</div>;
	// }

	// async function getPosts() {
	// 	const response = await fetch('http://localhost:8000/api/posts');
	// 	const posts = response ? response.json() : null;
	// 	return posts;
	// }

	// async function makePosts(posts) {
	// 	// posts is a promise
	// 	console.log(posts);
	// 	posts
	// 		.then(function (value) {
	// 			console.log(value); // "Success!"
	// 			return Promise.reject('oh, no!');
	// 		})
	// 		.catch(function (e) {
	// 			console.error(e); // "oh, no!"
	// 		})
	// 		.then(
	// 			function () {
	// 				console.log('after a catch the chain is restored');
	// 			},
	// 			function () {
	// 				console.log('Not fired due to the catch');
	// 			},
	// 		);
	// }

	const Post = (props) => {
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
							<span>Name</span>
							<span>Date</span>
						</div>
					</div>
				</div>
				<p>
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
				</p>
				<div className="cmt-btn">
					<button className="">Comment</button>
				</div>
			</div>
		);
	};

	return <div className="App">{Post()}</div>;
};

export default Main;