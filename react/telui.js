var TelUI = require('@telogical/telui-core');

TelUI.Appearances.checkbox = require('./appearances/checkbox')(TelUI);
TelUI.Checkbox = require('./widgets/checkbox')(TelUI);
TelUI.CheckboxList = require('./widgets/checkboxlist')(TelUI);

module.exports = TelUI;
