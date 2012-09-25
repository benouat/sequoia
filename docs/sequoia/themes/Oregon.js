Aria.classDefinition({
  $classpath: "sequoia.themes.Oregon",
  $extends: "sequoia.themes.Bootstrap",
  $constructor: function() {
    var c = function(color) {
        return new sequoia.core.css.Color(color);
        };
    var f = sequoia.core.css.Functions;

    this.$Bootstrap.constructor.call(this);


  }
});