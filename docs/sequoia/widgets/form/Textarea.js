Aria.classDefinition({
  $classpath : "sequoia.widgets.form.Textarea",
  $extends : "sequoia.widgets.form.Input",
  $css: ['sequoia.styles.Forms'],
  $constructor : function (cfg, context, lineNumber) {
    this.$cfgBean = "sequoia.widgets.CfgBeans.TextareaCfg";
    cfg.tagName = "textarea";
    cfg.attributes = cfg.attributes || {};
    cfg.on = cfg.on || {};

    this._reactOnType = this._registerType(cfg.on, context);
    this._registerBlur(cfg.on, context);


    this.$Input.$Element.constructor.call(this, cfg, context, lineNumber);
  },
  $prototype: {
    writeMarkupBegin : function (out) {
      this.$Input.$Element.writeMarkupBegin.call(this, out);
    },

    writeMarkupEnd : function (out) {
      this.$Input.$Element.writeMarkupEnd.call(this, out);
    }
  }
});