Aria.classDefinition({
  $classpath: 'tests.sequoia.core.CoreTestSuite',
  $extends: 'aria.jsunit.TestSuite',
  $constructor: function() {
    this.$TestSuite.constructor.call(this);
    this.addTests(
      'tests.sequoia.core.css.ColorTest',
      'tests.sequoia.core.css.FunctionsTest'
      );
  }
});