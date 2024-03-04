import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyAceHTAU_hhYO_efcGa8vTXN9UcDl5gV60",
  authDomain: "zeopuri.firebaseapp.com",
  databaseURL: "https://zeopuri-default-rtdb.firebaseio.com",
  projectId: "zeopuri",
  storageBucket: "zeopuri.appspot.com",
  messagingSenderId: "671052686292",
  appId: "1:671052686292:web:a69bf9e0fb0436fa962c41"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
