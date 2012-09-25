Aria.classDefinition({
  $classpath: 'sequoia.widgets.container.Dropdown',
  $extends: 'aria.html.Element',
  $dependencies: ['aria.utils.Dom'],
  $css: ['sequoia.styles.Global', 'sequoia.styles.Dropdown'],
  $constructor: function(cfg, context, linenumber) {
    this.$cfgBean = "sequoia.widgets.CfgBeans.DropdownCfg";

    cfg.tagName = cfg.tagName || "div";
    cfg.submenu = !!(cfg.submenu);

    cfg.attributes = cfg.attributes || {};
    cfg.attributes.classList = cfg.attributes.classList || [];

    if (cfg.submenu) {
      cfg.tagName = "ul";
      cfg.attributes.classList.push("dropdown-menu");
    } else {
      cfg.attributes.classList.push("dropdown");
    }

    this.$Element.constructor.call(this, cfg, context, linenumber);


  },
  $destructor: function() {
    this.$Element.$destructor.call(this);
  },

  $prototype: {
    /**
     * TextInput can only be used as self closing tags. Calling this function raises an error.
     * @param {aria.templates.MarkupWriter} out
     */
    writeMarkupBegin: function(out) {
      this.$Element.writeMarkupBegin.call(this, out);
      if (!this._cfg.submenu) {
        out.write("<ul class='dropdown-menu' role='menu'>");
      }
    },

    writeMarkupEnd: function(out) {
      if (!this._cfg.submenu) {
        out.write("</ul>");
      }
      this.$Element.writeMarkupEnd.call(this, out);
    }
  }
});