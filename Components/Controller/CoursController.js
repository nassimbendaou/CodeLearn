
import CoursService from "../Business/CoursService";
class CoursController{
    constructor(){
        this.ListCours=[]
    }
    getAll(){
     return CoursService.shared.getAll();
        
       
    }
    getCoursByName(name){
        return CoursService.shared.getCoursByName(name);
    }
   
}
CoursController.shared=new CoursController();
export default CoursController;