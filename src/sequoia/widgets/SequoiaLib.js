Aria.classDefinition({
  $classpath: 'sequoia.widgets.SequoiaLib',
  $extends: 'aria.widgetLibs.WidgetLib',
  $singleton: true,
  $dependencies: ['aria.templates.CSSMgr', 'sequoia.core.css.Functions', 'sequoia.core.css.Color'],
  $constructor: function() {
    window.sequoia = window.sequoia || {};
    sequoia.env = sequoia.env || {};
    sequoia.env = {
      theme: sequoia.env.theme || 'Bootstrap'
    };
  },
  $prototype: {
    widgets: {
      'Button': 'sequoia.widgets.form.Button',
      'CheckBox': 'sequoia.widgets.form.Checkbox',
      'Input': 'sequoia.widgets.form.Input',
      'Radio': 'sequoia.widgets.form.Radio',
      'Select': 'sequoia.widgets.form.Select',
      'Textarea': 'sequoia.widgets.form.Textarea',
      'Modal': 'sequoia.widgets.container.Modal',
      'Dropdown': 'sequoia.widgets.container.Dropdown',
      'Tooltip': 'sequoia.widgets.container.Tooltip',
      'Progressbar': 'sequoia.widgets.container.Progressbar',
      'Breadcrumb': 'sequoia.widgets.container.Breadcrumb',
      'Nav': 'sequoia.widgets.container.Nav',
      'Navbar': 'sequoia.widgets.container.Navbar'
    }
  }
});