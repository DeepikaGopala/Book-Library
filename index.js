console.log("HELLO");
var library = angular.module("BookLibrary",['ui.router','ui.bootstrap']);
library.service("dataservice",function(){
	return {
		getBooksLibrary : function (){
			return [	
						{	name:"Currently Reading",
							booklist:[
									{bookname:"The thousand Splendid suns",writer:"Kaled hosineni",img:"images/thousand splendid suns.jpg"},					
									{bookname:"To kill a mocking bird",writer:"Harper lee",img:"images/To kill a mocking bird.png"},					
									{bookname:"The Da Vinci Code",writer:"Dan Brown",img:"images/da vinci code.jpg"},					
						]},
						{ 	name:"Want to Read",
							booklist:[
									{bookname:"The thousand Splendid suns",writer:"Kaled hosineni",img:"images/thousand splendid suns.jpg"},					
									{bookname:"To kill a mocking bird",writer:"Harper lee",img:"images/To kill a mocking bird.png"},					
									{bookname:"The Da Vinci Code",writer:"Dan Brown",img:"images/da vinci code.jpg"},
						]},
						{ name:"Read",
							booklist:[
									{bookname:"The thousand Splendid suns",writer:"Kaled hosineni",img:"images/thousand splendid suns.jpg"},					
									{bookname:"To kill a mocking bird",writer:"Harper lee",img:"images/To kill a mocking bird.png"},					
									{bookname:"The Da Vinci Code",writer:"Dan Brown",img:"images/da vinci code.jpg"},
						]}
					];
		}
	}
})
library.config(function($stateProvider,$locationProvider){
	//$locationProvider.html5Mode(true);
	 //$urlRouterProvider.otherwise('/')
	$locationProvider.hashPrefix('');
	$stateProvider.state("root",{
		url:"",
		views:{
			'searchContent@':{
				template:'<div class="row">'+
						 '<div class="container" ng-controller="MainController">'+
							'<div class="row pull-right">'+
								'<div class="col-sm-12 pull-right">'+
									'<a ui-sref="searchbook">Search Books</a>'+
								'</div>'+
							'</div>'+
							'<!--<div class="row">'+
								'<div class="col-sm-offset-4 col-sm-4">'+
									'<ul  class="list-group list-item">'+
										'<li ng-repeat="eachshelf in booklibrary">'+
											'<div>{{eachshelf.name}}</div>'+
										'</li>		'+
									'</ul>'+
								'</div>'+
							'</div>-->'+
							'<div ng-repeat="eachbookshelf in booklibrary">'+
								'<individual-shelf eachbookshelf="eachbookshelf" booklibrary="booklibrary"  parentIndex=$index+1></individual-shelf>'+
							'</div>',
				 controller:"MainController"
			}
		}
		
	})
	$stateProvider.state("searchbook",{
	   url:"/search",
	   views:{
	   	  	  'searchContent@':{
	   	  	  	 template:'<div class="row header">' +
					'<div class="col-md-12">' +
						'<a ui-sref="/"><i class="fas fa-arrow-left"></i></a>' +
						'<input type="textbox" ng-model="searchbook.$" class="form-control" />' +
					'</div>' +
				'</div>' +
				'<div class="col-sm-12 panel-content">'+
				'<div ng-repeat="eachbook in booklibrary | filter:searchbook" class="col-sm-4 col-md-4 panel-content-item">'+
					'<figure>'+
						'<img ng-src="{{eachbook.booklibrary[$index].img}}" alt="bookthumbnail"/>'+
						'<div class="dropdown" uib-dropdown>'+
							'<a class="MoveBook" id="move-to" uib-dropdown-toggle aria-haspopup="true" aria-expanded="false">'+
									'<i class="fas fa-caret-down"></i>'+
							'</a>'+
							'<ul  class="list-group list-item dropdown-menu" uib-dropdown-menu role="menu" aria-labelledby="move-to">'+
								'<li disabled="disabled"><a>Move To</a></li>'+
								'<li ng-repeat="eachshelf in bookshelfs" ng-class="{{parentindex == eachshelf.id?ticked:noticked}}">'+
								'	<a ui-sref="{{eachshelf[$index].state}}">{{eachshelf[$index].name}}</a>'+
								'</li>	'+
								'<li><a>None</a></li>		'+
							'</ul>'+
						'</div>'+
						'<figcaption>{{eachbook.bookname}}<br/>{{eachbook.writer}}</figcaption>'+
					'</figure>'+
				'</div>'+
			'</div>',
	  		 controller:"SearchBookController"
	  		}
	   }

	})
});


library.controller("MainController",function($scope,dataservice){
		$scope.booklibrary  = dataservice.getBooksLibrary();
		$scope.status = {
		    isopen: false
		  };
});

library.controller("SearchBookController",function($scope,dataservice){
	 $scope.booklibrary  = dataservice.getBooksLibrary();
});

library.directive("individualShelf",function(){
	return{
		restrict:"E",
		scope:{
			eachbookshelf :"=",
			booklibrary:"=",
			parentindex :"="
		},
		templateUrl:'individualShelf.html',
		link:function(scope,element,attrs){
				 scope.bookshelfs = [];
				 for(var i in scope.booklibrary){
			        if (scope.eachbookshelf.name == scope.booklibrary[i].name) {
			          scope.categorybookdetails = scope.booklibrary[i].booklist;
					}
			       scope.bookshelfs.push(scope.booklibrary[i].name);
			     }
		}
	}
})