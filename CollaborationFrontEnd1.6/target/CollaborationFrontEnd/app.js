var app=angular.module('myApp',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	
	.when('/',{
		templateUrl : 'c_home/home.html',
		controller : 'HomeController'
	})
.when('/job_opportunities',{
	templateUrl : 'c_job/job.html',
	controller : 'JobController'
})	
.when('/event',{
	templateUrl : 'c_event/event.html',
	controller : 'EventController'
})
.when('/about',{
	templateUrl : 'c_about/about.html',
	controller : 'AboutController'
})
.when('/login',{
	templateUrl : 'c_user/login.html',
	controller : 'UserController'
})
.when('/register',{
templateUrl : 'c_user/register.html',
controller : 'UserController'
	
})
/** Blog Related**/
.when('/create_blog',{
	templateUrl : 'c_blog/create_blog.html',
	controller : 'BlogController'
	
})
.when('/list_blog',{
	templateUrl : 'c_blog/list_blog.html',
		controller : 'BlogController'	
})
.when('/view_blog',{
	templateUrl : 'c_blog/view_blog.html',
	controller : 'BlogController'
	
})

.when('/view_applied_jobs',{
	templateUrl : 'c_job/view_applied_jobs.html',
	controller : 'JobController'
	
})
.when('/post_job',{
	templateUrl : 'c_job/post_job.html',
		controller : 'JobController'	
})
.when('/view_job_details',{
	templateUrl : 'c_job/view_job_details.html',
	controller : 'JobController'
	
})
.when('/search_job',{
	templateUrl : 'c_job/search_job.html',
		controller : 'JobController'	
})

/***Friends related mapping**/
.when('/add_friend',{
		templateUrl : 'c_friend/add_friend.html',
		controller : 'FriendController'
		
	})
	
	.when('/search_friend',{
		templateUrl : 'c_friend/search_friend.html',
		controller : 'FriendController'
	})

	.when('/view_friend',{
		templateUrl : 'c_friend/view_friend.html',
		controller : 'FriendController'
	})

	
.otherwise({redirectTo: '/'});
})
	
	
		
