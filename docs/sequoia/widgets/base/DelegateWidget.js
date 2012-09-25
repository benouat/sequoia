Aria.classDefinition({
  $classpath: 'sequoia.widgets.base.DelegateWidget',
  $extends: 'aria.html.Element',
  $dependencies: ['aria.utils.Delegate'],
  $onload: function() {
    delegateManager = aria.utils.Delegate;
  },
  $onunload: function() {
    delegateManager = null;
  },
  $constructor: function() {
    /**
     * Delegate id for this widget
     * @protected
     * @type String
     */
    this._delegateId = null;
    this.$Element.constrcutor.call(this);
  },
  $destructor: function() {
    this.__removeDelegation();
    this.$Element.$destructor.call(this);
  },
  $prototype: {
    __activateDelegation: function() {
      this._delegateId = delegateManager.add({
        fn: this.__delegate,
        scope: this
      });
    },
    __removeDelegation: function() {

    },

    delegateIdMarkup: function() {
      return delegateManager.getMarkup(this._delegateId);
    },

    delegate: function() {

    }
  }
});