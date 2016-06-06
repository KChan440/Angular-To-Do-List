var app = angular.module('ToDoList', []); 

app.controller('todoCtrl', function($scope, $http) {
    $scope.todoList = [];

    $http.get('http://localhost:3000/items').success(function(data) {
        for (var i = 0; i <= data.length - 1; i++){
            $scope.todoList.push({todoText:data[i].toDoText, done:data[i].completed});
            console.log(data[i].completed);
            console.log(data.done);
        }
        console.log($scope.todoList);
    });

    $scope.update = function(done, index) {
        console.log(done);
        if (done){
            $http.patch('http://localhost:3000/items/' + (index), {completed:true});
        }else{
            $http.patch('http://localhost:3000/items/' + (index), {completed:false});
        }
    };

    $scope.todoAdd = function() {
        console.log({todoText:$scope.todoInput, done:false});
        console.log($scope.todoInput.done);
        $http.post('http://localhost:3000/items',{toDoText:$scope.todoInput, completed:false});
        $scope.todoList.push({todoText:$scope.todoInput, done:$scope.todoInput.completed});
        $scope.todoInput = "";
    };

    $scope.remove = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            console.log(x);
            if (!x.done) {
                //$http.delete('http://localhost:3000/items/1');
                $scope.todoList.push(x);
            }
        });
    };
});