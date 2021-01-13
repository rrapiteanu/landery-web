import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCs4jxBCWtyPAEO7uf2cjznKNfZsbKYvbk",
    authDomain: "landery.firebaseapp.com",
    projectId: "landery",
    storageBucket: "landery.appspot.com",
    messagingSenderId: "604884070177",
    appId: "1:604884070177:web:948b44d671712f26cb9860",
};


export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();