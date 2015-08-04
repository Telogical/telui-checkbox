'use strict';

var CheckboxDemo = require('../../scripts/app.js');

CheckboxDemo
  .App
  .config(
    function ($stateProvider) {

      var demoView = {
        url: '/demo',
        controller: 'demoViewCtrl',
        templateUrl: 'demo/view-partial.html'
      };

      $stateProvider
        .state('CheckboxDemo', demoView);
    });
