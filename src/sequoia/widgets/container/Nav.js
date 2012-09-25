(function() {
  var dom = null;

  Aria.classDefinition({
    $classpath: 'sequoia.widgets.container.Nav',
    $extends: 'aria.html.Element',
    $dependencies: ['sequoia.widgets.CfgBeans', 'aria.utils.Dom'],
    $css: ['sequoia.styles.Global', 'sequoia.styles.Nav'],
    $statics: {

    },
    $constructor: function(cfg, context, lineNumber) {
      this.$cfgBean = "sequoia.widgets.CfgBeans.NavCfg";

      cfg.tagName = "ul";


      cfg.type = cfg.type || "list";
      cfg.stacked = !! (cfg.stacked);

      cfg.on = cfg.on || {};

      cfg.attributes = cfg.attributes || {};
      cfg.attributes.classList = cfg.attributes.classList || [];
      cfg.attributes.classList.push("nav");
      cfg.attributes.classList.push("nav-" + cfg.type);
      if (cfg.stacked) {
        cfg.attributes.classList.push("nav-stacked");
      }

      this._activeElt = cfg.active;

      this.$Element.constructor.call(this, cfg, context, lineNumber);
    },

    $destructor: function() {
      aria.utils.Event.removeListener(this._domElt, 'click');
      this.$Element.$destructor.call(this);
    },
    $prototype: {
      /**
       * TextInput can only be used as self closing tags. Calling this function raises an error.
       * @param {aria.templates.MarkupWriter} out
       */
      writeMarkupBegin: function(out) {
        this.$Element.writeMarkupBegin.call(this, out);
      },

      writeMarkupEnd: function(out) {
        this.$Element.writeMarkupEnd.call(this, out);
      },

      /**
       * Initialization method called after the markup of the widget has been inserted in the DOM.
       */
      initWidget: function() {
        this.$Element.initWidget.call(this);

        this._registerClick(this._cfg.on, this._context);

        var bindings = this._cfg.bind;
        if (bindings.active) {
          var active = this._transform(bindings.active.transform, bindings.active.inside[bindings.active.to], "toWidget");
          if (active !== null) {
            this._activeElt = active;
          }
        }
        this.__selectActiveItem();

      },

      /**
       * Function called when a value inside 'bind' has changed.
       * @param {String} name Name of the property
       * @param {Object} value Value of the changed property
       * @param {Object} oldValue Value of the property before the change happened
       */
      onbind: function(name, value, oldValue) {
        if (name === "active") {
          this._activeElt = parseInt(value, 10);
          this.__selectActiveItem();
        }
      },

      __selectActiveItem: function() {
        this.__resetActiveItem();
        var child = dom.getDomElementChild(this._domElt, this._activeElt);
        if (child !== null) {
          (new aria.templates.DomElementWrapper(child)).classList.toggle("active");
        }
      },

      __resetActiveItem: function() {
        var children = dom.getDomElementsChildByTagName(this._domElt, "li");
        for (var i = children.length; i > 0; i--) {
          (new aria.templates.DomElementWrapper(children[i - 1])).classList.remove("active");
        }
      },

      _registerClick: function(listeners, context) {
        var normalized;

        if (listeners.click) {
          normalized = this.$normCallback.call(context._tpl, listeners.click);
        }

        aria.utils.Event.addListener(this._domElt, 'click', {
          fn: this.onClick,
          scope: this,
          args: normalized
        });
      },

      onClick: function(event, clickCallback) {
        var item = this.__getParentWithName(event.target, "li");
        if (item) {
          this.__resetActiveItem();

          this._activeElt = (function () {
            var i = 0;
            while((item = dom.getPreviousSiblingElement(item)) !== null) {
              i++;
            }
            return i;
          })();

          this.__selectActiveItem();

          var bind = this._bindingListeners.active;
          if (bind) {
            var newValue = this._transform(bind.transform, this._activeElt, "fromWidget");
            aria.utils.Json.setValue(bind.inside, bind.to, newValue, bind.cb);
          }

          event.target.blur();
          if (clickCallback) {
            this.$callback(clickCallback, new aria.templates.DomEventWrapper(event));
          }
        }
      },

      __getParentWithName: function(node, parentType) {
        var body = Aria.$window.document.body;
        parentType = parentType.toUpperCase();
        var parent = node.parentNode;
        while (parent && parent != body) {
          if (parent.nodeName == parentType) {
            return parent;
          }
          parent = parent.parentNode;
        }
        return null;
      }

    },
    $onload: function() {
      dom = aria.utils.Dom;
    },
    $onunload: function() {
      dom = null;
    }
  });
})();