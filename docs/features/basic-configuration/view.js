'use strict';

var CheckboxDemo = require('../../scripts/app.js');

CheckboxDemo
  .App
  .config(
    function ($stateProvider) {

      var basicConfigurationView = {
        url: '/basic-configuration',
        controller: 'basicConfigurationViewCtrl',
        templateUrl: 'basic-configuration/view-partial.html'
      };

      $stateProvider
        .state('CheckboxDemo.basic-configuration', basicConfigurationView);
    });
