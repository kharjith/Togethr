import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCbKawCtAcIbMt3XR2JftiC1vpOZN0hkek",
  authDomain: "socialapp-47e27.firebaseapp.com",
  databaseURL: "https://socialapp-47e27-default-rtdb.firebaseio.com",
  projectId: "socialapp-47e27",
  storageBucket: "socialapp-47e27.appspot.com",
  messagingSenderId: "32390529532",
  appId: "1:32390529532:web:923cf783a5fc0fffa5b279"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
export default firebase.firestore();