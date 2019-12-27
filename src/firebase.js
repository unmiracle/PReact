const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');
// import 'firebase/auth';
// import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBlaxJetrXQGzqv-v-w3iD-69quzIowoJg',
	authDomain: '7c4c0.firebaseapp.com',
	databaseURL: 'https://ecom-7c4c0.firebaseio.com',
	projectId: 'ecom-7c4c0',
	storageBucket: 'ecom-7c4c0.appspot.com',
	messagingSenderId: '381922259598',
	appId: '1:381922259598:web:8f88c0d16728ad2cd84fdf',
	measurementId: 'G-ERT34E3CKG'
};

const app = firebase.initializeApp(firebaseConfig);

class Firebase {
	constructor() {
		this.auth = app.auth();
		this.db = app.firestore();
	}

	signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
	
	getAllData = async (collectionName) => {
		let response = await this.db.collection(collectionName).get();
		const data = response.docs.map(doc => doc.data());

		return data;
	}

	getItemById = async (collectionName, id) => {
		let response = await this.db.collection(collectionName).where('id', '==', id).get();
		const data = response.docs.map(doc => doc.data());

		return data[0];
	}
}

export default Firebase;