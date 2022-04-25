/* eslint-disable no-unreachable */
import jwtDecode from 'jwt-decode';

export function getTokenFromCookie() {
	const cookie = document.cookie;
	if (cookie !== '') {
		const [token] = cookie.match(/(?<=token=)(.*?)((?=$)|(?=\s))/g);
		return token;
	}
	return null;
}

export function getIDFromJWTToken(token = null) {
	return token ? jwtDecode(token).id : null;
}

// POSTS
export async function getAllPosts() {
	try {
		const res = await fetch('https://blogaonye.herokuapp.com/api/posts', {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
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

export async function getDrafts() {
	try {
		const token = getTokenFromCookie();
		const userID = getIDFromJWTToken(token);
		if (!userID) {
			return;
		}
		const res = await fetch(
			`https://blogaonye.herokuapp.com/api/posts/${userID}/all`,
			{
				method: 'GET',
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
			return resJson;
		} else {
			console.log('some error occured');
		}
	} catch (err) {
		console.log(err);
	}
}

export async function updatePost(payload, postID) {
	try {
		const token = getTokenFromCookie();
		const res = await fetch(
			`https://blogaonye.herokuapp.com/api/posts/${postID}`,
			{
				method: 'PUT',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			},
		);
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

export async function deletePost(postID) {
	try {
		const token = getTokenFromCookie();
		const res = await fetch(
			`https://blogaonye.herokuapp.com/api/posts/${postID}`,
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
			return resJson;
		} else {
			console.log('some error occured');
		}
	} catch (err) {
		console.log(err);
	}
}

// Comments
export async function addComment(commentText, postID) {
	try {
		const token = getTokenFromCookie();
		const userID = getIDFromJWTToken(token);
		if (!userID) {
			return;
		}
		const res = await fetch(
			`https://blogaonye.herokuapp.com/api/posts/${postID}/comments/`,
			{
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					text: commentText,
					userId: userID,
				}),
			},
		);
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

export async function updateComment(payload, postID, commentID) {
	try {
		const token = getTokenFromCookie();
		const res = await fetch(
			`https://blogaonye.herokuapp.com/api/posts/${postID}/comments/${commentID}`,
			{
				method: 'PUT',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			},
		);
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

export async function deleteCommentByID(postID, commentID) {
	try {
		const token = getTokenFromCookie();
		const res = await fetch(
			`https://blogaonye.herokuapp.com/api/posts/${postID}/comments/${commentID}`,
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
			return resJson;
		} else {
			console.log('some error occured');
		}
	} catch (err) {
		console.log(err);
	}
}
