(function() {
  var dom = null;

  Aria.classDefinition({
    $classpath: 'sequoia.widgets.container.Navbar',
    $extends: 'sequoia.widgets.container.Nav',
    $dependencies: ['sequoia.widgets.CfgBeans', 'aria.utils.Dom'],
    $css: ['sequoia.styles.Global', 'sequoia.styles.Nav', 'sequoia.styles.Navbar'],
    $statics: {

    },
    $constructor: function(cfg, context, lineNumber) {
      this.$cfgBean = "sequoia.widgets.CfgBeans.NavbarCfg";


      this.$Nav.constructor.call(this, cfg, context, lineNumber);
    },

    $destructor: function() {
      this.$Nav.$destructor.call(this);
    },
    $prototype: {

    },
    $onload: function() {
      dom = aria.utils.Dom;
    },
    $onunload: function() {
      dom = null;
    }
  });
})();