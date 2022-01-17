import './Nav.css';

const Nav = () => {
    return (
        <nav className='nav-wrapper'>
            <section className='nav-container'>
                <span>Medium Blog</span>
                <div className='nav-navbuttons'>
                    <a href='/signup'><button>Sign up</button></a>
                    <button>Login</button>
                </div>
            </section>
        </nav>
    )
}

export default Nav;