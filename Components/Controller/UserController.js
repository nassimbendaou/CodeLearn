import Fire from "../Dao/Fire";
import User from "../Modele/User"
import UserService from "../Business/UserService";
class UserController{
    constructor(){
       
        this.logiquelevel=   [ {
            levels : [ {
              disabled : true,
              num : 1
            }, {
              disabled : false,
              num : 2
            }, {
              disabled : false,
              num : 3
            }, {
              disabled : false,
              num : 4
            } ],
            name : "matrice"
          }, {
            levels : [  {
              disabled : true,
              num : 1
            }, {
              disabled : false,
              num : 2
            } ],
            name : "pilage"
          } ];
    }
    async writeUserData(image,fname,lname,date){
      
        UserService.shared.writeUserData(image,fname,lname,date,this.logiquelevel);
         
    }
    async UpdateUserData(image,fname,lname,date){
      
      UserService.shared.UpdateUserData(image,fname,lname,date);
       
  }
    SignUp(email,password){
        UserService.shared.SignUp(email,password);
       
        
    }
    SignIn(email,password){    
       
         UserService.shared.SignIn(email,password);
         
       
        
    }
    AddCours(name,lastStep){
        UserService.shared.AddCours(name,lastStep);
    }
    UpdateTestLevel=(logiquelevel)=>{
        UserService.shared.UpdateTestLevel(logiquelevel)
    }
    updateScore(score){
        UserService.shared.UpdateMyScore(score);
    }
    updateLevel(level){
        UserService.shared.UpdateMyLevel(level);
    }

}
UserController.shared=new UserController();
export default UserController;