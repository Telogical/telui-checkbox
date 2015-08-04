var UI = require('../react/telui'),
  React = UI.Core.React,
  uuid = require('uuid'),
  _ = UI.Core._;

angular
  .module('TelUI')
  .directive('teluiCheckboxList', [
    function reactPicklistDirective() {
      'use strict';

      function link(scope, $el, attrs) {

        var id = scope.id ?
          scope.id :
          'checkboxlist_' + uuid.v1();

        scope.clearable = _.isUndefined(scope.clearable) ?
          false :
          scope.clearable;


        scope.value = scope.value || []; //must be a list.

        if (typeof scope.text === 'undefined') {
          scope.text = false;
        }

        function render( /*newValue, oldValue*/ ) {
          $el.removeAttr('disabled');

          var model = {
            //scopes
            scope: scope,

            //attrs
            id: id,
            label: scope.label,
            iconPrimary: scope.iconPrimary,
            iconSecondary: scope.iconSecondary,
            appearance: scope.appearance || 'checkbox',
            labelPrimary: scope.labelPrimary,
            labelSecondary: scope.labelSecondary,

            labelProp: scope.labelProp || 'label',

            cssClass: scope.cssClass,
            text: scope.text,
            disabled: scope.disabled,
            click: scope.click,
            value: scope.value, //the checkboxlist value is a list.
            data: scope.data,
            clearable: scope.clearable,
            uiState: scope.state || 'default',
            maxHeight: scope.maxHeight || 'auto',

          };

          React.renderComponent(UI.CheckboxList(model), $el[0]);
        }

        scope.$watchCollection(
          '[value, data, label, labelProp,iconPrimary, iconSecondary, disabled, cssClass, text, click, state, maxHeight, appearance]',
          render);
      }

      var scopeDefinition = {
        id: '@',
        value: '=?',
        data: '=?',
        label: '@',
        disabled: '=',
        iconPrimary: '@',
        iconSecondary: '@',
        click: '&?',
        cssClass: '@',
        text: '=?',
        state: '@',
        clearable: '=?',
        maxHeight: '@',
        labelProp: '@',
        appearance: '@'
      };

      return {
        restrict: 'E',
        replace: true,
        scope: scopeDefinition,
        template: '<div class="waffles"></div>',
        link: link
      };
    }
]);