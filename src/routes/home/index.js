import { h, Component } from 'preact';
import style from './style';
import { firebase } from '../../index';

import Item from './item';


const initialState = {
	goods: []
};
export default class Home extends Component {
	state = {
		...initialState
	}

	componentDidMount() {
		this.load();
	}

	load = async () => {
		try {
			let data = await firebase.getAllData('goods');
			this.setState({ goods: data });
		}
		catch (error) {
			console.log('error', error.message);
		}
	}

	render({ }, { goods }) {
		console.log(goods);
		return (
			<div className={style.home}>
				{goods && goods.length && goods.map((good, index) => (
					<Item key={index} item={good} />
				))}
			</div>
		);
	}
}

