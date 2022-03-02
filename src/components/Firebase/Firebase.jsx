import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAkoDuCq_1-iz2BD8O9_TgHdN-mY1JPwDo",
    authDomain: "laurel-review.firebaseapp.com",
    projectId: "laurel-review",
    storageBucket: "laurel-review.appspot.com",
    messagingSenderId: "843179690938",
    appId: "1:843179690938:web:1d98ef5fe70b9271a1eb83"
  };
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;