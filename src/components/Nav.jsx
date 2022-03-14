import './Nav.scss';
import mediumLogo from '../assets/images/medium_logo.png';

function Nav() {
	return (
		<nav className="nav">
			<div className="nav__wrapper">
				<img className="logo ratio1H4W" src={mediumLogo} alt="logo" />
				<div className="btns">
					<a className="btns__signup-wrapper" href="/signup">
						<button type="button" className="btns__signup">
							Sign up
						</button>
					</a>
					<button type="button" className="btns__login">
						Login
					</button>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
