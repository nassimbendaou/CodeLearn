import firebase from "firebase"; // 4.8.1
class MyDb {
    constructor() {
      
    }
    Connect = () =>
    firebase.initializeApp({
      apiKey: "**********",
    authDomain: "**********",
    databaseURL: "**********",
    projectId: "**********",
    storageBucket: "**********",
    messagingSenderId: "**********",
    });
}
MyDb.shared = new MyDb();
export default MyDb;
