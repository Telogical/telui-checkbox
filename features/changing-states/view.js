'use strict';

var CheckboxDemo = require('../../scripts/app.js');

CheckboxDemo
  .App
  .config(
    function ($stateProvider) {

      var changingStatesView = {
        url: '/changing-states',
        controller: 'changingStatesViewCtrl',
        templateUrl: 'changing-states/view-partial.html'
      };

      $stateProvider
        .state('CheckboxDemo.changing-states', changingStatesView);
    });
