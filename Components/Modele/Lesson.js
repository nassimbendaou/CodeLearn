export default class Lesson{
    constructor(name,description,picture,question){
  
        this.description=description;
        this.name=name;
        this.picture=picture;     
        this.question=question
    }
   
    getPicture(){
        return this.picture;
    }
    getDiscription(){
        return this.description;
    }
    getName(){
        return this.name;
    }
    getQuestion(){
        this.question=this.question;
    }
    
}
