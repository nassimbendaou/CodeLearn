
import TestTechService from "../Business/TestTechService";
class TestTechController{
    constructor(){
        
    }
    getRandomTests(test){
        return TestTechService.shared.RandomTestsbyName(test);
    }
  
    getTestByname(name){
        return TestTechService.shared.getTestbyName(name);
    }
    
    getMyScore(test,answers){
        return TestTechService.shared.getScore(test,answers);
    }
   
}
TestTechController.shared=new TestTechController();
export default TestTechController;