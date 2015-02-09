//global.UI = global.UI || require('@telogical/telui-core');
require('@telogical/telui-core');

global.UI.Appearances.checkbox = require('./appearances/checkbox')(global.UI);
global.UI.Checkbox = require('./widgets/checkbox')(global.UI);

console.log('Checkbox', global.UI.Appearances);

module.exports = global.UI;