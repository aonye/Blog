/* eslint-disable react/prop-types */
import { useState } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

const Login = ({ setID }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [msg, setMsg] = useState('');

	// const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('http://localhost:8000/login', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${document.cookie.token}`,
				},
				body: JSON.stringify({
					username,
					password,
				}),
			});
			const resJson = await res.json();
			console.log(resJson.token, 'token');
			if (res.status === 200) {
				setUsername('');
				setPassword('');
				setMsg('User created successfully');
				document.cookie = `token=${resJson.token}; SameSite=None; Secure`;
				const id = jwtDecode(resJson.token).id;
				console.log(id, 'info');
				setTimeout(() => {
					// history.push('/');
					setID(id);
				}, 5000);
			} else {
				setMsg('Some error occured');
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="username">Username: </label>
			<input
				type="email"
				name="username"
				value={username}
				minLength={3}
				maxLength={30}
				onChange={(e) => setUsername(e.target.value)}
			></input>
			<label htmlFor="password">Password: </label>
			<input
				type="text"
				name="password"
				value={password}
				minLength={3}
				maxLength={30}
				onChange={(e) => setPassword(e.target.value)}
			></input>
			<button type="submit">Submit</button>
			<div className="message">{msg ? <p>{msg}</p> : null}</div>
		</form>
	);
};

Login.propTypes = {
	setToken: PropTypes.func,
};

export default Login;
