import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyAypMLEpNzTtaYTzJcTwijMXZKCbR50puU",
  authDomain: "beyond-app-999.firebaseapp.com",
  projectId: "beyond-app-999",
  storageBucket: "beyond-app-999.appspot.com",
  messagingSenderId: "1079978518244",
  appId: "1:1079978518244:web:478f39ac54a592f410eef1"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db }; 