function Checkbox(ui) {
  'use strict';

  var React = ui.Core.React,
    _ = ui.Core._;

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
      var widget = this;

      var model = this.props;

      if (model.disabled) {
        return;
      }

      function handleCheckbox() {
        function toggleCheckbox(scope) {

          var valIsBool = (typeof value === 'boolean'),
              valIsObj = (typeof value === 'object') && (value !== null);

          if (valIsBool) {
            scope.value = !value;
          } else if (valIsObj) {
            scope.value.selected = !value.selected;
          }
        }
        
        if (model.scope) {
          model.scope.$apply(toggleCheckbox);
        }
      }

      function handleCheckboxList() {
        if (!list.props.disabled && list && value) {
          list.__onChange(value, model);
        }
      }

      if (list && list.props.data) {
        handleCheckboxList();

      } else {
        handleCheckbox();
      }
      
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

      var model = this.props,
        id = model.id,
        key = model.key || model.id,
        value = model.value,
        list = model.list,
        name = model.name,
        disabled = !!model.disabled,
        iconPrimary = model.iconPrimary,
        iconSecondary = model.iconSecondary;

      // This will need to eb extended when
      // the component handles objected more properly
      var active = false;

      if (typeof value === 'boolean') {
        active = value;
      }

      if (typeof value === 'object' && value !== null) {
        active = value[model.selectedProp] || false;
      }


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
          'ui-helper-hidden-accessible': true
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

      var appearance = ui.Appearances[this.props.appearance](appearanceModel),
        input = React.DOM.input(checkboxInputAttrs, ''),
        li = React.DOM.li(checkboxLiAttrs, input, appearance);

      return li;
    }
  });
}

module.exports = Checkbox;
