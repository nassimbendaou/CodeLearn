
import TestLogiqueService from "../Business/TestLogiqueService";
class TestLogiqueController{
    constructor(){
        
    }
    getRandomTest(){
     return TestLogiqueService.shared.getRandomQuestions();
    }
    getTestByname(name,level){
        return TestLogiqueService.shared.getTestbyName(name,level);
    }
    getMyScore(test,answers){
        return TestLogiqueService.shared.getScore(test,answers);
    }
   
}
TestLogiqueController.shared=new TestLogiqueController();
export default TestLogiqueController;