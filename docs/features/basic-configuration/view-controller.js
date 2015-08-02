'use strict';

var CheckboxDemo = require('../../scripts/app.js');

CheckboxDemo
    .Controllers
    .controller('basicConfigurationViewCtrl', function basicConfigurationCtrl($scope, mock) {
        
        var people = mock.entity('people');
    
    
        console.log('people', people.length);
    
        $scope.disabled = false;
        $scope.people = people;
        $scope.singleCheckValue = true;
    });
