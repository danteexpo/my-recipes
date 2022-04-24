import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyD_dBbJHQPec-sKj74glHelY9yjMW6-TAE",
	authDomain: "my-recipes-11ed4.firebaseapp.com",
	projectId: "my-recipes-11ed4",
	storageBucket: "my-recipes-11ed4.appspot.com",
	messagingSenderId: "639878395021",
	appId: "1:639878395021:web:9c37e563e4a8dae6669ec4",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore };
