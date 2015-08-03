/////
// TODO: THIS ABSOLUTELY BELONGS IN THE CHECKBOX COMPONENT OR ON ITS OWN!
var uuid = require('uuid');

function CheckboxList(ui) {
  'use strict';

  var React = ui.Core.React,
    _ = ui.Core._;


  return React.createClass({
    displayName: 'CheckboxList',
    mixins: [ui.Mixins.Widget],
    propTypes: {

    },
    getInitialState: function getInitialState() {
      return {
        id: '',
        label: ''
      };
    },

    componentDidUpdate: function componentDidUpdate() {

    },
    componentWillMount: function componentWillMount() {
      // move this to a list mixin, and include it here and in the radiogroup also.

      var component = this;

      function theDataDoesNotHaveIds() {
        return component.props.data &&
          component.props.data.length &&
          !component.props.data[0].id &&
          component.props.data[0].id !== 0; //watch out, zero is falsy!
      }


      //list must have a group name
      if (!component.props.name) {
        console.warn(
          component.displayName,
          'does not contain a group name, and it will be generated'
        );

        component.props.name = component._descriptor.type.displayName + '_' + uuid.v1();
      }

      //data must contain unique Ids
      if (theDataDoesNotHaveIds()) {
        console.warn(
          component.props.data,
          'does not contain ids, and they will be generated for',
          component._descriptor.type.displayName,
          component.props.name
        );
      }


    },

    __onChange: function onChangeCheckboxList(value, checkbox) {
      //the toggle function here can very likely
      // be reused

      var widget = this;
      var model = this.props;

      if (model.disabled) {
        return;
      }

      function updateValue(scope) {

        function valueToIndexOfSelectedItem(listValue) {
          return widget.__equals(value, listValue);
        }

        function toggleSelectedItem(itemIndex) {
          if (itemIndex !== -1) {
            value.selected = false;
            scope.value.splice(itemIndex, 1);
          } else {
            value.selected = true;
            scope.value.push(value.value);
          }
          
          widget.forceUpdate();
        }

        var existingItemIndex = _.findIndex(scope.value, valueToIndexOfSelectedItem);
        toggleSelectedItem(existingItemIndex);
      }

      model.scope.$apply(updateValue);
    },

    render: function render() {
 
      var list = this;

      var cx = React.addons.classSet,
        domx = React.DOM,
        model = this.props,
        key = model.id;


      var orientation = model.orientation || 'vertical';

      //templating - Note:l this is identical to the combobox, time to pull it out.
      var labelProp = model.labelProp,
        isTemplate = _.contains(labelProp, '<%') || _.contains(labelProp, '%>'),
        labelTemplateString = isTemplate ? labelProp : '<%= ' + labelProp + '%>',
        labelTemplate = _.template(labelTemplateString);


      //these are similar to what is happening in the radiogroup
      function assignUniqueId(datum, index) {
        var uniqueId = (list.props.id || list.displayName) +
          '_' + list.props.name +
          '_' + index;
        return uniqueId;
      }

      //this can possibly be abstracted into a common function that
      //is passed to the radiogroup as well.
      function listItemToCheck(listItem, index) {

        var id = (listItem.id || listItem.id === 0) ?
          listItem.id :
          assignUniqueId(listItem, index);


        //TODO: move this to a listItem decorator in the list mixin
        var model = {
          id: id,
          key: id,
          ref: index,
          //html
          name: list.props.name,
          disabled: !!(list.props.disabled) || !!(listItem[list.props.disabledProp]),

          label: listItem.label || listItem[list.props.labelProp] || list.props.label || '',
          uiState: listItem[list.props.uiStateProp] || list.props.uiState || '',
          iconPrimary: listItem[list.props.iconPrimaryProp] || list.props.iconPrimary,
          iconSecondary: listItem[list.props.iconSecondaryProp] || list.props.iconSecondary,
          text: list.props.text,
          value: listItem,
          selectedProp: 'selected', //allow this to be overidden
          list: list,
          listValue: list.props.value,
          appearance: list.props.appearance,
          orientation: list.props.orientation,
          index: index,
          focusable: list.props.focusable
        };

        return ui.Checkbox(model);
      }
      
      // this can be sped up, if you break
      // once you have found every item
      function isInSelectionModel(datum, model) {
        var data = model.data,
          value = model.value;

        function valueToIndexOfSelectedItem(listValue) {
          return list.__equals(datum, listValue);
        }

        var existingItemIndex = _.findIndex(value, valueToIndexOfSelectedItem);
        return !!(existingItemIndex !== -1);
      }

      //note: very similar to a function in the combobox
      function datumToSelectListItem(datum) {
        var selectListModel = {
          label: _.isObject(datum) ? labelTemplate(datum) : datum,
          value: datum,
          selected: isInSelectionModel(datum, model)
        };

        if (datum.id) {
          selectListModel.id = datum.id;
        }

        return selectListModel;
      }

      var checkList = _
        .chain(model.data)
        .map(datumToSelectListItem)
        .map(listItemToCheck)
        .value();


      //build component
      var ulClasses = {
        'w-12 w-alpha w-omega': true,
        'ui-list-check': true,
        'ui-widget-vertical': (orientation === 'vertical'),
        'ui-widget-horizontal': (orientation === 'horizontal')
      };

      var ulAttrs = {
        key: key + '_ul',
        className: cx(ulClasses)
          //onFocus: this.__onFocus.bind(null, list.props.value, list),
      };

      return domx.ul(ulAttrs, checkList);
    }
  });
}

module.exports = CheckboxList;
