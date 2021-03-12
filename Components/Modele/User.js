export default class User{
    constructor(id,lname,fname,date,email,picture,score,level,recentCours){
        this.id=id;
        this.lname=lname;
        this.fname=fname;
        this.date=date;
        this.email=email;
        this.picture=picture;
        this.score=score;
        this.level=level;
        this.recentCours=recentCours;
    }
    getRecentCourses(){
        return this.recentCours;
    }
    getName(){
        return this.fname +" "+this.lname
    }
    getEmail(){
        return this.email;
    }
    getPic(){
        return this.picture;
    }
    getLevel(){
        return this.level;
    }
    getScore(){
        return this.score;
    }
    setName(fname,lname){
        this.fname=fname;
        this.lname=lname;
    }
    setPic(pic){
        this.picture=pic;
    }
    setEmail(email){
        this.email=email;
    }

}