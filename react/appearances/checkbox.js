function AppearanceCheckbox(ui) {
  'use strict';
  
      var React = ui.Core.React,
    _ = ui.Core._;
  
  return React.createClass({
    displayName: 'Appearance.checkbox',
    mixins: [ui.Mixins.Appearance],
    getInitialState: function getInitialState() {

      //these are all not states

      return {
        disabled: false,
        hover: false,
        value: null,
        active: false
      };
    },
    render: function render() {

      var cx = React.addons.classSet,
        domx = React.DOM;

      var value = this.props.value,
        list = this.props.list,
        key = this.props.key || this.props.id,
        control = this.props.control,
        active = (this.props.active || this.state.active),
        glyphPrimary = this.props.iconPrimary || 'ui-icon-check',
        glyphSecondary = this.props.iconSecondary || 'ui-icon-blank',

        verticalGrid = 0;

      //TODO: reuse appearance for check
      var glyphClasses = {
        'ui-icon': true,
        'ui-appearance-checkbox-sprite-glyph': true
      };
      
      glyphClasses[this.__nameIcon(glyphPrimary)] = active;
      glyphClasses[this.__nameIcon(glyphSecondary)] = !active;

      var labelClasses = {
          'w-12': true,
          'w-alpha': true,
          'w-omega': true,
          'ui-appearance-checkbox-label': true,
          'ui-state-default': true,
          'ui-state-disabled': this.props.disabled
        },
        labelAttrs = {
          key: key + '_label',
          id: key + '_label',
          //htmlFor: this.props.inputId,
          //className: 'w-12 w-alpha w-omega ui-appearance-checkbox-label ui-state-default',
          className: cx(labelClasses)
        },
        checkboxSpriteGlyphAttrs = {
          className: cx(glyphClasses),
          key: key + '_sprite_glyph',
          id: key + '_sprite_glyph'
        },
        checkboxSpriteClasses = {
          'w-alpha': true,
          'w-omega': true,
          'ui-corner-all': true,
          'ui-widget-content': true,
          'ui-state-default': true,
          'ui-state-hover': control.state.hover,
          'ui-state-active': active,
          'ui-appearance-checkbox-sprite': true,
          'ui-state-disabled': this.props.disabled
        },
        checkboxSpriteAttrs = {
          className: cx(checkboxSpriteClasses),
          key: key + '_sprite',
          id: key + '_sprite'
        },
        checkboxSpriteFrameAttrs = {
          className: 'w-alpha w-fix ui-appearance-checkbox-sprite-frame',
          key: key + '_spriteframe',
          id: key + '_spriteframe'
        },
        labelFrameAttrs = {
          className: 'w-auto ui-appearance-checkbox-label-frame',
          key: key + '_labelframe',
          id: key + '_labelframe'
        };

      var appearanceClasses = {
        'w-12': true,
        'w-alpha': true,
        'w-omega': true,
        'ui-widget': true,
        'ui-state-default': true,
        'ui-state-hover': control.state.hover,
        'ui-state-active': active,
        'ui-corner-all': true,
        'ui-state-disabled': this.props.disabled,
        'ui-appearance-checkbox': true,
      };

      appearanceClasses = this.__applyUiStates.call(control, appearanceClasses);
      appearanceClasses['w-v-' + verticalGrid] = true;

      if (this.props.cssClass && this.props.cssClass.length) {
        appearanceClasses[this.props.cssClass] = true;
      }

      var appearanceAttrs = {
        onMouseEnter: this.__onMouseEnter.bind(null, control),
        onMouseLeave: this.__onMouseLeave.bind(null, control),
        onMouseDown: this.__onMouseDown.bind(null, control),
        onMouseUp: this.__onMouseUp.bind(null, control),
        key: key,
        id: key,
        className: this.props.cssClass ? cx(appearanceClasses) + ' ' + this.props.cssClass : cx(appearanceClasses),
        onClick: control.__onChange.bind(null, value, list)
      };

      var label = domx.label(labelAttrs, this.props.label),
        checkboxSpriteGlyph = domx.span(checkboxSpriteGlyphAttrs, control.state.active),
        checkboxSprite = domx.span(checkboxSpriteAttrs, checkboxSpriteGlyph),
        checkboxSpriteFrame = domx.div(checkboxSpriteFrameAttrs, checkboxSprite),
        labelFrame = domx.div(labelFrameAttrs, label);

      var appearance = domx.div(appearanceAttrs, checkboxSpriteFrame, labelFrame);

      return appearance;
    }
  });

}

module.exports = AppearanceCheckbox;
