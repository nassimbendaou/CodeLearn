import firebase from "firebase"; // 4.8.1
class MyDb {
    constructor() {
      
    }
    Connect = () =>
    firebase.initializeApp({
      apiKey: "AIzaSyANGo9F0MtxJf8wkur-81yJyQ3ALZTlEUQ",
    authDomain: "sololearn-fcfe1.firebaseapp.com",
    databaseURL: "https://sololearn-fcfe1.firebaseio.com",
    projectId: "sololearn-fcfe1",
    storageBucket: "sololearn-fcfe1.appspot.com",
    messagingSenderId: "498178347858"
    });
}
MyDb.shared = new MyDb();
export default MyDb;