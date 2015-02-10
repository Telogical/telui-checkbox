var TelUI = require('@telogical/telui-core');

TelUI.Appearances.checkbox = require('./appearances/checkbox')(TelUI);
TelUI.Checkbox = require('./widgets/checkbox')(TelUI);

console.log('Checkbox', TelUI.Appearances);

module.exports = TelUI;