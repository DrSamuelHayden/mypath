var firePosts = angular.module("firePosts", ["firebase", "angularMoment"]);

firePosts.controller("postsCtrl", function($scope, $firebaseArray){
  
  var ref = new Firebase('https://demochatter.firebaseio.com/posts');
  
  $scope.posts = $firebaseArray(ref);
  
  // Add Post
  $scope.addPost = function(){
    if ($scope.newPost !== ""){
     $scope.posts.$add({
        text: $scope.newPost,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        likes: 0,
      });
      $scope.newPost = "";     
    }
  };
  
  // Delete Post
  $scope.removePost = function($index, post){
    $scope.posts.$remove(post);
  };
  
  
  // Edit Post
  $scope.editModeOn = function($index, post){
     post.editPost = true;
  };
  $scope.savePostEdit = function($index, post){
    $scope.posts.$save(post);
    post.editPost = false;
  };
  
  // Like Post
  $scope.addLike = function($index, post){
    post.likes += 1;
    $scope.posts.$save(post);
  }
});