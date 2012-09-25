(function() {

  /**
   * Call a normalized callback with the correct arguments.
   * @param {aria.core.CfgBeans.Callback} callback Function to be called
   * @param {Object} arg first argument of the callback
   * @private
   */

  function callNormalizedCallback(callback, arg) {
    callback.fn.call(callback.scope, arg, callback.args);
  }

  /**
   * Callback for the type event timer.
   * @private
   * @param {aria.core.CfgBeans.Callback} callback User defined type callback
   */

  function typeCallback(callback) {
    this._typeCallback = null;

    callNormalizedCallback(callback, this._domElt.value);
  }

  /**
   * Convert a keydown event into a type event. This is achieved adding a very short callback on keydown. The reason
   * being the fact that on keydown the input has still the previous value. In the callback we'll see the correct text
   * input value. This function should have the same scope as the widget instance.
   * @param {aria.DomEvent} event keydown event
   * @param {Object} callbacks Original, normalized callbacks for type and keydown events
   * @private
   */

  function keyDownToType(event, callbacks) {
    this._typeCallback = aria.core.Timer.addCallback({
      fn: typeCallback,
      scope: this,
      delay: 12,
      args: callbacks.type
    });

    // callbacks.keydown should be called last because it might trigger refreshes/disposal
    if (callbacks.keydown) {
      return callNormalizedCallback(callbacks.keydown, event);
    }
  }

  /**
   * Being a BindableWidget we already have one direction binding of value (from the datamodel to teh widget). This
   * function is the callback for implementing the other bind, from the widget to the datamodel. The value is set in
   * the datamodel on blur. It also takes care of calling the 'on blur' callback if it was defined.
   * @param {aria.DomEvent} event blur event
   * @param {aria.core.CfgBeans.Callback} blurCallback On blur callback
   * @private
   */

  function bidirectionalBlurBinding(event, blurCallback) {
    var bind = this._bindingListeners.value;
    var newValue = this._transform(bind.transform, event.target.getValue(), "fromWidget");
    aria.utils.Json.setValue(bind.inside, bind.to, newValue, bind.cb);

    if (blurCallback) {
      blurCallback.fn.call(blurCallback.scope, event, blurCallback.args);
    }
  }

  Aria.classDefinition({
    $classpath: 'sequoia.widgets.form.Input',
    $extends: 'aria.html.Element',
    $dependencies: ['sequoia.widgets.CfgBeans'],
    $css: ['sequoia.styles.Global', 'sequoia.styles.Forms'],
    $statics: {
      INVALID_USAGE: "{@sequoia:%2} widget can only be used as a %3"
    },
    $constructor: function(cfg, context, lineNumber) {
      this.$cfgBean = "sequoia.widgets.CfgBeans.InputCfg";


      cfg.tagName = "input";
      cfg.attributes = cfg.attributes || {};
      cfg.attributes.type = "text";
      cfg.on = cfg.on || {};

      /**
       * Wheter or not this widget has a 'on type' callback
       * @protected
       * @param {Boolean}
       */
      this._reactOnType = this._registerType(cfg.on, context);
      this._registerBlur(cfg.on, context);

      this.$Element.constructor.call(this, cfg, context, lineNumber);
    },

    $destructor: function() {
      if (this._typeCallback) {
        aria.core.Timer.cancelCallback(this._typeCallback);
      }
      this.$Element.$destructor.call(this);
    },
    $prototype: {
      /**
       * Input can only be used as self closing tags. Calling this function raises an error.
       * @param {aria.templates.MarkupWriter} out
       */
      writeMarkupBegin: function(out) {
        this.$logError(this.INVALID_USAGE, [this.$class, "container"]);
      },
      /**
       * Initialization method called after the markup of the widget has been inserted in the DOM.
       */
      initWidget: function() {
        this.$Element.initWidget.call(this);

        var bindings = this._cfg.bind;
        if (bindings.value) {
          var newValue = this._transform(bindings.value.transform, bindings.value.inside[bindings.value.to], "toWidget");
          if (newValue !== null) {
            this._domElt.value = newValue;
          }
        }
      },
      /**
       * Function called when a value inside 'bind' has changed.
       * @param {String} name Name of the property
       * @param {Object} value Value of the changed property
       * @param {Object} oldValue Value of the property before the change happened
       */
      onbind: function(name, value, oldValue) {
        if (name === "value") {
          this._domElt.value = value;
        }
      },
      /**
       * Convert the special event type into a keydown event listener.
       * @param {Object} listeners On listeners taken from the widget configuration.
       * @param {aria.templates.TemplateCtxt} context Reference of the template context.
       * @return {Boolean} Whether the keydown events should be converted back to type events.
       * @protected
       */
      _registerType: function(listeners, context) {
        if (listeners.type) {
          if (listeners.keydown) {
            var normalizedKeydown = this.$normCallback.call(context._tpl, listeners.keydown);
          }

          var normalizedType = this.$normCallback.call(context._tpl, listeners.type);
          listeners.keydown = {
            fn: keyDownToType,
            scope: this,
            args: {
              type: normalizedType,
              keydown: normalizedKeydown
            }
          };

          delete listeners.type;

          return true;
        }

        return false;
      },
      /**
       * Convert the special event type into a keydown event listener.
       * @param {Object} listeners On listeners taken from the widget configuration.
       * @param {aria.templates.TemplateCtxt} context Reference of the template context.
       * @return {Boolean} Whether the keydown events should be converted back to type events.
       * @protected
       */
      _registerBlur: function(listeners, context) {
        var normalized;

        if (listeners.blur) {
          normalized = this.$normCallback.call(context._tpl, listeners.blur);
        }

        listeners.blur = {
          fn: bidirectionalBlurBinding,
          scope: this,
          args: normalized
        };
      }
    }
  });
})();