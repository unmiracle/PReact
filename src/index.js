global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
import './style';
import Firebase from './firebase';
import App from './components/app';

export const firebase = new Firebase();

export default App;
