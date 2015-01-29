// TODO. Encapsulate a checkboxlist!!
// value can be an object.

var React = require('react/addons');

function Checkbox(ui) {
  'use strict';

  return React.createClass({
    displayName: 'Checkbox',
    mixins: [ui.Mixins.Widget],
    propTypes: {

    },
    __onClick: function onClick(value, list) {
      if (!this.props.disabled && this.props.click && typeof this.props.click === 'function') {
        this.props.click();
      }
    },
    __onChange: function (value, list) {
      //TODO: handle list situations
      //for al ist we push the value into a list, for the checkbox we toggle.
      //if (!list.props.disabled && list && value) {}

      if (this.props.disabled) {
        return;
      }

      var model = this;
      model.props.scope.$apply(function (scope) {

        if (typeof value === 'boolean') {
          scope.value = !value;
        }


      });
    },
    getInitialState: function getInitialState() {
      return {
        id: '',
        label: '',
        iconPrimary: 'ui-icon-check',
        iconSecondary: 'ui-icon-blank',
        text: true
      };
    },
    render: function render() {

      //not sure why the baseclass isnt doing this, yet.
      if (this.props.text === false) {
        this.props.label = '';
      }

      var cx = React.addons.classSet;

      this.props.appearance = this.props.appearance || 'checkbox';

      var id = this.props.id,
        key = this.props.key || this.props.id,
        value = this.props.value,
        list = this.props.list,
        name = this.props.name,
        disabled = !!this.props.disabled,
        iconPrimary = this.props.iconPrimary,
        iconSecondary = this.props.iconSecondary;

      //will need to be modified to handle lists
      var active = value;

      var checkboxLiClasses = {
          'ui-widget': true,
          'ui-checkbox': true,
          'w-12': true,
          'w-alpha': true,
          'w-omega': true
        },
        checkboxLiAttrs = {
          id: key + '_li',
          key: key + '_li',
          className: cx(checkboxLiClasses)
        };


      var checkboxInputClasses = {
          'ui-helper-hidden-accessible': true,
          //'ui-checkbox-input-debug': true
        },
        checkboxInputAttrs = {
          id: id + '_input',
          key: id + '_input',
          className: cx(checkboxInputClasses),
          role: 'checkbox',
          'aria-disabled': disabled,
          onClick: this.__onClick.bind(null, value, list),
          onChange: this.__onChange.bind(null, value, list),
          type: 'checkbox',
          name: name,
          checked: active,
          ref: 'input'
        };

      if (this.props.focusable === false) {
        checkboxInputAttrs.tabIndex = -1;
      }

      if (disabled) {
        checkboxInputAttrs.disabled = 'disabled';
      }

      var appearanceModel = {
        value: value,
        list: list,
        disabled: disabled,
        id: id + '_appearance_' + this.props.appearance,
        control: this,
        label: this.props.label,
        iconPrimary: iconPrimary,
        iconSecondary: iconSecondary,
        active: active,
        inputId: checkboxInputAttrs.id,
        cssClass: this.props.cssClass,
        uiState: this.props.uiState
      };

      var appearance = ui.Appearances[this.props.appearance](appearanceModel);
      var input = React.DOM.input(checkboxInputAttrs, '');
      var li = React.DOM.li(checkboxLiAttrs, input, appearance);


      return li;
    }
  });
}

module.exports = Checkbox;