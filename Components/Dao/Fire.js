import firebase from "firebase"; // 4.8.1
import * as RootNavigation from "../Utils/RootNavigation";
import Toast from "react-native-tiny-toast";
import MyDB from './MyDB'
import User from "../Modele/User";
import * as Permissions from "expo-permissions";
import { Notifications } from 'expo';

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
    this.user={};
   
  }

  init = () =>{
    MyDB.shared.Connect();
  }
    

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        RootNavigation.navigate("testlogin");
      } catch ({ message }) {
        alert(message);
      }
    }
  };
  SignUp = (email, password) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          
          RootNavigation.navigate("initProfile");
          console.log(user);
        })
        .catch(function(error) {
          var errorMessage = error.message;
          Toast.show(errorMessage);
        });
    } catch (error) {
      Toast.show(error.toString(error));
    }
  };
  
  writeUserData = async(image, fname, lname,date,logiquelevel) => {
    console.log("before upload");
    this.uploadImage(image,firebase.auth().currentUser.uid).then((snapshot)=>{
      console.log("after upload");
      this.getImage().then((url)=>{
        console.log("get the img");
        var id = firebase.auth().currentUser.uid;
        var score=0;
        var level=1;
        var cours=[]
        console.log(image)
        this.user= { image:url, fname, lname, id,date,score,level,logiquelevel,cours };
    var users={image:url, 
    fname, lname, id,date,score,level,logiquelevel}
    this.ref.push(users);
    this.registerForPushNotificationsAsync();
      }).then(()=>{ console.log("fineshed get")})
    }).then(()=>{
      console.log("fineshed up");
    })
    
  };
  UpdateData=( image,fname,lname,date)=>{
    var key=null;
    this.ref
      .orderByChild("id")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", (snapshot)=>{
         key = Object.keys(snapshot.val())[0];
      });
      this.user.image=image;
      this.user.fname=fname;
      this.user.lname=lname;
      this.user.date=date;
   
    firebase.database().ref("UsersList/"+key).set(this.user);
  }
  UpdateUserData = async(image, fname, lname,date) => {
    console.log("before upload");
    if(this.user.image===image){
      this.UpdateData(image, fname, lname,date)
    }
    else{ this.uploadImage(image,firebase.auth().currentUser.uid).then((snapshot)=>{
      console.log("after upload");
      this.getImage().then((url)=>{
        console.log("get the img");
        this.UpdateData(url,fname, lname,date)
        
      }).then(()=>{ console.log("fineshed get")})
    }).then(()=>{
      console.log("fineshed up");
    })}
   
    
  };
  getImage= async ()=>{
    const ref = firebase.storage().ref('images/'+firebase.auth().currentUser.uid);
    const url = await ref.getDownloadURL();
    
   return url;
    }
    getImageFor= async (img)=>{
      const ref = firebase.storage().ref(img);
      const url = await ref.getDownloadURL();
      
     return url;
      }
  readUserData= async ()=> {
   // console.log(firebase.auth().currentUser.uid)
   var data={};
    this.ref
      .orderByChild("id")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", (snapshot)=> {
      
        snapshot.forEach((childSnapshot)=> {
          var childData = childSnapshot.val();             
          this.user=childData
          //console.log(childData) 
          this.registerForPushNotificationsAsync();     
            RootNavigation.navigate("App");
         
      
        });
      });
      return data;
      
  }
  getUserData=(id)=> {
    // console.log(firebase.auth().currentUser.uid)
    var data={};
     this.ref
       .orderByChild("id")
       .equalTo(id)
       .on("value", (snapshot)=> {
         
         snapshot.forEach((childSnapshot)=> {
           var childData = childSnapshot.val();             
           data=childData
      
               
         });
       });
       return data;
       
   }
  getALL= ()=>{
    var data=[];
    
    this.ref
      .on("value", (snapshot)=> {
     
        snapshot.forEach((childSnapshot)=> {
          var childData = childSnapshot.val();
          if(childData.id!=this.uid){data.push(childData)}             
          
              
        });
      });
     
      return data;
      
  }
  AddCourse=( name, lastStep)=>{
    var key=null;
    this.ref
      .orderByChild("id")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", (snapshot)=>{
         key = Object.keys(snapshot.val())[0];
      });
   
    firebase.database().ref("UsersList/"+key+"/LastCours").push({ name, lastStep });
  }

  UpdateScore=( Score)=>{
    var key=null;
    this.ref
      .orderByChild("id")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", (snapshot)=>{
         key = Object.keys(snapshot.val())[0];
      });
   
    firebase.database().ref("UsersList/"+key).set({score:Score});
  }
  UpdateInfos=(img)=>{
    var key=null;
    this.ref
      .orderByChild("id")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", (snapshot)=>{
         key = Object.keys(snapshot.val())[0];
      });
   
    firebase.database().ref("UsersList/"+key).set({image:img});
  }
  UpdateTestLevel=( logiquelevel)=>{
    var key=null;
    this.ref
      .orderByChild("id")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", (snapshot)=>{
         key = Object.keys(snapshot.val())[0];
      });
   
    firebase.database().ref("UsersList/"+key).update({logiquelevel:logiquelevel});
  }
  UpdateCours=(cours)=>{
    var key=null;
    this.ref
      .orderByChild("id")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", (snapshot)=>{
         key = Object.keys(snapshot.val())[0];
      });
   
    firebase.database().ref("UsersList/"+key).update({cours:cours});
  }
  uploadImage = async (uri, imageName) => {
    console.log("fetch")
     const response = await (await fetch(uri)).blob()
 
    console.log('blob',response)
    var ref = firebase.storage().ref().child("images/" + imageName);
    return  ref.put(response);
  }
  UpdateLevel=( level)=>{
    var key=null;
    this.ref
      .orderByChild("id")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", (snapshot)=>{
         key = Object.keys(snapshot.val())[0];
      });
   
    firebase.database().ref("UsersList/"+key).set({level:level});
  }
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {

      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    try {
      let token = await Notifications.getExpoPushTokenAsync();
console.log(token)
     this.SetToken(token);
    } catch (error) {
      console.log(error);
    }
  };
  SetToken=( token)=>{
    var key=null;
    this.ref
      .orderByChild("id")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", (snapshot)=>{
         key = Object.keys(snapshot.val())[0];
      });
      
   this.user={...this.user,...{token:token}}
    firebase.database().ref("UsersList/"+key).set(this.user)
  }
  Signin = (email, password) => {
    try {
      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
         this.readUserData();
        
        })
        .catch(function(error) {
          var errorMessage = error.message;
          Toast.show(errorMessage);
          // ...
        });
     
    } catch (error) {}
  };
 
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get email(){
    return (firebase.auth().currentUser || {}).email;
  }

  get ref() {
    return firebase.database().ref("UsersList");
  }
  off() {
    this.refM.off();
  }
}

Fire.shared = new Fire();
export default Fire;
