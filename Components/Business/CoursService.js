import FireCours from "../Dao/FireCours";

class CoursService{
    constructor(){
       
    }
    getAll(){
        
       FireCours.shared.getAllCoourses();
       return FireCours.shared.list;
       
    }
    getCoursByName=(name)=>{
        var mycours=null;
        FireCours.shared.list.forEach((cours)=>{
            if(cours.name===name){
                mycours=cours;  
            }
        });
        return mycours;
    }
   
}
CoursService.shared=new CoursService();
export default CoursService;