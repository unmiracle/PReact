import { h, Component } from 'preact';
import style from './style';
import Currency from 'react-currency-formatter';
import { route } from 'preact-router';

const titleLimit = 10;
const currency = 'USD';

class Item extends Component {
	getPrice = (item) => {
		if (!item.discount) {
			return item.price;
		}
		let disc = item.discount / 100;
		disc = item.price * disc;
		return item.price - disc;
	}
  
  itemClick = (id) => {
  	route(`/good/${id}`);
  }

  render({ item }, {}) {
  	const price = this.getPrice(item);
  	const title = item.title.length > titleLimit ? item.title.substring(0, titleLimit) : item.title;
  	return (
  		<div onClick={() => this.itemClick(item.id)} className={style.item}>
  			<img className={style.img} src={item.image} />
  			<div className={style.title} title={item.title}>{title}</div>
  			<div className={style.pricing}>
  				<span className={style.discount}>
  					{item.discount && (
  						<Currency quantity={item.price} currency={currency} />
  					)}
  				</span>
  				<span><Currency quantity={price} currency={currency} /></span>
  			</div>
  		</div>
  	);
  }
}

export default Item;
