import FireTestTech from "../Dao/FireTestTech";

class TestTechService{
    constructor(){
       
    }
 
    getTestbyName(name){
      var randomTest=[];
      var List=[];        
        List=FireTestTech.shared.getestByName(name);
        if(List.length===0){
          console.log("yeees sir")
          return [];
        }
       // console.log(FireTestTech.shared.getestByName(name))
      var y=[];
      var x=0;
      var a=0;
      var ln=List.length;
     console.log("list",List.length)
      while(a<10){
      x=Math.floor((Math.random()*ln));
        if(!y.includes(x)){
          y.push(x);
          console.log("item",x)
          randomTest.push(List[x]); 
         a++;
        }
      }
     
      return randomTest;
      
    }
    RandomTestsbyName(test){
      var randomTest=[];
      var List=[];        
        List=test;
        if(List.length===0){
          console.log("yeees sir")
          return [];
        }
        
       // console.log(FireTestTech.shared.getestByName(name))
      var y=[];
      var x=0;
      var a=0;
        var ln=List.length;
     console.log("list",ln)
      while(a<10){
      x=Math.floor((Math.random()*ln));
        if(!y.includes(x)){
          y.push(x);
          randomTest.push(List[x]); 
         a++;
        }
      }
     
      return randomTest;
      
    }
    getScore(randomTest,answers){
      var score=0;
      for(let i=0;i<randomTest.lenght;i++){
        if(randomTest[i].answer===answers[i]){
          score++;
        }
      }
      return score; 
    }
   
   
}
TestTechService.shared=new TestTechService();
export default TestTechService;