import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import moment from 'moment';
import './App.scss';

import Nav from './components/Nav.jsx';
import Login from './components/Login';
import Main from './components/Main.jsx';
import acctIcon from './acct-icon.png';

function App() {
	const [posts, setPosts] = useState();
	function clearCookies() {
		console.lg('xd');
	}

	function showCookiesInConsole() {
		console.log(document.cookie);
	}

	console.log(posts, setPosts, 'check');

	useEffect(async () => {
		const p = await getPosts();
		setPosts(p);
	}, []);

	async function getPosts() {
		// e.preventDefault();
		const cookie = document.cookie;
		const [token] = cookie.match(/(?<=token=)(.*?)((?=$)|(?=\s))/g);
		try {
			const res = await fetch('http://localhost:8000/api/posts', {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			const resJson = await res.json();
			if (res.status === 200) {
				return resJson;
			} else {
				console.log('some error occured');
			}
		} catch (err) {
			console.log(err);
		}
	}

	// async function createPosts() {
	// 	// posts is an array
	// 	const posts = await getPosts();
	// 	console.log(posts, 'posts');
	// 	return <div>hello world</div>;
	// }

	// function processPosts(props) {
	// 	console.log(props, 'props');
	// 	return <div>hello world</div>;
	// 	// 	return (
	// 	// 		<div>Hello world</div>
	// 	// 		// <div className="post">
	// 	// 		// 	<div className="post__info">
	// 	// 		// 		<div className="post__info__wrapper">
	// 	// 		// 			<img
	// 	// 		// 				src={acctIcon}
	// 	// 		// 				alt="acct-icon"
	// 	// 		// 				width="50px"
	// 	// 		// 				height="50px"
	// 	// 		// 			></img>
	// 	// 		// 			<div className="flex-col">
	// 	// 		// 				<span>Name</span>
	// 	// 		// 				<span>Date</span>
	// 	// 		// 			</div>
	// 	// 		// 		</div>
	// 	// 		// 		<div>{}</div>
	// 	// 		// 	</div>
	// 	// 		// 	<p>
	// 	// 		// 		Lorem Ipsum is simply dummy text of the printing and
	// 	// 		// 		typesetting industry. Lorem Ipsum has been the
	// 	// 		// 		industry&apos;s standard dummy text ever since the 1500s,
	// 	// 		// 		when an unknown printer took a galley of type and scrambled
	// 	// 		// 		it to make a type specimen book. It has survived not only
	// 	// 		// 		five centuries, but also the leap into electronic
	// 	// 		// 		typesetting, remaining essentially unchanged. It was
	// 	// 		// 		popularised in the 1960s with the release of Letraset sheets
	// 	// 		// 		containing Lorem Ipsum passages, and more recently with
	// 	// 		// 		desktop publishing software like Aldus PageMaker including
	// 	// 		// 		versions of Lorem Ipsum.
	// 	// 		// 	</p>
	// 	// 		// 	<div className="cmt-btn">
	// 	// 		// 		<button className="">Comment</button>
	// 	// 		// 	</div>
	// 	// 		// </div>
	// 	// 	);
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
		// eslint-disable-next-line react/prop-types
		const { author, title, post, timestamp } = props;
		// eslint-disable-next-line react/prop-types
		const username = author.username;
		// eslint-disable-next-line react/prop-types
		const date = moment(timestamp).format('MM-DD-YYYY');
		console.log(date, timestamp);
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
				</div>
			</div>
		);
	};

	return (
		<>
			<Nav />
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<Main />
					</Route>
					<Route exact path="/test"></Route>
					<Route exact path="/login">
						<Login />
					</Route>
				</Switch>
			</BrowserRouter>
			<button onClick={clearCookies}>Clear Cookies</button>
			<button onClick={showCookiesInConsole}>
				Show cookie in console
			</button>
			<button onClick={(e) => getPosts(e)}>get posts</button>
			{posts
				? posts.map((i, index) => {
						console.log(i);
						return <div key={index}>{Post(i)}</div>;
				  })
				: null}
		</>
	);
}

export default App;
