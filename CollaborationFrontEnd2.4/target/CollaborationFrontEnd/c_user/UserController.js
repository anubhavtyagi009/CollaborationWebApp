'use strict';

app.controller('UserController',['$http','$scope','UserService','$location','$rootScope',   
       function($http,$scope,UserService,$location,$rootScope){
	console.log("UserController...")
	var self = this;
	self.user = {
			id : '',
			name :'',
			email : '',
			password : '',
			mob_no : '',
			dob : '',
			gender : '',
			role : '',
			errorMessage : '',
			errorCode : ''
	};
	self.users = [];
	
			self.fetchAllUsers = function(){
				UserService.fetchAllUsers().then(function(d){
					self.users = d;
				}, function(errResponse){
					console.error('Error while fetching Users');
				});
			};
	
			self.createUser = function(user){
				console.log("createUser...")
				UserService
				   .createUser(user)
				   .then(self.fetchAllUsers,
						function(errResponse)
						{
					console.error('Error while creating User');
				});
			};
	
			self.logout = function()
			{
				$rootScope.currentUser = {};
				$cookieStore.remove('currentUser');
			}
			
			self.updateUser = function(user, id){
				UserService.updateUser(user,id).then(self.fetchAllUsers,
						function(errResponse){
					console.error('Error while updating User');
				});
			};
	
			self.authenticate = function(user){
				UserService.authenticate(user).then(
						function(d) {
							   
							self.user = d;
							console.log("user.errorcode: " + self.user.errorcode)
							
							if(self.user.errorcode == "404")
								
								{
								
								alert("Invalid Credentials. Please try again.")
								
								self.user.id = "";
								self.user.password = "";
								
								}
							     else{
							    	 console.log("Valid credentials. Navigating to home page.")
							    	 $rootScope.currentUser = {
							    		 
							    		 name : self.user.name,
							    		 id : self.user.id,
							    		 role : self.user.role
							    		 
							    	 };
							    	 $http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.currentUser;
							    	 
							    	/* $cookieStore.put('currentuser', $rootScope.currentUser);*/
							    	 
							    	 $location.path("/");
							     }
						   },
							
							function(errResponse){
							console.error('Error while aunthenticate users');
						});
			};
						/*function(d){
							self.user = d;
							if($rootScope.currentUser.errorMessage!="")
								{
								$location.path("/login");
								}
							else($rootScope.currentUser)
							{
							$location.path("/");
							}
						},function(errResponse){
							console.error('Error while aunthenticating Users');
						});
			};*/
			
					self.deleteUser = function(id){
						UserService.deleteUser(id).then(self.fetchAllUsers,
								function(errResponse){
							console.error('Error while deleting User');
						});
					};
					
				self.fetchAllUsers();
				
				self.login= function(){
					{
						console.log('login validation??',self.user);
						self.authenticate(self.user);
					}
				};
				
				self.submit = function(){
					{
						console.log('saving new User', self.user);
						self.createUser(self.user);
					}
					self.reset();
				};
				
				 self.reset=function(){
		        	  console.log('resetting the form',self.user);
		        	  self.user={
		        			  id : '',
		        				name :'',
		        				email : '',
		        				password : '',
		        				mob_no : '',
		        				dob : '',
		        				gender : '',
		        				role : '',
		        				errorMessage : '',
		        				errorCode : ''
		        	  };
		        	  $scope.myForm.$setPristine();//reset form
		          };
		          
		          
				
				self.edit= function(id){
					console.log('id to be edited',id);
					for(var i = 0; i < self.users.length; i++){
						if (self.users[i].id === id){
							self.user = angular.copy(self.users[i]);
							break;
						}
					}
				};
}])