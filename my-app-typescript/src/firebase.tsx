import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyBzFFVgfqBdVYz5ZXJIuaKaFHchuyRHUuE",
  authDomain: "steviewarediplomacy.firebaseapp.com",
  databaseURL: "https://steviewarediplomacy.firebaseio.com",
  projectId: "steviewarediplomacy",
  storageBucket: "steviewarediplomacy.appspot.com",
  messagingSenderId: "1037442750989"
};
  firebase.initializeApp(config);

  export default firebase;