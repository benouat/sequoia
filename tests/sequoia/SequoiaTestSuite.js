Aria.classDefinition({
  $classpath: 'tests.sequoia.SequoiaTestSuite',
  $extends: 'aria.jsunit.TestSuite',
  $constructor: function() {
    this.$TestSuite.constructor.call(this);
    this.addTests(
      'tests.sequoia.core.CoreTestSuite'
      );
  }
});