/* eslint-disable no-console */
import { h, Component } from 'preact';
import style from './style';
import Currency from 'react-currency-formatter';
import { firebase } from '../../index';

const initialState = {
	good: {}
};

const currency = 'USD';

function InStock(props) {
	let stock = !!props.stock;
	return (
		<div className={stock ? style.stock : style.noStock}>
			{stock ? `Stock, ${props.stock} left` : 'Not available'}
		</div>
	);
}

export default class Good extends Component {
  state = {
  	...initialState
  };
  componentDidMount() {
  	let id = this.props.matches && this.props.matches.id;
  	this.load(id);
  }

  load = async id => {
  	try {
  		let good = await firebase.getItemById('goods', id);
  		this.setState({
  			good
  		});
  	}
  	catch (error) {
  		console.log('error', error.message);
  	}
  };

  getPrice = item => {
  	if (!item.discount) {
  		return item.price;
  	}
  	let disc = item.discount / 100;
  	disc = item.price * disc;
  	return item.price - disc;
  };

  render({}, { good }) {
  	const price = this.getPrice(good);
  	return (
  		<div class={style.profile}>
  			<img className={style.img} src={good.image} />
  			<div className={style.info}>
  				<h1>{good.title}</h1>
  				<span className={style.infoItem}>Rating: {good.rating}/5</span>
  				<span className={style.infoItem}>
            Favorite: {good.favorite} people add this product to favorite
  				</span>
  				<span className={style.infoItem} style="display: flex;">
  					<InStock stock={good.stock} />
  				</span>
  				<div className={style.pricing}>
						Price:
  					<span className={style.discount}>
  						{good.discount && (
  							<>
  								<Currency quantity={good.price} currency={currency} />
  							</>
  						)}
  					</span>
  					{good.discount && '/'}
  					<span>
  						<Currency quantity={price} currency={currency} />
  					</span>
  				</div>
  			</div>
  		</div>
  	);
  }
}
