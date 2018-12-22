import * as firebase from 'firebase';
import 'firebase/firestore';

var config = {
  apiKey: 'AIzaSyBzFFVgfqBdVYz5ZXJIuaKaFHchuyRHUuE',
  authDomain: 'steviewarediplomacy.firebaseapp.com',
  databaseURL: 'https://steviewarediplomacy.firebaseio.com',
  projectId: 'steviewarediplomacy',
  storageBucket: 'steviewarediplomacy.appspot.com',
  messagingSenderId: '1037442750989'
};
firebase.initializeApp(config);
var db = firebase.firestore();
db.settings({
      timestampsInSnapshots: true
});

export default db;