var UI = require('../react/telui');

angular
  .module('TelUI')
  .directive('teluiCheckbox', function reactCheckboxDirective() {
    'use strict';

    function link(scope, $el, attrs) {
      var id = scope.id ? scope.id : 'list_check_' + Math.round(Math.random() * 9999);
      $el.removeAttr('disabled');

      function render(newValue, oldValue) {

        if (typeof scope.text === 'undefined') {
          scope.text = true;
        }

        if (scope.value === 'false' || !scope.value) {
          scope.value = false;
        }

        var model = {
          id: id,
          label: scope.label,
          labelProp: scope.labelProp,
          iconPrimary: scope.iconPrimary,
          iconSecondary: scope.iconSecondary,
          cssClass: scope.cssClass,
          text: scope.text,
          disabled: scope.disabled,
          click: scope.click,
          value: scope.value,
          data: scope.data,
          name: scope.name,
          appearance: scope.appearance || 'checkbox',
          uiState: scope.state || '',
          scope: scope
        };

        model.key = model.id;

        React.renderComponent(UI.Checkbox(model), $el[0]);
      }

      scope
        .$watchCollection(
          '[value, data, label, iconPrimary, iconSecondary, disabled, cssClass, text, click, appearance, state]',
          render
        );
    }

    return {
      restrict: 'E',
      replace: true,
      scope: {
        id: '@',
        value: '=?',
        label: '@',
        disabled: '=',
        iconPrimary: '@',
        iconSecondary: '@',
        click: '&?',
        cssClass: '@',
        text: '=?',
        appearance: '@',
        state: '@'
      },
      template: '<div class="waffles"></div>',
      link: link
    };
  });