export class Cours{
    constructor(name,picture,lessons){
        this.name=name;
        this.picture=picture;
        this.lessons=lessons;
    }
    getPicture(){
        return this.picture;
    }
    getLessons(){
        return this.lessons;
    }
    getname(){
        return this.name;
    }
}