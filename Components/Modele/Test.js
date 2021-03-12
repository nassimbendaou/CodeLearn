export default class Test{
    constructor(name,questions,picture){
        
        this.questions=questions;
        this.name=name;
        this.picture=picture;

    }
    getQuestions(){
        return this.questions;
    }
    getPicture(){
        return this.picture;
    }

}
