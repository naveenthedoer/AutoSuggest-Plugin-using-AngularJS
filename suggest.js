var ajaxGo = false;
var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope) {
	$scope.textModel = "";
	$scope.results = [];
	var startPositions =[];
	var endPositions =[];
	var strNum = 0;
	var cursorPosition;
	
	$scope.change = function($event) {
		//object of username and links
		$scope.Suggestions = [{
			name : "Naveen Yadav Batta",
			link : "www.example.com/naveen"
		}, {
			name : "Siddartha Adusumalli",
			link : "www.example.com/siddu"
		}, {
			name : "Anil Kumar Bokka",
			link : "www.example.com/anil"
		}, {
			name : "Srikanth Nani",
			link : "www.example.com/srikanth"
		}, {
			name : "Pradeep Vanga",
			link : "www.example.com/pradeep"
		}, {
			name : "Vijay Chitirala",
			link : "www.example.com/vijay"
		}, {
			name : "Vijay Raghava",
			link : "www.example.com/raghava"
		}, {
			name : "Vijay Simha",
			link : "www.example.com/simha"
		}, {
			name : "Pradeep Reddy",
			link : "www.example.com/reddy"
		}, {
			name : "Siddugadu",
			link : "www.example.com/Siddugadu"
		}, {
			name : "Naveen Batta",
			link : "www.example.com/batta"
		}, {
			name : "Sandesh",
			link : "www.example.com/sandesh"
		}, {
			name : "Sandeep",
			link : "www.example.com/sandeep"
		}, {
			name : "Anupama",
			link : "www.example.com/anupama"
		}, {
			name : "Rahul",
			link : "www.example.com/rahul"
		}];
		
		//check keycodes and add show matched usernames and remove usernames on backspace keypress
		if ($event.keyCode == 50) {
			ajaxGo = true;
		} else if (($event.keyCode != 13) && ajaxGo == true) {
			var namesArray = [];
			var firstLetter;
			var strArray = $scope.textModel.lastIndexOf("@");
			if (strArray != -1) {
				strArray += 1;
				var userNameStr = $scope.textModel.substring(strArray);
				if (userNameStr.length == 0) {
					$scope.results = [];
					return;
				}
				angular.forEach($scope.Suggestions, function(obj) {
					var name = obj.name;
					name = name.toLowerCase();
					userNameStr = userNameStr.toLowerCase();
					name = name.substring(0, userNameStr.length);
					if (name == userNameStr) {
						namesArray.push(obj);
					}
				});
				$scope.results = namesArray;
			}

		} else if ($event.keyCode == 13) {
			ajaxGo = false;
		}
		
		if(startPositions.length >0){
		    if($event.keyCode == 8){
			for(var i=0; i<startPositions.length;i++){
                if(cursorPosition>startPositions[i] && cursorPosition<endPositions[i]){
                        var parent = document.getElementById ("pseudoCommentBox");
                        var childern = parent.getElementsByTagName('a').length;
                        parent.getElementsByTagName('a')[i].remove();
                        $scope.textModel = $scope.textModel.substring(0,startPositions[i])+$scope.textModel.substring(endPositions[i]);
                        var updateStartEndPoints = endPositions[i]-startPositions[i]+1;
                        startPositions.splice(i,1);
                        endPositions.splice(i,1);
                        for(var j=i; j<startPositions.length; j++){
                            startPositions[j]= startPositions[j]-updateStartEndPoints;
                            endPositions[j] = endPositions[j]-updateStartEndPoints;
                        }
                    }
                }
            }
        }

	}
	
	//Adding username and highlighting it
	$scope.addUserLink = function(text,link) {
		var userSuggetion = $scope.textModel.lastIndexOf("@");
		$scope.textModel = $scope.textModel.substring(0, userSuggetion) + text;
		startPositions.push(userSuggetion);
		endPositions.push(text.length+userSuggetion);
		var nav = $scope.textModel.substring(strNum, userSuggetion) + '<a href="http://'+link+'" target="_blank">'+text+'</a>';
		document.getElementById('pseudoCommentBox').innerHTML +=nav;
		$scope.results = [];
		strNum = $scope.textModel.length;
		document.getElementById("commentBox").focus();
	}
	
	//posting comment with usernames and their links
	$scope.postComment = function() {
	    if($scope.textModel.length>0){
	        var comment = "";
	        if(document.getElementById('pseudoCommentBox').innerHTML.length >0){
	            comment = document.getElementById('pseudoCommentBox').innerHTML;
	            document.getElementById('commentsContainer').innerHTML = '<div class="comment">'+comment+'</div>'+document.getElementById('commentsContainer').innerHTML;
	        }else{
	            comment = $scope.textModel;
	            document.getElementById('commentsContainer').innerHTML = '<div class="comment">'+comment+'</div>' +document.getElementById('commentsContainer').innerHTML;
	        }
	        $scope.textModel = "";
            document.getElementById('pseudoCommentBox').innerHTML = "";
            strNum = 0;
            startPositions = [];
            endPositions = [];
	    }
	}
	
	//to know cursor location to remove username on backspace keypress
	$scope.cursorLocation = function($event){
	    cursorPosition = document.getElementById("commentBox").selectionStart; 
	}
	
});