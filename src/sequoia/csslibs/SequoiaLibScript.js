Aria.tplScriptDefinition({
  $classpath: 'sequoia.csslibs.SequoiaLibScript',
  $dependencies: ['sequoia.core.css.Html4Colors', 'sequoia.core.css.Color', 'sequoia.core.css.Functions'],
  $constructor: function() {
    var api = sequoia.core.css.Functions.api;
    for (var method in api) {
      this[api[method]] = sequoia.core.css.Functions[api[method]];
    }
  },

  $prototype: {

    op: {
      divide: function(prop, amount) {
        var _pos = prop.length - 2,
            unit = prop.substr(_pos),
            value = parseInt(prop.substr(0, _pos), 10);
        return [(value / amount), unit].join('');
      },

      multiply: function(prop, amount) {
        var _pos = prop.length - 2,
            unit = prop.substr(_pos),
            value = parseFloat(prop.substr(0, _pos));
        return [(value * amount), unit].join('');
      },

      minus: function(prop, amount) {
        var _pos = prop.length - 2,
          unit = prop.substr(_pos),
          value = parseInt(prop.substr(0, _pos), 10);
        return [(value - amount), unit].join('');
      },

      add: function(prop, amount) {
        var _pos = prop.length - 2,
          unit = prop.substr(_pos),
          value = parseInt(prop.substr(0, _pos), 10);
        return [(value + amount), unit].join('');
      }
    },

    boxShadowProps: function() {
      return this.__argumentsToArray.apply(this, arguments);
    },

    transitionProps: function() {
      return this.__argumentsToArray.apply(this, arguments);
    },

    __argumentsToArray: function() {
      var args = Array.prototype.slice.call(arguments);
      return args.join(", ");
    }
  }
});