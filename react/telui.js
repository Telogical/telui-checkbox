global.UI = global.UI || require('@telogical/telui-core');

global.UI.Appearances.checkbox = require('./appearances/checkbox')(global.UI);
global.UI.checkbox = require('./widgets/checkbox')(global.UI);

module.exports = global.UI;