package com.niit.collaboration.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.niit.collaboration.model.BlogComment;

@EnableTransactionManagement
@Repository("blogCommentDAO")
public class BlogCommentDAOImpl implements BlogCommentDAO {

	@Autowired
	private SessionFactory sessionFactory;
	public BlogCommentDAOImpl(SessionFactory sessionFactory)
	{
		this.sessionFactory=sessionFactory;
	}
	
	@Transactional
	public boolean save(BlogComment blogComment) {
		try {
			sessionFactory.getCurrentSession().save(blogComment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
	}

	@Transactional
	public List<BlogComment> list() {
		
		String hql= "from BlogComment";
		Query query=sessionFactory.getCurrentSession().createQuery(hql);
		
		List<BlogComment> listBlogComment = query.list();
		if(listBlogComment == null || listBlogComment.isEmpty())
		{
			return null;	
		}
		return query.list();
		
	}

	@Transactional
	public BlogComment get(int id) {
		
		String hql = "from BlogComment where id=" +"'" +id +"'";
		
		Query query=sessionFactory.getCurrentSession().createQuery(hql);
		@SuppressWarnings({ "unchecked" })
		List<BlogComment> list=query.list();
		if(list==null || list.isEmpty())
		{
			
			return null;
		}
		else
		{
			return new BlogComment();
		}
	}

}
