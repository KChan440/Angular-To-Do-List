var app = angular.module('ToDoList', []); 

//reverse allows new to-do items to appear at the top of ng-repeat array.
app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

//Main controller
app.controller('todoCtrl', function($scope, $http) {

    //Initiate to do list.
    $scope.todoList = [];

    //Populate list with items from database.
    $http.get('http://localhost:3000/items').success(function(data) {
        for (var i = 0; i <= data.length - 1; i++){
            $scope.todoList.push({todoText:data[i].toDoText, done:data[i].completed, id:data[i].id});
            console.log(data[i].completed);
            console.log(data.done);
        }
        console.log($scope.todoList);
    });

    //Toggle completion of to-do items
    $scope.completed = function(done, x) {
        console.log(done);
        if (done){
            $http.patch('http://localhost:3000/items/' + (x.id), {completed:true});
        }else{
            $http.patch('http://localhost:3000/items/' + (x.id), {completed:false});
        }
    };

    //Add new to-do
    $scope.todoAdd = function() {
        $http.post('http://localhost:3000/items',{toDoText:$scope.todoInput, completed:false}).then(function(response){
            $scope.todoList.push({todoText:$scope.todoInput, done:$scope.todoInput.completed, id: response.data.id});
            $scope.todoInput = "";
        });
    };

    //Called with the Clear Completed button.  Deletes items with status completed=true
    $scope.remove = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            console.log(x);
            if (!x.done) {
                $scope.todoList.push(x);
            }else{
                $http.delete('http://localhost:3000/items/' + x.id);
            }
        });
    };

    //Clear all existing to-do items
    $scope.clearAll = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            console.log(x);
            $http.delete('http://localhost:3000/items/' + x.id);
        });
    };
});