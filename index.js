console.log("HELLO");
var library = angular.module("BookLibrary",['ui.router','ui.bootstrap']);
library.service("dataservice",function(){
	return {
		getshelfdetails:function(){
			 return [{ id:"1",name:"Currently Reading",state:"currentlyReading"},
					{ id:"2",name:"Want to Read",state:"wanttoread"},
					{ id:"3",name:"Read",state:"read"}]
		} ,

		getbooksdetails : function (){
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
	$locationProvider.hashPrefix('');
	$stateProvider.state("root",{
		url:"",
		template:'<div class="row">'+
			'<div class="col-sm-12 pull-right">' +
			'	<a ui-sref="searchbook">Serach Books</a>' +
			'</div>' +
		'</div>' +
		'<div class="row">' +
			'<div class="col-sm-offset-4 col-sm-4">' +
				'<ul  class="list-group list-item">' +
					'<li ng-repeat="eachshelf in bookshelfs">' +
						'<a ui-sref="{{eachshelf.state}}">{{eachshelf.name}}</a>' +
					'</li>		' +
				'</ul>' +
			'</div>' +
		'</div>' +
		'<div ng-repeat="shelf in bookshelfs">' +
			'<individual-shelf librarytype="shelf" booksdetails = "booklist" parentIndex = $index+1></individual-shelf>' +
		'</div>',
		 controller:"MainController"
	})
	$stateProvider.state("searchbook",{
	   url:"/search",
	   template:'<div class="row header">' +
					'<div class="col-md-12">' +
						'<a ui-sref="/"><i class="fas fa-arrow-left"></i></a>' +
						'<input type="textbox" ng-model="searchbook.$" class="form-control" />' +
					'</div>' +
				'</div>' +
				'<div class="col-sm-12 panel-content">'+
				'<div ng-repeat="eachbook in booklist | filter:searchbook" class="col-sm-4 col-md-4 panel-content-item">'+
					'<figure>'+
						'<img ng-src="{{eachbook.booklist[$index].img}}" alt="bookthumbnail"/>'+
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
	})
});


library.controller("MainController",function($scope,dataservice){
		$scope.bookshelfs  = dataservice.getshelfdetails();
		$scope.booklist  = dataservice.getbooksdetails();
		$scope.status = {
		    isopen: false
		  };

	  $scope.onClick = function($event) {
	    // $event.preventDefault();
	    // $event.stopPropagation();
	    $scope.status.isopen = !$scope.status.isopen;
	  };
});

library.controller("SearchBookController",function($scope,dataservice){
	 $scope.booklist  = dataservice.getbooksdetails();

});

library.directive("individualShelf",function(){
	return{
		restrict:"E",
		scope:{
			librarytype :"=librarytype",
			booksdetails:"=booksdetails",
			parentindex :"=parentindex"
		},
		templateUrl:'individualShelf.html',
		link:function(scope,element,attrs){
				 for(var i in scope.booksdetails){
			        if (scope.librarytype.name == scope.booksdetails[i].name) {
			          scope.categorybookdetails = scope.booksdetails[i].booklist;
			          console.log(scope.categorybookdetails)
			          }
			        }
		}
	}
})