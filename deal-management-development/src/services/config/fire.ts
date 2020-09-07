import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDw8wup57HgpqeC4rAlOPv0zwIEmzqaEgs",
  authDomain: "react-dashbord-23aac.firebaseapp.com",
  databaseURL: "https://react-dashbord-23aac.firebaseio.com",
  projectId: "react-dashbord-23aac",
  storageBucket: "react-dashbord-23aac.appspot.com",
  messagingSenderId: "447820465093",
  appId: "1:447820465093:web:f31888bf6d9ddc08bf41ac",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
