package com.niit.collaboration.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.niit.collaboration.dao.BlogCommentDAO;
import com.niit.collaboration.model.BlogComment;

@RestController
public class BlogCommentController {

	@Autowired
	private BlogCommentDAO blogCommentDAO;
	
	@Autowired
	private BlogComment blogComment;
	
	@RequestMapping(value = "/blogcomments" , method = RequestMethod.GET)
	public ResponseEntity<List<BlogComment>> getblogcomments()
	{
		List<BlogComment> blogcomment = blogCommentDAO.list();
		if(blogcomment == null)
		{
			blogComment = new BlogComment();
			blogComment.setErrorCode("404");
			blogComment.setErrorMessage("No blogs are available");
       	  return new ResponseEntity<List<BlogComment>>(HttpStatus.NO_CONTENT);
		}
		 else
		 {
       	  return new ResponseEntity<List<BlogComment>>(blogcomment,HttpStatus.OK);
         }
	}
	
	@RequestMapping(value = "/blogcomment{id}" , method = RequestMethod.GET)
	public BlogComment getBlog(@PathVariable("id")int id){
		
		BlogComment blogcoment = blogCommentDAO.get(id);
		if(blogcoment == null)
		{
			blogcoment = new BlogComment();
			blogcoment.setErrorCode("404");
			blogcoment.setErrorMessage("Blog not found with the id"+ id);
		}
		
		return blogComment;
	}
	
	@RequestMapping(value = "/blogcomment/" , method = RequestMethod.POST)
	public ResponseEntity<BlogComment> createBlog(@RequestBody String comm, /*@PathVariable("blogID") int blogID,*/ HttpSession httpsession) {
		System.out.println("Comment from the front end "+blogComment.getBlogcomment());
   		String loggedInuserID = (String) httpsession.getAttribute("loggedInUserID");
	
   		blogComment.setUserID(loggedInuserID);  	
   		/*blogComment.setBlogID(blogID);*/
   		blogComment.setBlogcomment(comm);
   		blogComment.setDateTime(null);
		blogCommentDAO.save(blogComment);
		
		return new ResponseEntity<BlogComment>(blogComment, HttpStatus.OK);
	}
	
}
