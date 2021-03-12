export default class Question{
    constructor(answer,picture,quest,optiens){
  
        this.answer=answer;
        this.optiens=optiens;
        this.picture=picture;     
        this.quest=quest
    }
   
    getPicture(){
        return this.picture;
    }
    getQuest(){
        return this.quest;
    }
    getName(){
        return this.optiens;
    }
    getAnswer(){
        this.question=this.Answer;
    }
    
}
