import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: '', // Fill your firebase API key
  authDomain: 'do-an-3d.firebaseapp.com',
  projectId: 'do-an-3d',
  storageBucket: 'do-an-3d.appspot.com',
  messagingSenderId: '223539329309',
  appId: '1:223539329309:web:e0bdd96839ad8ff01709f4',
  measurementId: 'G-E96MV6HLY1',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === 'localhost') {
  // auth.useEmulator('http://localhost:9099');
  // db.useEmulator('localhost', '8080');
}

export { db, auth };
export default firebase;
