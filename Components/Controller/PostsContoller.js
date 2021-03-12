
import PostService from "../Business/PostService";
class PostsController{
    constructor(){
        
    }
    sendPost= async (text,title,img,uid)=>{
     
      return PostService.shared.sendPost(text,title,img,uid)
    }
    sendQuiz=async(title,questions,uid,obj)=>{
      return PostService.shared.sendQuiz(title,questions,uid,obj)
    }
   getAll=()=>{
       return PostService.shared.getAll();
   }
   
}
PostsController.shared=new PostsController();
export default PostsController;