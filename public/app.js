var app = angular.module('app', [])
.factory('data', function($rootScope){
  var facts = [
    {q: "fact1", a: "answer1"},
    {q: "fact2", a: "answer2"},
    {q: "fact3", a: "answer3"},
  ];
  return {
    getFacts: function(){
      return facts;
    },
    addFact: function(question, answer){
      var fact = {
        q: question,
        a: answer
      }
      facts.push(fact);
    }
  };

})
.controller('mainCtrl', function($scope, data){
  $scope.addFact = function(){
    data.addFact($scope.question, $scope.answer);
  };
  $scope.getFacts = data.getFacts;
});