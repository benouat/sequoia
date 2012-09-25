Aria.tplScriptDefinition({
  $classpath: 'sequoia.styles.VariablesInjectorScript',
  $dependencies: ['aria.utils.Type', 'sequoia.themes.' + sequoia.env.theme[0].toUpperCase() + sequoia.env.theme.substr(1)],
  $constructor: function() {
    var variables = new sequoia.themes[sequoia.env.theme[0].toUpperCase() + sequoia.env.theme.substr(1)]();
    for (var property in variables) {
      var value = variables[property];
      if ((aria.utils.Type.isInstanceOf(value, "sequoia.core.css.Color") || aria.utils.Type.isString(value) || aria.utils.Type.isNumber(value)) && variables.hasOwnProperty(property)) {
        this[property] = variables[property];
      }
    }
  }
});