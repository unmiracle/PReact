import { h, Component } from 'preact';
import style from './style';
import { firebase } from '../../index';
import { route } from 'preact-router';

const initialState = {
	email: 'user@usermail.com',
	password: 'user**123'
};

function Input(props) {
	return (
		<input className={style.input} {...props} />
	);
}

export default class SignIn extends Component {

	state = {
		...initialState
	};
  
  onChange = (name, e) => {
  	this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = async (event) => {
  	event.preventDefault();
  	const { email, password } = this.state;
  	try {
  		const user = await firebase.signIn(email, password);
  		localStorage.setItem('refreshToken', user.user.refreshToken);
  		route('/', true);
  	}
  	catch (error) {
  		console.log('Error', error.message);
  	}
  }


  render({}, { email, password }) {
  	return (
  		<div class={style.profile}>
  			<form autoComplete="false" onSubmit={this.onSubmit} className={style.form}>
  				<Input placeholder="Email" type="text" name="email" value={email} onChange={(e) => this.onChange(e)} />
  				<Input placeholder="Password" type="password" name="password" value={password} onChange={(e) => this.onChange(e)} />
  				<button className={style.btn} type="submit">Sign In</button>
  			</form>
  		</div>
  	);
  }
}
