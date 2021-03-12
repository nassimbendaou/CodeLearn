import Fire from "../Dao/Fire";
import User from "../Modele/User"
class UserService{
    constructor(){
       
    }
   async writeUserData(image,fname,lname,date,logiquelevel){
        Fire.shared.writeUserData(image,fname,lname,date,logiquelevel);
       
    }
    async UpdateUserData(image,fname,lname,date){
        Fire.shared.UpdateUserData(image,fname,lname,date);
       
    }
    UpdateMyScore(score){
        Fire.shared.UpdateScore(score);
    }
    UpdateTestLevel=(logiquelevel)=>{
        Fire.shared.UpdateTestLevel(logiquelevel);
    }
    UpdateMyLevel(level){
        Fire.shared.UpdateLevel(level);
    }
    AddCours(name,lastStep){
        Fire.shared.AddCourse(name,lastStep);
    }
    SignUp(email,password){
        Fire.shared.SignUp(email,password);
    }
    SignIn(email,password){
     Fire.shared.Signin(email,password);
  
    }
}
UserService.shared=new UserService();
export default UserService;