package com.niit.collaboration.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Entity
@Table(name="c_forum")
@Component

public class Forum {


	
		@Id
		private int forum_Id;
		private String forum_Name;
		private String topic;
		private Date creation_Date;
		private int user_Id;
		public int getForum_Id() {
			return forum_Id;
		}
		public void setForum_Id(int forum_Id) {
			this.forum_Id = forum_Id;
		}
		public String getForum_Name() {
			return forum_Name;
		}
		public void setForum_Name(String forum_Name) {
			this.forum_Name = forum_Name;
		}
		
		public Date getCreation_Date() {
			return creation_Date;
		}
		public void setCreation_Date(Date creation_Date) {
			this.creation_Date = creation_Date;
		}
		
		public int getUser_Id() {
			return user_Id;
		}
		public void setUser_Id(int user_Id) {
			this.user_Id = user_Id;
		}
		public String getTopic() {
			return topic;
		}
		public void setTopic(String topic) {
			this.topic = topic;
		}
		
	
}
