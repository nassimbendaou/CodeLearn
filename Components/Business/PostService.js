import FirePosts from "../Dao/FirePosts";


class PostService{
    constructor(){
       this.list=[];
    }
    
    getAll=()=>{
        return FirePosts.shared.getAllPosts();
    }
    sendQuiz= async(title,questions,uid,obj)=>{
        return FirePosts.shared.sendQuiz(title,questions,uid,obj)
      }
    sendPost=async(text,title,img,uid)=>{
        console.log(img)
        return FirePosts.shared.sendPost(text,title,img,uid);
    }
   
}
PostService.shared=new PostService();
export default PostService;