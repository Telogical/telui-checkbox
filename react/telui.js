var TelUI = require('@telogical/telui-core');

TelUI.Appearances.checkbox = require('./appearances/checkbox')(TelUI);
TelUI.Checkbox = require('./widgets/checkbox')(TelUI);

module.exports = TelUI;
