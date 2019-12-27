import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import { route } from 'preact-router';

import Entericon from '../../assets/icons/enter.svg';

const Header = () => (
	<header class={style.header}>
		<h1 onClick={() => route('/')}>eCommerce App</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
			<Link activeClassName={style.active} href="/signin"><img className={style.img} src={Entericon} /></Link>
		</nav>
	</header>
);

export default Header;
