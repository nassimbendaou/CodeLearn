import FireTestLogique from "../Dao/FireTestLogique";

class TestLogiqueService{
    constructor(){
       this.list=[];
    }
    getRandomQuestions(){
        var randomTest=[];
        var List=[];
        
        List=FireTestLogique.shared.getAllTestesLogiques();
        
        var y=[];
      var x=0;
      var a=0;
      
      while(a<10){
      x=Math.floor((Math.random()*48));
        if(!y.includes(x)){
        y.push(x);
          randomTest.push(List[x]);
       
         a++;
        }
      }
    
     
      return randomTest;
     
       
    }
    getTestbyName(name,level){
      var randomTest=[];
      var List=[];        
        List=FireTestLogique.shared.getestByName(name);
      var y=[];
      var newList=[];
      var x=0;
      var a=0;
      List.forEach(element => {
        if(element.level===level){
          console.log("q",element);
          newList.push(element);
        }
      });
     
      while(a<10){
      x=Math.floor((Math.random()*10));
        if(!y.includes(x)){
          y.push(x);
          randomTest.push(newList[x]); 
         a++;
        }
      }
      console.log("list",randomTest);
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
TestLogiqueService.shared=new TestLogiqueService();
export default TestLogiqueService;