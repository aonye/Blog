/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.scss';

import Nav from './components/Nav.jsx';
import Login from './components/Login';
import Main from './components/Main.jsx';
import Post from './components/Post.jsx';

function App() {
	const [posts, setPosts] = useState();
	const [id, setID] = useState(null);
	function clearCookies() {
		console.lg('xd');
	}

	function showCookiesInConsole() {
		console.log(document.cookie);
	}

	useEffect(async () => {
		refreshPosts();
	}, []);

	async function getPosts() {
		// e.preventDefault();
		const cookie = document.cookie;
		const [token] = cookie.match(/(?<=token=)(.*?)((?=$)|(?=\s))/g);
		setIDFromToken(token);
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

	async function setIDFromToken(token = null) {
		if (token) {
			const id = jwtDecode(token).id;
			setID(id);
		}
	}

	async function refreshPosts() {
		const posts = await getPosts();
		setPosts(posts);
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

	return (
		<>
			<Nav />
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<Main
							posts={posts}
							userID={id}
							refreshPosts={refreshPosts}
						/>
					</Route>
					<Route exact path="/test"></Route>
					<Route exact path="/login">
						<Login setID={setID} />
					</Route>
				</Switch>
			</BrowserRouter>
			<button onClick={clearCookies}>Clear Cookies</button>
			<button onClick={showCookiesInConsole}>
				Show cookie in console
			</button>
			<button onClick={(e) => getPosts(e)}>get posts</button>
			<button onClick={() => console.log(id)}>Get Token</button>
			{/* <div>
				{posts
					? posts.map((i, index) => {
							return (
								<div key={index}>
									{<Post {...i} userID={id} />}
								</div>
							);
					  })
					: null}
			</div> */}
		</>
	);
}

export default App;
