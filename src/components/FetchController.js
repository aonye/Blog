import jwtDecode from 'jwt-decode';

export async function getDrafts() {
	try {
		const cookie = document.cookie;
		const [token] = cookie.match(/(?<=token=)(.*?)((?=$)|(?=\s))/g);
		const userID = token ? jwtDecode(token).id : null;
		if (!userID) {
			return;
		}
		const res = await fetch(
			`http://localhost:8000/api/posts/${userID}/all`,
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
		const cookie = document.cookie;
		const [token] = cookie.match(/(?<=token=)(.*?)((?=$)|(?=\s))/g);
		const res = await fetch(`http://localhost:8000/api/posts/${postID}`, {
			method: 'PUT',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(payload),
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

export async function updateComment(payload, postID, commentID) {
	try {
		const cookie = document.cookie;
		const [token] = cookie.match(/(?<=token=)(.*?)((?=$)|(?=\s))/g);
		const res = await fetch(
			`http://localhost:8000/api/posts/${postID}/comments/${commentID}`,
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
